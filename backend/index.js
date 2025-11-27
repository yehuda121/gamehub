// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: '*' }));
app.use(express.json());


app.use('/api/snake', require('./routes/snakeRoutes'));


app.get('/', (req, res) => {
  res.send('GameHub backend is running');
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
