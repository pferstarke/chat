/*
	npm init -y
	npm i express mongoose cors dotenv
*/ 

const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const userRoute = require('./routes/userRoutes');
const chatRoute = require('./routes/chatRoutes');
const messageRoute = require('./routes/messageRoutes');

// const express = require('express');
const http = require('http');
const Server = require('socket.io').Server
const app = express();

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "*"
	}
})

let onlineUsers = [];

io.on('connection', (socket) => {

	

	console.log('We are connected to socket ID', socket.id)

	//listen to connection
	socket.on('addNewUser', (userId) => {
		!onlineUsers.some(user => user.userId === userId) &&
		onlineUsers.push({
			userId,
			socketId: socket.id
		});
		console.log('ONLINE USERS', onlineUsers)

		io.emit('showOnlineUsers', onlineUsers);
	})

	// SEND MESSAGE
	socket.on('sendMessage', (message) => {
		const user = onlineUsers.find(user => user.userId === message.recipientId);

		if(user){
			io.to(user.socketId).emit('getMessage', message);
			// io.to(user.socketId).emit('getNotification', {
			// 	senderId: message.senderId,
			// 	isRead: false,
			// 	date: new Date()
			// });
		}
	})

	socket.on('disconnect', () => {
		onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
		io.emit('showOnlineUsers', onlineUsers);
		console.log('disconnected', onlineUsers)
	})

})


server.listen(process.env.PORT || 4000, () => {
	console.log(`Server listening to port ${process.env.PORT || 4000}`)
})

// const app = express();
// require('dotenv').config()

// Middleware
app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/users', userRoute);
app.use('/chats', chatRoute);
app.use('/messages', messageRoute);
app.use(express.urlencoded({extended: true}));

// CRUD
app.get('/', (request, response) => {
	response.send('Welcome to chat API');
})


app.listen(process.env.PORT || 5000, () => {
	console.log(`API is now online on port ${process.env.PORT || 5000}`)
})

// Connecting to MongoDB database
mongoose.connect("mongodb+srv://admin:admin@chat.ppfnc77.mongodb.net/chat-app?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.once("open", () => console.log("Now connected to Magcale-Mongo DB Atlas"));