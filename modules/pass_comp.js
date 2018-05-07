var bcrypt =require('bcrypt');


var checkit = function (password, passwordenc, callback){

  bcrypt.compare(password, passwordenc, function(err, res){
    if (err){
      callback("Error bcrypt comparing passwords", false);
    }else{
      if (res){
        callback("All good", true);
      }else{
        callback("Incorrect password", false);
      }
    }
  });
};


module.exports.checkit = checkit;
