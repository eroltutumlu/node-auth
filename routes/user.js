const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
          res.send("logged in");
        }else{
          res.send("authentication failed");
        }
      });
    }else{
      res.send("authentication failed");
    }

  });

});

module.exports = router;