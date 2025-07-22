import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import EmailHunter, { getEmail, generateEmail } from './utils.js'
import OpenAI from "openai";
import * as database from './database.js';
import multer from 'multer';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.port || 5000;
const HUNTER = process.env.HUNTER_KEY;

// Middleware
app.use(cors({origin: '*'}));
app.use(express.json());

// Storage for handling files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'CONNECTED TO BACKEND' });
});

app.post('/login', async (req, res) => {
  const payload = req.body.user;
  const output = await database.getUser(payload.email, payload.password);

  res.json({ message: output });
});

app.get('/get-email', async (req, res) => {
  console.log("helloworld");
  const hunter = new EmailHunter("https://api.hunter.io/v2/email-finder?", HUNTER);

  const output = await getEmail("Alexis", "Ohanian", "Reddit", hunter);
  res.json({ message: output });
});

app.post('/generate-email', async (req, res) => {

  // body will contain the required information to generate the cold email
  // we'll feed it to the assistant

  const client = new OpenAI({ 
    apiKey: process.env.OPENAI_KEY 
  });

  const assistandId = 'asst_q7mtyxgDlcn5N5vDTaaUbX9B';

  const email = await generateEmail(client, assistandId, req.body);
  
  res.send({'email': email})

});

app.post('/get-user', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  const output = await database.getUser(email, password);

  if (output.message === "Make sure email and password are correct") {
    res.status(404);
  }
  
  res.send({message: output.message, userData: output.userData});
});

app.post('/create-user', async (req, res) => {
  const user = req.body.user;
  console.log("creating new user: \n", user);

  const output = await database.createUser(user);

  res.send({message: output, userId: output.userId});
});

app.post('/get-application', async (req, res) => {

  const applications = await database.getApplication(req.body.userId)
  res.status(200);
  res.send({applications: applications});
});

app.post('/create-application', async(req, res) => {
  const app = req.body.application;
  const output = await database.createApplication(app);

  res.status(200);
  res.send({message: 'Application created successfully'});
});

app.post('/delete-application', async (req, res) => {
  const userId = req.body.userId;
  const applicationId = req.body.applicationId;
  const output = await database.deleteApplication(userId, applicationId);
  if (output) {
    res.status(200).send({success: true, message: 'Application deleted successfully'});
  } else {
    res.status(500).send({success: false, message: 'Failed to delete application'});
  }
});

app.post('/save-resume', upload.single("file"), async(req, res) => {
  try {
    const userId = req.body.userId;
    const { originalname, mimetype, buffer } = req.file;

    console.log("userId:", userId);

    await database.createResume({userId: userId, content: buffer});

    res.json({ message: "File uploaded and stored in database!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

app.post('/get-resume', async(req, res) => {
  
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).send("userId is missing from form-data");
  }

  const content = await database.getResume(userId);
  if (content != undefined) {
    res.set('Content-Type', 'application/pdf');
    res.send(content.Content);
  } 
  else {
    res.status(500);
    res.send('There is no resume associated to this user');
  }
});

app.post('/set-preferences', async (req, res) => {
  const preferences = req.body;
  const output = await database.saveInterests(preferences);
  if (output) {
    res.status(200).send({message: 'Preferences updated successfully'});
  } else {
    res.status(500).send({message: 'Failed to update preferences'});
  }
});

app.post('/get-recommendations', async (req, res) => {
  const interestsBody = req.body;
  const recommendations = await database.getRecommendation(interestsBody);

  res.status(200).send({recommendations: recommendations});
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});