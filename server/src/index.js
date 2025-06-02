import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import login from './auth.js';
import EmailHunter, { getEmail } from './utils.js'

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.port || 5000;
const HUNTER = process.env.HUNTER_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.post('/login', (req, res) => {
  const payload = req.body;
  console.log("HUNTER KEY: " + HUNTER);
  res.json({ loggedIn: login(payload.username, payload.password) });
});

app.get('/get-email', async (req, res) => {
  console.log("helloworld");
  const hunter = new EmailHunter("https://api.hunter.io/v2/email-finder?", HUNTER);
  
  const output = await getEmail("Alexis", "Ohanian", "Reddit", hunter);
  res.json({message: output});
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});