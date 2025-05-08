// models/Community.js
const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: String,
  chessUID: String,
  imageUrl: String,
});

module.exports = mongoose.model("Community", CommunitySchema);
