# 📞 Dailer - WebRTC Browser-to-Browser Call App

A modern, minimalist, and high-performance browser-to-browser voice calling application built with WebRTC and WebSockets.

![Dailer Preview](https://via.placeholder.com/800x450/0f0c29/ffffff?text=Dailer+WebRTC+App)

## ✨ Features

- **Real-time Voice Calls**: High-quality audio calling using WebRTC technology.
- **Room-based Signaling**: Simple room ID system for connecting peers instantly.
- **Premium UI/UX**: Sleek dark mode design with glassmorphism effects, vibrant gradients, and smooth animations.
- **Live Status Tracking**: Real-time connection status and call timer.
- **Controls**: Easy-to-use mute/unmute and end call functionality.
- **Responsive Design**: Works seamlessly on desktops and mobile browsers.

## 🚀 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom animations & Glassmorphism).
- **Backend**: Node.js with [ws](https://www.npmjs.com/package/ws) for WebSocket signaling.
- **Communication**: WebRTC (RTCPeerConnection API) with **PeerJS** for serverless signaling.
- **Deployment**: Optimized for **Vercel** (Static Hosting).

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/testingbysaurabh/Dailer_fe.git
   cd Dailer_fe
   ```

2. **Open the app**:
   Simply open `index.html` in your browser, or deploy to Vercel.

## ☁️ Deployment

This app is designed to be deployed on **Vercel**. 

1. Push your code to GitHub.
2. Link your repository to Vercel.
3. It will automatically deploy as a static site.

## 📖 How to Use

1. **Open Dailer** in two different browser tabs or on two different devices.
2. **Enter the same Room ID** (e.g., `1234`) on both devices.
3. Click **Start / Join Call**.
4. The first person to join will wait; the second person will see an **Incoming Call** screen.
5. Click **Accept** to start talking!

## 🛡️ Privacy & Security

Calls are peer-to-peer (P2P), meaning audio data travels directly between browsers and does not pass through the signaling server after the connection is established.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Made with ❤️ by Saurabh Singh
