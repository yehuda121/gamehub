// // backend/routes/snakeRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   getBestScore,
//   updateBestScore,
// } = require('../controllers/snakeController');

// // GET /api/snake/best-score
// router.get('/best-score', getBestScore);

// // POST /api/snake/best-score
// router.post('/best-score', updateBestScore);

// module.exports = router;


// backend/routes/snakeRoutes.js
const express = require('express');
const router = express.Router();
const { getBestScore, submitScore } = require('../controllers/snakeController');

// GET /api/snake/best-score
router.get('/best-score', getBestScore);

// POST /api/snake/submit-score
router.post('/submit-score', submitScore);

module.exports = router;
