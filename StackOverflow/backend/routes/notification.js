const express = require('express');
const Notification = require('../models/notification');

const router = express.Router();

// Create notification
router.post('/', async (req, res) => {
  const { postId, message } = req.body;
  const notification = new Notification({ postId, message });
  await notification.save();
  res.status(201).json({ message: 'Notification created' });
});

// Get notifications
router.get('/', async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

module.exports = router;
