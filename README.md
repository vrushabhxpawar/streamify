# 🎵 Streamify – Real-Time Chat & Video Call App

**Streamify** is a full-stack MERN application that allows users to communicate in real-time via chat messaging and video calls. Built with modern web technologies, Streamify emphasizes smooth user experience, security, and responsive design.

---

## 🚀 Key Features

- 🔐 **Authentication & Security**
  - User registration and login using **JWT** and **bcrypt**
  - Secure sessions with cookies

- 💬 **Real-Time Chat**
  - One-to-one messaging with instant updates
  - Messages synchronized across multiple devices

- 📹 **Video Calling**
  - Real-time video calls with optional screen sharing
  - Powered by **Stream Video API**

- 👥 **Friends & Notifications**
  - Send and accept friend requests
  - Receive notifications for messages and calls

- 💻 **Responsive UI**
  - Built with **React.js** and **TailwindCSS** for device-independent design
  - Smooth navigation with **React Router**

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- React Query  
- React Router  
- TailwindCSS  

**Backend:**
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

**Real-Time Communication:**
- Stream Chat API  
- Stream Video API  

**Authentication & Utilities:**
- JWT  
- bcrypt  
- Cloudinary (for avatars)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
     
         git clone https://github.com/vrushabhxpawar/streamify.git
         cd streamify
2. **Install Dependencies**

        # Backend
        cd server
        npm install
        
        # Frontend
        cd ../client
        npm install
     
3.**Setup environment variables**

          MONGO_URI=your_mongodb_connection_string
          JWT_SECRET=your_secret_key
          STREAM_API_KEY=your_stream_api_key
          CLOUDINARY_CLOUD_NAME=your_cloud_name
          CLOUDINARY_API_KEY=your_api_key
          CLOUDINARY_API_SECRET=your_api_secret


4.**Run the application**
    
        # Start backend
        cd server
        npm run dev
        
        # Start frontend
        cd ../client
        npm run dev

