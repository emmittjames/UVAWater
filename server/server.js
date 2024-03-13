const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL")
        checkForReviewsTable();
    })
    .catch((err) => console.error("Error connecting to PostgreSQL", err));

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

app.post("/api/reviews", (req, res) => {
    const building = req.body.building;
    const sql = "SELECT * FROM reviews WHERE buildingName = $1";
    pool.query(sql, [building], (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
});

app.post("/api/create", (req, res) => {
    const { building, fountain, temp, flow } = req.body;
    const sql =
        "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES ($1, $2, $3, $4)";
    pool.query(sql, [building, fountain, flow, temp], (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
});

app.post("/api/totalreviews", (req, res) => {
    const sql = "SELECT COUNT(*) FROM reviews";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
});

app.post("/email", (req, res) => {
    const message = req.body.message;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "uvawater123@gmail.com",
            pass: "dfuenvgasvuwyoza",
        },
    });
    const mailOptions = {
        from: "uvawater123@gmail.com",
        to: "emmittjames1@gmail.com",
        subject: "UVA Water Email",
        text: message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send("Email sent: " + message);
        }
    });
});

async function checkForReviewsTable() {
    try {
        const sql = `
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                buildingName VARCHAR(255),
                fountainName VARCHAR(255),
                flowRating INT,
                tempRating INT
            )
        `;
        await pool.query(sql);
        console.log("Reviews table created or already exists");
    } catch (error) {
        console.error("Error creating reviews table:", error);
    }
}