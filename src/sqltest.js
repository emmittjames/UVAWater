var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2003Esj()",
    database: "UVAWater"
  });
  
con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
    var sql = "CREATE TABLE IF NOT EXISTS reviews (buildingName VARCHAR(255), fountainName VARCHAR(255), flowRating INT, tempRating INT)"
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log("Table created");
    })
    sql = "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES ('Rice Hall', '1st floor', 4, 2)"
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log("1 record inserted")
    })
})