const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// 🔑 PUT YOUR SUPABASE HERE
// =======================
const supabaseUrl = "https://jllwlxylsxbswpbyaypo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsbHdseHlsc3hic3dwYnlheXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjQ5MjcsImV4cCI6MjA5MDY0MDkyN30.LWrxdQqWuvgeUACQrlXSsZYDkY8Jsy6zaLXZ6Ny7DeE";

const supabase = createClient(supabaseUrl, supabaseKey);

// =======================
// TEST ROUTE (CHECK IF API WORKS)
// =======================
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// =======================
// GET EVENTS (YOUR MAIN API)
// =======================
app.get("/events", async (req, res) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  res.json({
    success: true,
    data: data
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
