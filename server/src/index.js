import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import axios from 'axios';
import { pool } from './database.js'; // Ensure this import is correct
import 'dotenv/config';

const app = express();
const port = 3000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(session({
  secret: 'your-very-secure-secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const ultramsgApiUrl = 'https://api.ultramsg.com/instance93141/messages/chat';
const ultramsgToken = 'tyxyxiv2k0e7801s';

app.post('/api/whatsapp', async (req, res) => {
  const { Mobile, Text } = req.body;

  if (!Mobile || !Array.isArray(Mobile) || !Text) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    var data = JSON.stringify({
      "token": ultramsgToken,
      "to": Mobile.join(', '),
      "body": Text
    });

    var config = {
      method: 'post',
      url: ultramsgApiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios(config);

    console.log(JSON.stringify(response.data));
    res.status(200).json({ message: 'Message sent successfully', data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});



app.post('/api/course-categories', async (req, res) => {
  const { category_name, description } = req.body;
  console.log(req.body);
  if (!category_name || !description) {
    return res.status(400).json({ error: 'Both category name and description are required.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO CourseCategories (category_name, description) VALUES (?, ?)',
      [category_name, description]
    );



    res.status(201).json({
      message: 'Category created successfully',
      categoryId: result.insertId,
    });
  } catch (error) {

    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});