// functions/index.js
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const snakeRoutes = require('./routes/snakeRoutes');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/snake', snakeRoutes);

app.get('/', (req, res) => {
  res.send('GameHub backend is running (via Firebase Functions)');
});

exports.api = functions.https.onRequest(app);
