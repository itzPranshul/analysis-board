const fs = require("fs");
const Community = require("../models/community");
const cloudinary = require("../utils/cloudinary");

exports.createCommunity = async (req, res) => {
  try {
    const { name, chessUID } = req.body;
    const filePath = req.file.path;

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
      folder: "chess_community_profiles",
    });

    // Delete local image after upload
    fs.unlinkSync(filePath);

    const imageUrl = cloudinaryResult.secure_url;

    // Save data to MongoDB
    const profile = new Community({ name, chessUID, imageUrl });
    await profile.save();

    res.status(201).json({ message: "Saved", profile });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};
