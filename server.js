const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// HEALTH CHECK ROUTE
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Multivent API is running 🚀"
  });
});

// =======================
// DATABASE CONNECTION
// =======================
const db = mysql.createConnection({
  host: "sql101.infinityfree.com",
  user: "if0_41096969",
  password: "Shaolin18270601",
  database: "if0_41096969_deewan"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// =======================
// GET EVENTS API
// =======================
app.get("/events", (req, res) => {
  const sql = "SELECT id, title, location, date FROM events ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("❌ QUERY ERROR:", err.message);

      return res.status(500).json({
        success: false,
        message: "Database query failed",
        error: err.message
      });
    }

    res.json({
      success: true,
      data: results
    });
  });
});

// =======================
// HANDLE UNKNOWN ROUTES (IMPORTANT)
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
