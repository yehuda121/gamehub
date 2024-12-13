import React from 'react';

const Dice = ({ dice, rollDice, onDiceClick, selectedDice }) => {
  return (
    <div className="dice-container">
      <button className="dice-button" onClick={rollDice}>Roll Dice</button>
      <div className="dice-values">
        {dice.map((die, index) => (
          <div
            key={index}
            className={`die ${selectedDice.includes(die) ? 'selected' : ''}`}
            onClick={() => onDiceClick(die)}
          >
            {die}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice;
