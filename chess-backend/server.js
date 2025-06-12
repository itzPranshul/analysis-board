const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const http = require('http'); // ✅ for creating HTTP server
const { Server } = require("socket.io"); // ✅ import Socket.IO
dotenv.config();
const bodyParser = require('body-parser');

const stockfishRoutes = require('./routes/stockfishRoutes');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const protectedRoute = require("./routes/protectedRoute");
const post = require("./routes/post");
const forgetPassword = require('./routes/auth');
const Message = require('./models/Message');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app); // ✅ Wrap express in HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // or your deployed frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = 5000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected locally'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use('/api', stockfishRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", protectedRoute);
app.use("/api", post);
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', forgetPassword);
app.use('/api/chat', chatRoutes);

// ✅ Socket.IO event handling
io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  socket.on("send_message", async (data) => {
    try {
      // 1. Save message to MongoDB
      const savedMessage = await Message.create({
        sender: data.sender || "Anonymous", // use actual sender if available
        text: data.text
      });

      // 2. Broadcast message
      io.emit("receive_message", savedMessage);
    } catch (error) {
      console.error("❌ Error saving message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});


// ✅ Start HTTP + WebSocket server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
