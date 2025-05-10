const express = require('express');
const router = express.Router();
const Profile = require('../models/community'); // adjust the path if needed

// DELETE /api/profiles/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Profile.findByIdAndDelete(id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

module.exports = router;
