const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/ToDoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS_ORIGIN can be a comma-separated list (e.g. your GitHub Pages URL).
// If it is not set, every origin is allowed (fine for local development).
const origins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : "*";

app.use(express.json());
app.use(cors({ origin: origins }));

app.get("/", (_req, res) => res.json({ status: "ok", service: "mern-todo-api" }));
app.use("/api", routes);

// Unknown route -> JSON 404
app.use((_req, res) => res.status(404).json({ msg: "Route not found" }));

// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ msg: "Something went wrong!" });
});

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
