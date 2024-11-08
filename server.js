import pg from "pg";

import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "humble",
  password: "Castlew14",
  port: 5432,
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/submit", async (req, res) => {
  res.render("index.ejs");
});

app.post("/bedrooms", async (req, res) => {
  const postcode = req.body["postcode"];
  console.log(postcode);
  res.render("bedrooms.ejs");
});

app.get("/bedrooms", async (req, res) => {
  res.render("bedrooms.ejs");
});

app.get("/propValue", async (req, res) => {
  res.render("propvalue.ejs");
});

app.post("/propValue", async (req, res) => {
  res.render("propvalue.ejs");
});

app.get("/timing", async (req, res) => {
  res.render("timing.ejs");
});

app.post("/timing", async (req, res) => {
  res.render("timing.ejs");
});

app.get("/aboutyou", async (req, res) => {
  res.render("aboutyou.ejs");
});

app.post("/aboutyou", async (req, res) => {
  res.render("aboutyou.ejs");
});

app.get("/comparison", async (req, res) => {
  res.render("comparison.ejs");
});

app.get("/register", async (req, res) => {
  res.render("registration.ejs");
});

app.post("/register", async (req, res) => {
  const { businessName, representative, email, location, sliderRange, boost } =
    req.body;

  console.log("Registration Data:", {
    businessName,
    representative,
    email,
    location,
    sliderRange,
    boost,
  });

  try {
    const result = await pool.query(
      "INSERT INTO registered_agents (business_name, representative, email, location, value, boost) VALUES ($1, $2, $3, $4, $5, $6)",
      [businessName, representative, email, location, sliderRange, boost]
    );
    console.log("Data inserted:", result);
    res.render("registration.ejs");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
