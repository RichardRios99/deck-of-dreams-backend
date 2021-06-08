const mongoose = require('mongoose');
const {Schema, model} =  mongoose;




const teamSchema = new Schema({
	logo: String,
	name: {type:String, required:true},
	C: String,
	first: {type: String, points: Number},
	second: {type: String,points: Number},
	third: {type: String,points: Number},
	SS: {type: String,points: Number},
	LF: {type:String,points: Number},
	CF: {type: String,points: Number},
	RF: {type: String,points: Number},
	P: {type: String,points: Number},
	totalPoints: Number,
	owner: {type: Schema.Types.ObjectId, ref: 'User'}

})
mongoose.set('returnOriginal', false);

module.exports = model('Team', teamSchema)


