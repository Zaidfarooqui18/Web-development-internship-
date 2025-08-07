require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // ✅ add this

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authroutes');
app.use('/api/auth', authRoutes);

// ✅ Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// ✅ Protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: `Hello, ${req.user.email || 'user'}! You are authenticated.`,
    user: req.user
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

startServer();
