const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  photoUrl: String,              // URL/path of the uploaded image
  description: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      text: String,
      commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
