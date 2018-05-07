var mysql=require('mysql');


class Database {

  constructor() {
    
  }

  connect(){
    var connection = mysql.createConnection({

      host: process.env.HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE

    });
    return connection;
  }



}

module.exports = new Database();
