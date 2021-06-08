const express = require('express')
const post = express.Router()
const PostModel = require('../models/postModel')

post.get('/', (req, res) => {
	console.log('thaigo and i hitting the route')
	PostModel.find({}, (error, foundPost) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    else {
    res.status(200).json(foundPost)
    } //  .json() will send proper headers in response so client knows it's json coming back
  })
})


// require the model at the top of your file.
// const TeamModel = require('../models/teamModel')


// CREATE ROTE
post.post('/', (req, res) => {
  console.log('im posting')
  PostModel.create(req.body, (error, createdPost) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    else {
    res.json(createdPost)
    } //  .json() will send proper headers in response so client knows it's json coming back
  })
})



// DELETE ROUTE 
post.delete('/:id', (req, res) => {
  PostModel.findByIdAndDelete(req.params.id, (error, deletedPost) => {
    if (error) {
      res.status(400).json({ error: error.message })
    } 
    else {
    res.status(200).json(deletedPost)
    } 
    
  })
})


// UPDATE ROUTE
post.put('/:id', (req, res) => {
  PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
    if (err) {
      res.status(400).json({ error: err.message })
    } 
    else {
    	res.status(200).json(updatedPost)
	}
  })
})


module.exports = post