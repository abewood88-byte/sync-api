const express = require("express");
const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;
let actions = [];

// ✅ Root route (homepage)
app.get("/", (req, res) => {
  res.send("Sync API server is running ✅");
});

// 🚫 Ban endpoint
app.post("/ban", (req, res) => {
  if (req.headers["api-key"] !== API_KEY) {
    return res.status(403).send("Invalid API key");
  }

  const { username, reason, moderator } = req.body;

  actions.push({
    type: "ban",
    username,
    reason,
    moderator,
    time: Date.now()
  });

  res.send("Ban request stored");
});

// 👢 Kick endpoint
app.post("/kick", (req, res) => {
  if (req.headers["api-key"] !== API_KEY) {
    return res.status(403).send("Invalid API key");
  }

  const { username, moderator } = req.body;

  actions.push({
    type: "kick",
    username,
    moderator,
    time: Date.now()
  });

  res.send("Kick request stored");
});

// 📦 Roblox fetches actions
app.get("/actions", (req, res) => {
  if (req.headers["api-key"] !== API_KEY) {
    return res.status(403).send("Invalid API key");
  }

  res.json(actions);
  actions = [];
});

app.listen(3000, () => console.log("Sync API server running on port 3000"));
