const Message = require('../models/messages');

// createMessage
module.exports.createMessage = async(req, res) =>{
	const {chatId, senderId, text} = req.body;

	const message = new Message({
		chatId, senderId, text
	})

	
		const response = await message.save();

		res.status(200).json(response);

}

// getMessages
module.exports.getMessages = async(req, res) => {
	const {chatId} = req.params;


		const messages = await Message.find({chatId});
		res.status(200).json(messages);
	}