const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());

class DatabaseManager {
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
            max: 20,
            idleTimeoutMillis: 1000 * 60 * 4, // Close idle clients after 4 minutes (before Neon's 5-minute timeout)
            connectionTimeoutMillis: 10000,
        });

        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            this.reconnect();
        });
    }

    async reconnect() {
        console.log("Attempting to reconnect to database...");
        try {
            this.pool.end();
            this.pool = new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                },
                max: 20,
                idleTimeoutMillis: 1000 * 60 * 4,
                connectionTimeoutMillis: 10000,
            });
            await this.testConnection();
            console.log("Successfully reconnected to database");
        } catch (error) {
            console.error("Failed to reconnect:", error);
        }
    }

    async testConnection() {
        const client = await this.pool.connect();
        try {
            await client.query('SELECT NOW()');
        } finally {
            client.release();
        }
    }

    async query(sql, params = []) {
        let retries = 3;
        while (retries > 0) {
            try {
                const client = await this.pool.connect();
                try {
                    const result = await client.query(sql, params);
                    return result;
                } finally {
                    client.release();
                }
            } catch (err) {
                retries--;
                if (err.code === '57P01') { // Terminating connection due to administrator command (Neon specific thing)
                    console.log(`Database connection terminated, retrying... (${retries} attempts left)`);
                    await this.reconnect();
                    if (retries > 0) continue;
                }
                throw err;
            }
        }
    }
}

const db = new DatabaseManager();

const connectToDatabase = async () => {
    try {
        await db.testConnection();
        console.log("Connected to PostgreSQL");
        await checkForReviewsTable();
    } catch (err) {
        console.error("Error connecting to PostgreSQL", err);
    }
};

connectToDatabase();

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

app.post("/api/reviews", async (req, res) => {
    try {
        const building = req.body.building;
        const sql = "SELECT * FROM reviews WHERE buildingName = $1";
        const result = await db.query(sql, [building]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/create", async (req, res) => {
    try {
        const { building, fountain, temp, flow } = req.body;
        const sql = "INSERT INTO reviews (buildingName, fountainName, flowRating, tempRating) VALUES ($1, $2, $3, $4)";
        await db.query(sql, [building, fountain, flow, temp]);
        res.json({ message: "Review created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/totalreviews", async (req, res) => {
    try {
        const sql = "SELECT COUNT(*) FROM reviews";
        const result = await db.query(sql);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
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
        await db.query(sql);
        console.log("Reviews table created or already exists");
    } catch (error) {
        console.error("Error creating reviews table:", error);
    }
}

const sendEmail = (message) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: process.env.RECIPIENT_EMAIL,
        subject: "UVA Water Email",
        text: message,
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error sending email: ", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

app.post("/email", (req, res) => {
    const message = req.body.message;
    sendEmail(message);
    res.send("Email sent: " + message);
});

let timer = null;

app.post("/pialarm", (req, res) => {
    console.log("pi alarm hit");
    if(timer) {
        console.log("Alarm cleared");
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        console.log("PI alarm triggered, sending email");
        sendEmail("PI alarm triggered, something is probably wrong");
    }, 1000 * 60 * 10); // 10 minutes
    res.send("Alarm set");
    console.log("Alarm set");
});