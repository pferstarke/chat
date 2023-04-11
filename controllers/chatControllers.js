const Chat = require('../models/chats');

// createChat
// getUserChats
// findChat

module.exports.createChat = async(req, res) => {
	const {firstId, secondId} = req.body;

		const chat = await Chat.findOne({
			members: {$all: [firstId, secondId]}
		})

		if(chat){
			return res.status(200).json(chat);
		}

		const newChat = new Chat({
			members: [firstId, secondId]
		})

		const response = await newChat.save()

		res.status(200).json(response);


}


module.exports.findUserChats = async(req, res) => {
	const userId = req.params.userId;

		const chats = await Chat.find({
			members: {$in: [userId]}
		})

		res.status(200).json(chats);

	}


module.exports.findChat = async(req, res) => {
	const {firstId, secondId} = req.params;

		const chat = await Chat.find({
			members: {$all: [firstId, secondId]}
		})

		res.status(200).json(chat);

	}