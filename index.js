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

const app = express();
// require('dotenv').config()

// Middleware
app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/users', userRoute);
app.use('/chats', chatRoute);
app.use('/messages', messageRoute);

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