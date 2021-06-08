

const mongoose = require('mongoose');
const {Schema, model} =  mongoose;
// require user model
const postSchema = new Schema({
author: String,
message: String,
autherImg: String,
img:String



})
mongoose.set('returnOriginal', false);

module.exports = model('Post', postSchema)
