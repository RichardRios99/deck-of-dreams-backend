const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Team = require ('./teamModel.js')




const usersSchema = new Schema({
    money: {type:Number, default:0},
    username: { type: String, required: true },
    password: { type: String, required: true },
    team: {type: Schema.Types.ObjectId,ref:'Team'},
    deck: [Object],
    logo: String
})

mongoose.set('returnOriginal', false);



module.exports = model('User', usersSchema)


