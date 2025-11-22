import React, { useState } from 'react';
import './SimpleCalculator.css';

const SimpleCalculator = () => {
  const [result, setResult] = useState('');

  // Build the input text string
  const handleClick = (event) => {
    setResult(result + event.target.name);
  };

  // Clear the input text
  const clear = () => {
    setResult('');
  };

  // Calculate the result
  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    // <button onClick={() => handleButtonClick('clear')} className="clear">C</button>
    <div className="simple-calculator">
      <h2>Simple Calculator</h2>
      <input type="text" value={result} readOnly />
      <div className="simple-keypad">
        <button name="1" onClick={handleClick}>1</button>
        <button name="2" onClick={handleClick}>2</button>
        <button name="3" onClick={handleClick}>3</button>
        <button name="+" onClick={handleClick}>+</button>
        <button name="4" onClick={handleClick}>4</button>
        <button name="5" onClick={handleClick}>5</button>
        <button name="6" onClick={handleClick}>6</button>
        <button name="-" onClick={handleClick}>-</button>
        <button name="7" onClick={handleClick}>7</button>
        <button name="8" onClick={handleClick}>8</button>
        <button name="9" onClick={handleClick}>9</button>
        <button name="*" onClick={handleClick}>*</button>
        <button onClick={clear}>C</button>
        <button name="0" onClick={handleClick}>0</button>
        <button onClick={calculate}>=</button>
        <button name="/" onClick={handleClick}>/</button>
      </div>
    </div>
  );
};
export default SimpleCalculator;
