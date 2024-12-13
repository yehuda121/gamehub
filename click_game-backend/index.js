const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
app.use(cors({ origin: '*' })); // Allow requests from any origin


const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin
const serviceAccount = require('./gamehub-4753a-firebase-adminsdk-sy656-122747f1b2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Route to submit score and get top 10 users with their top 10 scores
app.post('/submit-score', async (req, res) => {
  const { username, score } = req.body;

  try {
    if (!username || !score) {
      console.error('Username and score are required',error);
      throw new Error('Username and score are required');
    }

    const userRef = db.collection('players').doc(username);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      // If the user exists, update the score list
      const existingScores = userDoc.data().scores || []; // Ensure existingScores is an array
      await userRef.update({
        scores: admin.firestore.FieldValue.arrayUnion(score) // Append the new score to the array
      });
      console.log('the scor apdated succesfully');
    } else {
      // If the user does not exist, create a new document with an array of scores
      await userRef.set({
        username: username,
        scores: [score], // Initialize scores as an array with the first score
      });
    }

    // Get all users and their scores
    const allUsersSnapshot = await db.collection('players').get(); 
    let leaderboard = [];

    allUsersSnapshot.forEach(doc => {
      const data = doc.data();
      const topScores = (data.scores || []).sort((a, b) => b - a).slice(0, 10); // Get top 10 scores
      const maxScore = Math.max(...topScores);
      leaderboard.push({
        username: data.username,
        scores: topScores,
        maxScore: maxScore,
      });
    });

    // Sort the leaderboard by the highest score
    leaderboard.sort((a, b) => b.maxScore - a.maxScore);

    // Return the top 10 users along with their top 10 scores
    const top10Leaderboard = leaderboard.slice(0, 10);

    res.status(200).json(top10Leaderboard);
  } catch (error) {
    console.error('Error processing score submission:', error);
    res.status(500).send('Error processing score submission');
  }
});

// Route to clean up data not in the top 10
app.post('/clean-data', async (req, res) => {
  try {
    const allUsersSnapshot = await db.collection('players').get(); 
    let leaderboard = [];

    // Create a leaderboard to identify top 10 users
    allUsersSnapshot.forEach(doc => {
      const data = doc.data();
      const topScores = (data.scores || []).sort((a, b) => b - a).slice(0, 10); // Get top 10 scores
      const maxScore = Math.max(...topScores);
      leaderboard.push({
        username: data.username,
        scores: topScores,
        maxScore: maxScore,
        docRef: doc.ref
      });
    });

    // Sort the leaderboard by the highest score
    leaderboard.sort((a, b) => b.maxScore - a.maxScore);

    // Keep only the top 10 users
    const top10Leaderboard = leaderboard.slice(0, 10);

    // Clean up data
    for (const user of leaderboard) {
      if (!top10Leaderboard.includes(user)) {
        // If the user is not in the top 10, delete the document
        await user.docRef.delete();
      } else {
        // If the user is in the top 10, keep only their top 10 scores
        await user.docRef.update({
          scores: user.scores
        });
      }
    }

    res.status(200).send('Data cleanup successful');

  } catch (error) {
    console.error('Error cleaning up data:', error);
    res.status(500).send('Error cleaning up data');
  }
});

// Route to get leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const snapshot = await db.collection('players').get();
    const leaderboard = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const maxScore = Math.max(...data.scores); // Get the highest score for this user
      leaderboard.push({
        username: data.username,
        scores: data.scores,
        maxScore: maxScore, // Include the highest score
      });
    });

    // Sort the leaderboard by the highest score
    leaderboard.sort((a, b) => b.maxScore - a.maxScore);

    res.status(200).json(leaderboard.slice(0, 10)); // Limit to top 10 scores
  } catch (error) {
    console.error('Error retrieving leaderboard:', error);
    res.status(500).send('Error retrieving leaderboard');
  }
});

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});
