const express = require('express');
const User = require('../models/User');
const Chat = require('../models/Chat');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware, adminMiddleware);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error: error.message });
  }
});

router.get('/chats', async (req, res) => {
  try {
    const query = {};
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    const chats = await Chat.find(query).sort({ createdAt: -1 }).populate('userId', 'name email');
    res.json({ chats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load chats', error: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await Chat.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User and chats removed.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

router.delete('/chats/:id', async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chat deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete chat', error: error.message });
  }
});

module.exports = router;
