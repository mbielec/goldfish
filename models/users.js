//the schema, model and methods for a user document (object) will be created here
//requires mongoose, bcrypt, and a link to ../config/database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database')

//User Schea
const UserSchema = mongoose.Schema({
	username:{
		type:String
	},
	email:{
		type:String
	},
	password:{
		type:String
	},
	friends:[{
		type: Schema.ObjectId,
		ref:'User'
	}],
	courses:[{
		type: Schema.ObjectId,
		ref:'Course'
	}]
});

const User = module.exports = mongoose.model('User',UserSchema);