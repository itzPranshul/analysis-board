const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const stockfishRoutes = require('./routes/stockfishRoutes');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const protectedRoute = require("./routes/protectedRoute");
const post = require("./routes/post");
const forgetPassword = require('./routes/auth');




const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected locally'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

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
app.use("/api",post);
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', forgetPassword);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});