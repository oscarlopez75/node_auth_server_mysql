var mysql=require('mysql');
var compare = require('./pass_comp');


module.exports.userok = function(login, password, ip, db, callback){

  var connection = db.connect();

  var sql = "select users.login, users.password, user_access.access ";
  sql = sql + "from users inner join user_access ON users.idusers = user_access.idusers ";
  sql = sql + "where users.login = ";
  sql = sql + mysql.escape(login);

  connection.query(sql, function (error, results, fields) {
  if (error){
    var errMessage = "DB Connection failed : " + error.sqlMessage
    console.log(error);
    callback(errMessage, false);
  }else{
    if(results.length === 1){
      compare.checkit(password, results[0].password, function(mess, result){
        if(result){
          callback(results[0].access, true);
        }else{
          callback(mess, false);
        }
      });
    }else{
      callback("No User found : " + login, false);
    }
  }

  // connected!
});





};
