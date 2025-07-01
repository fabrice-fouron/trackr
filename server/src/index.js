import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import login from './auth.js';
import EmailHunter, { getEmail, generateEmail } from './utils.js'
import OpenAI from "openai";
import { getUser, createUser, getApplication, createApplication } from './database.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.port || 5000;
const HUNTER = process.env.HUNTER_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'CONNECTED TO BACKEND' });
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
  res.json({ message: output });
});

app.post('/generate-email', async (req, res) => {

  // body will contain the required information to generate the cold email
  // we'll feed it straight to the model

  const client = new OpenAI({ 
    apiKey: process.env.OPENAI_KEY 
  });

  const assistandId = 'asst_q7mtyxgDlcn5N5vDTaaUbX9B';

  const email = await generateEmail(client, assistandId, req.body);
  
  res.send({'email': email})

});

app.post('/get-user', async (req, res) => {
  const email = req.body.email;
  const user = await getUser(email);
  res.send(user);
});

app.post('/create-user', async (req, res) => {
  const user = req.body.user;
  // Use user attributes to create user
  // createUser();
  res.status(201);
  res.send('User was created');
});

app.post('/get-application', async (req, res) => {
  const app = req.body.application;

  // const applications = getApplication()
  res.status(200);
  res.send()
});

app.post('/create-application', async(req, res) => {
  const app = req.body.application;
  createApplication(app);

  res.status(200);
  res.send('Application created successfully')
});

app.post('/resume', async(req, res) => {
  console.log('saving resume on database: ');
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});