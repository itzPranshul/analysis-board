const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, (req, res) => {
    res.status(200).json({
        message: "Welcome to your profile!",
        user: req.user, // contains { userId: ..., iat: ..., exp: ... }
    });
});

module.exports = router;
