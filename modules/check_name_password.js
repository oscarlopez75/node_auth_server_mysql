

var validate = function(username, password, callback){

  if (username && password){
    if (username.length > 3){
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}/;
      if (re.test(password)){
        callback("User and password ok", true);
      }else{
        callback("New user ok but Bad password", false);
      }
    }else{
      callback("New User less than 4 chars, not good", false);
    }
  }else{
    callback("New user, User or password missing", false);
  }
};




module.exports.validate = validate;
