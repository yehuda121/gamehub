import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClickerGame.css'; 
import Button from '../../components/Button/Button';

const ClickerGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameActive, setIsGameActive] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsGameActive(true);
  };

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isGameActive && timeLeft === 0) {
      setIsGameActive(false);
      submitScore();
    }
  }, [timeLeft, isGameActive]);

  const submitScore = async () => {
    const username = prompt('Enter your username:');
    if (username) {
      try {
        // await axios.post('http://localhost:5000/submit-score', { username, score });
        await axios.post('http://10.100.102.10:5000/submit-score', { username, score });
        fetchLeaderboard(); // Fetch the leaderboard after the score is submitted
      } catch (error) {
        console.error('Error submitting score:', error);
      }
    }
  };

  const fetchLeaderboard = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/leaderboard');
      const response = await axios.get('http://10.100.102.10:5000/leaderboard');
      // console.log(response.data);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleButtonClick = () => {
    if (isGameActive) {
      setScore(score + 1);
    }
  };

  const handleCleanData = async () => {
    try {
      // await axios.post('http://localhost:5000/clean-data');
      await axios.post('http://10.100.102.10:5000/clean-data');
      alert('Data cleanup successful!');
      fetchLeaderboard(); // Refresh the leaderboard after cleanup
    } catch (error) {
      console.error('Error cleaning data:', error);
      alert('Data cleanup failed.');
    }
  };

  return (
    <div className="clicker-game">
      <h1>Clicker Game</h1>
      <p>Time Left: {timeLeft}</p>
      <p>Score: {score}</p>
      <Button body='Start Game' onClick={startGame} disabled={isGameActive} className={'clicker-game-buttons'}/>
      <Button body='Click Me!' onClick={handleButtonClick} disabled={!isGameActive} className={'clicker-game-buttons'}/>
      <Button body='Clean Data' onClick={handleCleanData} disabled={false} className={'clicker-game-buttons'}/>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.username}: 
            {(entry.scores || []).map((score, i) => (
            <span key={i} style={{ fontWeight: score === entry.maxScore ? 'bold' : 'normal' }}>
              {score}{i < entry.scores.length - 1 ? ', ' : ''}
            </span>
          ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClickerGame;
