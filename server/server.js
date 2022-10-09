const express = require("express");
const cors = require("cors");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// Configs
const app = express();
app.use(
  cors({
    origin: "https://real-reddit-client.onrender.com",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World 👋");
});

// Health Check
app.get("/health-check", (req, res) => {
  res.send("Server is healthy");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

console.log(`Hello from the app 📦`);
