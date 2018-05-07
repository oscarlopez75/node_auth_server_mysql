var express = require('express');
var db = require('../modules/dbConnect');
var jwt = require('jsonwebtoken');
var router = express.Router();


router.get('/', function(req, res){
  res.json({message:"Welcome to the user validation api"});
});

router.post('/getuser', (req, res) => {
  if(req.body.login && req.body.password){
    var check_user = require('../modules/check_user');
    check_user.userok(req.body.login, req.body.password, req.ip, db, function(mess, found){
      if(found){
        res.status(200).json({
          jwt: jwt.sign({
                login: req.body.login,
                role: mess
              },
              process.env.JWT_SECRET, { expiresIn: 30 })
        });
      }else{
        res.status(401).json({
          message: mess
        });
      }
    });
  }else{
    res.status(404).json({
      message: "params missing"
    });
  }

});


router.post('/adduser', (req, res) => {
  if(req.body.login && req.body.password){
    var check_user = require('../modules/check_user');
    check_user.userok(req.body.login, req.body.password, req.ip, db, function(mess, found){
      if(found && mess === 'admin'){
        var addNewUser = require('../modules/add_user');
        var newuser = {fname: req.body.newFname, lname: req.body.newLname, login: req.body.newLogin
          , password: req.body.newPassword, role: req.body.newRole};
        addNewUser.userAdd(newuser, db, function(text, result){
          if(result){
            res.status(200).json({
              message: "User Added"
            });
          }else{
            res.status(500).json({
              message: "User not added " + text
            });
          }
        });
      }else{
        res.status(401).json({
          message: req.body.login + " Cannot add users"
        });
      }
    });
  }else{
    res.status(404).json({
      message: "params missing"
    });
  }

});

module.exports = router;
