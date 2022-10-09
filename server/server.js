const express = require("express");
const cors = require("cors");

// Constants
const port = process.env.port || 8080;
// const HOST = "0.0.0.0";

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
  res.status(200).send("OK");
});

// App listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Hello from the app 📦`);
});
