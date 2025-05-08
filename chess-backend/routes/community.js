const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const communityController = require("../controllers/communityController");

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), communityController.createCommunity);

module.exports = router;
