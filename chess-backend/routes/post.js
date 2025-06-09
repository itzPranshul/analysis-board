const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // multer config

// Create Post (with file upload)
router.post("/posts", authenticate, upload.single('photo'), async (req, res) => {
  try {
    const { description } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const post = new Post({
      photoUrl,
      description,
      postedBy: req.user.userId,
    });

    await post.save();
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "name email")
      .populate("comments.commentedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post by ID (only if the user is the owner)
router.delete("/posts/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    // Ensure only the owner can delete
    if (post.postedBy.toString() !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});


// Add a comment
router.post("/posts/:id/comments", authenticate, async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      text,
      commentedBy: req.user.userId,
    });

    await post.save();
    res.json({ message: "Comment added", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
