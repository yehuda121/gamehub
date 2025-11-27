// backend/controllers/snakeController.js
const { db } = require('../config/firebaseAdmin');

const GLOBAL_DOC_ID = 'global';

async function getBestScore(req, res) {
  try {
    const docRef = db.collection('snakeScores').doc(GLOBAL_DOC_ID);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.json({ bestScore: 0 });
    }

    return res.json({ bestScore: doc.data().bestScore || 0 });
  } catch (error) {
    console.error('Error getting best score:', error);
    return res.status(500).json({ error: 'Failed to get best score' });
  }
}

async function submitScore(req, res) {
  try {
    const { score } = req.body;

    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Invalid score' });
    }

    const docRef = db.collection('snakeScores').doc(GLOBAL_DOC_ID);
    const doc = await docRef.get();

    const currentBest = doc.exists ? doc.data().bestScore || 0 : 0;
    const newBest = Math.max(score, currentBest);

    await docRef.set({
      bestScore: newBest,
      updatedAt: new Date()
    });

    return res.json({ bestScore: newBest });
  } catch (error) {
    console.error('Error submitting score:', error);
    return res.status(500).json({ error: 'Failed to submit score' });
  }
}

module.exports = {
  getBestScore,
  submitScore, 
};
