const express = require('express');
const { rateLimit } = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,       
  standardHeaders: "draft-8",
  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests",
      message: "Try again later"
    });
  }
});

app.use("/api", limiter);

app.get("/api/test", (req, res) => {
  res.json({
    message: "Request successful"
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});