const mysql = require("mysql2")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
})

app.post("/reviews", (req, res) => {
    const building = req.body.building
    const sql = "SELECT * FROM reviews WHERE buildingName = ?"
    con.query(sql, [building], (err, result) => {
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
    con.query(sql, (err, result) => {
        if (err) throw err
        console.log("Table created");
    })
    sql = "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES ('Rice Hall', '2nd floor', 4, 2)"
    con.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send("Insterted rating")
    })
})

app.listen("3000", () => {
    console.log("Listening on port 3000")
})

app.get("/cleartable", () => {
    const sql = "DELETE FROM reviews"
    con.query(sql)
})