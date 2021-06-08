const express = require('express')
const team = express.Router()
const TeamModel = require('../models/teamModel')
const UserModel = require('../models/usersModel')

const isAuthenticated = (req, res, next) => {
     if (req.session.currentUser) {
        console.log('this is the currentUser', req.session.currentUser)
         return next()
     } else {
         res.status(403).json({msg:"loging require"})
     }
 }







// INDEX ROUTE







team.get('/', (req, res)=>{
  
  console.log('index route')  

  UserModel.findById(req.session.currentUser._id, (error, foundUser)=>{
    if (error){
      res.status(400).json(error)
    }
    else{
      res.status(200).json(foundUser.team)

     
          // res.json(foundUser.foundTeam)
    }
  }).populate('team')

  

});


// require the model at the top of your file.
// const TeamModel = require('../models/teamModel')


// CREATE ROTE
team.post('/', (req, res)=>{


  TeamModel.create(req.body, (error, createdTeam)=>{
    if (error){
      res.status(400).json({error: error.message})
    }
    else{
      // res.status(201).json(createdTeam)
      console.log('creating')
      UserModel.findById(req.session.currentUser._id, (error, foundUser)=>{
        if (error) {
          res.status(400).json({ error: error.message })
        }
        else{
          foundUser.team = (createdTeam)
          foundUser.save()
          res.status(200).json(foundUser.team.name)
         
          
        }
      })
         
    }
  })

 });



// DELETE ROUTE 
team.delete('/:id', (req, res) => {
  TeamModel.findByIdAndDelete(req.params.id, (error, deletedTeam) => {
    if (error) {
      res.status(400).json({ error: error.message })
    } 
    else {
    res.status(200).json(deletedTeam)
    } 
    
  })
})


// UPDATE ROUTE
team.put('/update', (req, res) => {
  console.log('in the update route',req.session.currentUser)
  TeamModel.findByIdAndUpdate(req.session.currentUser.team._id, req.body, { new: true }, (err, updatedTeam) => {
    if (err) {
      res.status(400).json({ error: err.message })
    } 
    else {
      console.log(req.session.currentUser)
      updatedTeam.save()
    	res.status(200).json(updatedTeam)
	}
  })
})


module.exports = team

