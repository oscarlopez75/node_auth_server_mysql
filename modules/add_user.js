var mysql=require('mysql');
var checkData = require('./check_name_password');
var bcrypt =require('bcrypt');


var salt = bcrypt.genSaltSync(10);
var connection;
var dbError;


module.exports.userAdd = function(data, db, callback){
  connection = db.connect();
  checkData.validate(data.login, data.password, function(mess, result){
    if(result){
      addUser(data, function(resp){
        if(resp){
          callback("User added", true);
        }else{
          callback(dbError, false);
        }
      });
    }else{
      callback(mess, false);
    }
  });

};

var addUser = function(data, callback){
  var sql = "insert into users (fname, lname, login, password)";
  sql = sql + " values (";
  sql = sql + mysql.escape(data.fname) + ",";
  sql = sql + mysql.escape(data.lname) + ",";
  sql = sql + mysql.escape(data.login) + ",";
  sql = sql + mysql.escape(bcrypt.hashSync(data.password, salt)) + ")";

  connection.query(sql, function (error, results, fields) {
    if(error){
      dbError = error.sqlMessage;
      callback(false);
      console.log(error);
    }else{
      sql = "insert into user_access (idusers, access)";
      sql = sql + " values (";
      sql = sql + mysql.escape(results.insertId) + ",";
      sql = sql + mysql.escape(data.role) + ")";
      console.log(sql);
      connection.query(sql, function (error, results, fields) {
        if(error){
          dbError = error.sqlMessage;
          callback(false);
          console.log(error);
        }else{
          callback(true);
        }
      });
    }
  });

}
