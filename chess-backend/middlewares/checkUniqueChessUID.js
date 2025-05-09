const Community = require("../models/community");

const checkUniqueChessUID = async (req, res, next) => {
  try {
    const { chessUID } = req.body;

    const existing = await Community.findOne({ chessUID });

    if (existing) {
      return res.status(400).json({ error: "chessUID already exists" });
    }

    next();
  } catch (error) {
    console.error("Error checking chessUID uniqueness:", error);
    res.status(500).json({ error: "Server error while checking chessUID" });
  }
};

module.exports = checkUniqueChessUID;
