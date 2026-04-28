const express = require('express');
const Chat = require('../models/Chat');
const { authMiddleware } = require('../middleware/auth');
const { getAIResponse } = require('../services/aiService');

const router = express.Router();
router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Message text is required.' });
  }

  try {
    const response = await getAIResponse(message);
    const chat = await Chat.create({
      userId: req.user._id,
      message: message.trim(),
      response,
    });

    res.json({ chat: { id: chat._id, message: chat.message, response: chat.response, createdAt: chat.createdAt } });
  } catch (error) {
    res.status(500).json({ message: 'Chat failed', error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await Chat.find({ userId: req.user._id }).sort({ createdAt: 1 });
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Could not load chat history', error: error.message });
  }
});

module.exports = router;
