const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const UserModel = require('../models/usersModel');


users.get('/', (req, res) => {
        console.log('looking for ALL users')
    UserModel.find({}, (error, foundUser) => {
        if (error) {
          res.status(400).json({ error: error.message })
        }
        else {
        res.status(200).json(foundUser)
        } //  .json() will send proper headers in response so client knows it's json coming back
    })
})

 users.get('/deck', (req, res) => {
        console.log('looking for currentUserDeck')
    UserModel.findById(req.session.currentUser._id, (error, foundUser) => {
        if (error) {
          res.status(400).json({ error: error.message })
        }
        else {
        res.status(200).json(foundUser.deck)
        } //  .json() will send proper headers in response so client knows it's json coming back
    })
})

       
users.get('/current', (req, res) => {
        console.log('PROFILE img', )
    UserModel.findById(req.session.currentUser._id, (error, foundUser) => {
        if (error) {
          res.status(400).json({ error: error.message })
        }
        else {
        res.status(200).json(foundUser)

        } //  .json() will send proper headers in response so client knows it's json coming back
    })
})


users.get('/current/img', (req, res) => {
        console.log('just for the profilie', )
    UserModel.findById(req.session.currentUser._id, (error, foundUser) => {
        if (error) {
          res.status(400).json({ error: error.message })
        }
        else {
            console.log('her is the url for the image', foundUser.logo)
        res.status(200).json(foundUser.logo)

        } //  .json() will send proper headers in response so client knows it's json coming back
    })
})


// POST ROUTE sign up
users.post('/signup', (req, res) => {
console.log('signup')
	console.log('hiting the s route')

    // hashing and salting the password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    UserModel.create(req.body, (error, createdUser) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            console.log(createdUser)
            res.status(201).json(createdUser)
        }
    })

});


// USER LOGIN ROUTE (CREATE SESSION ROUTE)
users.post('/login', (req, res) => {
     UserModel.findOne({ username: req.body.username }, (err, foundUser) => {
         if (err) {
             res.send(err)
         }
         else {
             if (foundUser) {
                 if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                     //login user and create session
                     console.log(req.session)
                        // console.log("log in", req.session.currentUser._id)
                      req.session.currentUser = foundUser
                    console.log('logging in after verfied', req.session.currentUser)
                     res.status(200).json(foundUser)
                 }
                 else {
                     res.status(404).json({ error: 'User Not Found' })
                 }
             }
             else {
                 res.status(400).json()
             }
         }
     })
 })
users.post('/img', (req,res) => {
    console.log('adding img')
    console.log('this is the new loh',req.body.img)
    UserModel.findByIdAndUpdate(req.session.currentUser._id,{logo:req.body.img},{new: true}, (error, foundUser)=>{
    if (error){
      res.status(400).json(error)
    }
    else{
        foundUser.save()
      res.status(200).json(foundUser.logo)


     
          // res.json(foundUser.foundTeam)
    }
  })
  
})  

    
users.post('/deck', (req,res) => {
    console.log('hit the deck')
    UserModel.findByIdAndUpdate(req.session.currentUser._id,{deck:req.body},{new: true}, (error, foundUser)=>{
    if (error){
      res.status(400).json(error)
    }
    else{
        foundUser.save()
      res.status(200).json(foundUser.deck)

     
          // res.json(foundUser.foundTeam)
    }
})

})    


users.patch('/addMoney', (req, res)=>{
    console.log('money team')
    UserModel.findByIdAndUpdate(req.session.currentUser._id, { $inc: { money : 1} }, {new:true}, (error, updatedUser)=>{
        if (error){
            res.status(400).json({error: error.message})
        }
        else{
            console.log(updatedUser.money)
        }
    })
})


















users.get("/logout", (req, res) => {
console.log('logging out', req.session.currentUser)
req.session.destroy();

res.clearCookie('connect.sid');

res.status(200).send('User has been logged out')
});

module.exports = users;