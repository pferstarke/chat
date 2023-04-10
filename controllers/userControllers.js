const User = require('../models/users');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const auth = require('../auth');


module.exports.registerUser = async (req, res) => {
	
try{
	const {name, email, password} = req.body;

	let user = await User.findOne({email});

	if(user){
		return res.status(400).json('Email already exists');
	}
	if(!name || !email || !password){
		return res.status(400).json('All fields are required.')
	}
	if(!validator.isEmail(email)){
		return res.status(400).json('Email must be a valid email.');
	}
	if(!validator.isStrongPassword(password)){
		return res.status(400).json('Password must be a strong password.');
	}

	user = new User({name, email, password})

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)

	await user.save();

	const token = auth.createAccessToken(user);

	res.status(200).json({_id: user._id, name, email, token})
	}catch(error){
		console.log(error);
		res.status(500).json(error);
}}


	module.exports.loginUser = async (req, res) => {
		const { email, password } = req.body;

		try{
			let user = await User.findOne({email});

			if(!user){
				return res.status(400).json('Incorrect Email');
			}

			const isPasswordCorrect = await bcrypt.compare(password, user.password);

			if(!isPasswordCorrect){
				return res.status(400).json('Incorrect Password')
			}
			else{
				const token = auth.createAccessToken(user);

				res.status(200).json({_id: user._id, name: user.name, email, token})
			}

		}catch(error){
			console.log(error);
			res.status(500).json(error);
		}
	}

/*module.exports.getProfile = (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	console.log(userData);

	return User.findById(userData.id).then(result => {
		result.password = '********';
		res.send(result);
	})
}*/


module.exports.findUser = async (req, res) =>{
	const userId = req.params.userId;

	try{
		const user = await User.findById(userId);
		res.status(200).json(user);
	}catch(error){
		console.log(error);
		res.status(500).json(error);
	}
}

module.exports.getUsers = (req, res) =>{
	return User.find().then(result => {
		res.send (result);
	})
	.catch(error => {
		console.log(error);
		res.send(error);
	})
}