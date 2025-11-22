// GamesHome.js

import React from 'react';
import { Link } from 'react-router-dom';
import './GameHome.css'; // Import your CSS file
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';

function GamesHome() {
  return (
    <div className="games-container">
      <Text className="text-title">Choose a Game</Text>
      <div className="game-buttons">
        <Button body="Minesweeper" linkPath="/Minesweeper" />
        <Button body="Backgammon" linkPath="/Backgammon" />
        <Button body="Snake" linkPath="/Snake" />
        <Button body="Clicker game" linkPath="/ClickerGame" /> 
      </div>
    </div>
  );
}

export default GamesHome;
