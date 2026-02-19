const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// Simple HTTP server to serve index.html
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) { res.writeHead(500); res.end('Error'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// WebSocket signaling server
const wss = new WebSocket.Server({ server });

const rooms = {}; // roomId -> [ws, ws]

wss.on('connection', (ws) => {
  console.log('New connection');

  ws.on('message', (message) => {
    let data;
    try { data = JSON.parse(message); } catch { return; }

    switch (data.type) {

      case 'join': {
        const roomId = data.room;
        if (!rooms[roomId]) rooms[roomId] = [];

        // Max 2 users per room
        if (rooms[roomId].length >= 2) {
          ws.send(JSON.stringify({ type: 'full' }));
          return;
        }

        rooms[roomId].push(ws);
        ws.roomId = roomId;
        ws.isInitiator = rooms[roomId].length === 1;

        console.log(`User joined room: ${roomId} (${rooms[roomId].length}/2)`);

        if (rooms[roomId].length === 1) {
          // First user — wait for second
          ws.send(JSON.stringify({ type: 'waiting' }));
        } else {
          // Second user joined — tell initiator to create offer
          rooms[roomId][0].send(JSON.stringify({ type: 'ready' }));
          ws.send(JSON.stringify({ type: 'joined' }));
        }
        break;
      }

      case 'offer':
      case 'answer':
      case 'candidate': {
        // Relay to the other peer in the room
        const room = rooms[ws.roomId];
        if (room) {
          const other = room.find(w => w !== ws && w.readyState === WebSocket.OPEN);
          if (other) other.send(JSON.stringify(data));
        }
        break;
      }

      case 'leave': {
        handleLeave(ws);
        break;
      }
    }
  });

  ws.on('close', () => handleLeave(ws));
  ws.on('error', () => handleLeave(ws));
});

function handleLeave(ws) {
  if (!ws.roomId) return;
  const room = rooms[ws.roomId];
  if (!room) return;

  // Notify the other user
  const other = room.find(w => w !== ws && w.readyState === WebSocket.OPEN);
  if (other) other.send(JSON.stringify({ type: 'peer-left' }));

  // Clean up room
  rooms[ws.roomId] = room.filter(w => w !== ws);
  if (rooms[ws.roomId].length === 0) {
    delete rooms[ws.roomId];
    console.log(`Room deleted: ${ws.roomId}`);
  }
  ws.roomId = null;
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✅ Call App running at: http://localhost:${PORT}`);
  console.log(`📞 Open this URL in two browser tabs to test\n`);
});
