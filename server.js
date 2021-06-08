const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose');
const cors = require('cors')
const multer = require('multer')


const fileStorageEngine = multer.diskStorage({
  destination:(req, file, cb)=> {
    cb(null,'./images')
  },
  filename: (req,file,cb)=> {
    cb(null, Date.now() +'--'+ file.originalname )
  }
})






// Middleware
app.use(express.json()); //use .json(), not .urlencoded()
//use .json(), not .urlencoded()
const session = require('express-session');





const whitelist = ['http://localhost:3000']

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true
 }



app.use(cors(corsOptions))



let MongoDBStore = require('connect-mongodb-session')(session);
 

let store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/fakeLogIn',
  collection: 'mySessions'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
 
app.use(session({
  secret: 'JustKiding',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: false
}));

 const isAuthenticated = (req, res, next) => {
     if (req.session.currentUser) {
        console.log('this is the currentUser', req.session.currentUser)
         return next()
     } else {
         res.status(403).json({msg:"loging require"})
     }
 }

// set up connection with the DB
mongoose.connect('mongodb://localhost:27017/fakeLogIn',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

// set up listeners to monitor your database connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));

app.use("/team", isAuthenticated, require('./controllers/teamController'))
app.use("/users", require('./controllers/userController'))
app.use("/post",  isAuthenticated, require('./controllers/postController'))

app.listen(PORT, () => {
  console.log(`celebrations happening on ${PORT}` )

})