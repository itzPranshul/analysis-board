// backend/routes/protected.js or in your main file
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
  const { name, email } = req.user; // assuming you added these when signing the token
  console.log("Decoded user info from token:", req.user);
  res.json({ message: 'This is protected data', name, email });
});


module.exports = router;
