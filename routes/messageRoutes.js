const express = require('express');
const messageController = require('../controllers/messageControllers');

const router = express.Router();

router.post('/create', messageController.createMessage);

router.get('/:chatId', messageController.getMessages);

module.exports = router;