const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { login } = require("./auth");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.post('/login', (req, res) => {
  const payload = req.body;
  console.log("payload: " + payload);
  res.json({ loggedIn: login(payload.username, payload.password) });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});