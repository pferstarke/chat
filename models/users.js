const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minlength: 3,
		maxlength: 30
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		minlength: 3,
		maxlength: 200,
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: 3,
		maxlength: 1024
	}
},
	{
		timestamps: true
	

});

module.exports = mongoose.model('User', userSchema);