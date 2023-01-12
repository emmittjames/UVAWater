const mysql = require("mysql2")
const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })

const app = express()
app.use(cors())
app.use(express.json())

const con = mysql.createConnection(process.env.DATABASE_URL)
  
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
    let sql = "CREATE TABLE IF NOT EXISTS reviews (buildingName VARCHAR(255), fountainName VARCHAR(255), flowRating INT, tempRating INT)"
    con.query(sql, (err, result) => {
        if (err) throw err
        console.log("Table created");
    })

    const building = req.body.building
    const fountain = req.body.fountain
    const temp = req.body.temp
    const flow = req.body.flow

    sql = "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES (?,?,?,?)"
    con.query(sql, [building, fountain, temp, flow], (err, result) => {
        if(err) throw err
        console.log(result)
        res.send("Insterted rating")
    })
})

app.listen(process.env.MYSQL_PORT || "3000", () => {
    console.log("Listening on port 3000")
})

app.get("/cleartable", () => {
    const sql = "DELETE FROM reviews"
    con.query(sql)
})