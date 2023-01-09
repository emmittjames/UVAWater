const mysql = require("mysql2")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2003Esj()",
    database: "UVAWater"
  });
  
con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
})

app.get("/reviews", (req, res) => {
    const sql = "SELECT * FROM reviews"
    con.query(sql, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.post("/create", (req, res) => {
    const building = req.body.building
    const fountain = req.body.fountain
    const temp = req.body.temp
    const flow = req.body.flow

    const sql = "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES (?,?,?,?)"
    con.query(sql, [building, fountain, temp, flow], (err, result) => {
        if(err) throw err
        console.log(result)
        res.send("Insterted rating")
    })
})

app.get("/createdb", (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS reviews (buildingName VARCHAR(255), fountainName VARCHAR(255), flowRating INT, tempRating INT)"
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log("Table created");
    })
    sql = "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES ('Rice Hall', '2nd floor', 4, 2)"
    con.query(sql, function (err, result) {
        if (err) throw err
        console.log(result)
        res.send("Insterted rating")
    })
})

app.listen("3000", () => {
    console.log("Listening on port 3000")
})