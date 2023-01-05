var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2003Esj()"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });