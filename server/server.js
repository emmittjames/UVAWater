const mysql = require("mysql2")
const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" })

const app = express()
app.use(cors())
app.use(express.json())

const con = mysql.createConnection(process.env.DATABASE_URL)
  
con.connect(function(err){
    if (err) throw err
    console.log("Connected!")
})

const PORT = process.env.PORT || "3000"
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})

app.post("/api/reviews", (req, res) => {
    const building = req.body.building
    const sql = "SELECT * FROM reviews WHERE buildingName = ?"
    con.query(sql, [building], (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.post("/api/create", (req, res) => {
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

app.post("/email", (req, res) => {
    const message = req.body.message
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'uvawater123@gmail.com',
            pass: 'dfuenvgasvuwyoza'
        }
    });
    var mailOptions = {
        from: 'uvawater123@gmail.com',
        to: 'emmittjames1@gmail.com',
        subject: 'UVA Water Email',
        text: message
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            res.send("Email sent: " + message)
        }
    });
})