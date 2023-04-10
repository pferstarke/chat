const express = require('express');
const chatController = require('../controllers/chatControllers');

const router = express.Router();

router.post('/', chatController.createChat);
router.get('/:userId', chatController.findUserChats);
router.get('/find/:firstId/:secondId', chatController.findChat);

module.exports = router;