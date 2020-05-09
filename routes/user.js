const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const User = require('../models/User');

router.use(function timeLog (req, res, next) {
  // middleware 
  var timeInMss = Date.now()
  console.log('Time: ', timeInMss)
  next()
});


router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ name })
    .then(user=>  {
      if(user) {return res.status(400).json('user is already registered')}
    });

  const newUser = new User({
    name,
    email,
    password
  });

  bcrypt.hash(password, saltRounds, (err, hash) => {
    newUser.password = hash;

    newUser.save((err, user) => {
      if (err) return console.error(err);
      console.log(user.email);
    });  
  
  });

  res.send("ok");

});

router.get('/authenticate', (req, res) => {
  const {username, password} = req.query;

  User.findOne({name: username}, (err, user) => {

    if(user){
      bcrypt.compare(password, user.password, function(err, result) {
        if(result){
          jwt.sign({id: user.id, email: user.email}, 
            require('../config/default').JWT_SECRET,
            {expiresIn: '60s'},
            (err, token) => {
              return res.json({
                token: token
              });
          });
        
        }else{
          return res.status(400).json('user or password is incorrect')
        }
      });
    }else{
      return res.status(400).json('user or password is incorrect')
    }

  });

});


router.get('/profil', verifyToken, (req, res) => {

  jwt.verify(req.token, require('../config/default').JWT_SECRET, (err, userData) => {
    
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        userData,
        secret: 'Node is great'
      });
    }

  });


});

function verifyToken(req, res, next){
  const bearerHeader =  req.headers['x-access-token'] || req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  }else {
    res.sendStatus(403).json('Access denied');
  }

}

module.exports = router;