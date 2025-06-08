const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // unique filename: post-timestamp.jpg
    cb(null, 'post-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;
