const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");
const verifyToken = require('../middleware/authMiddleware');

router.post("/signup", signup);
router.post("/signin", signin);


module.exports = router;
