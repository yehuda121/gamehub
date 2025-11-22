import React from 'react';
import './CalculatorHome.css';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';

const CalculatorHome = () => {
  return (
    <div className="calculator-home">
      <Text className="text-title">Calculator Home</Text>
      <div className="buttons">
        <Button body="Simple Calculator" linkPath="/SimpleCalculator" />
        <Button body="Graphic Calculator" linkPath="/GraphicCalculator" />
        <Button body="Scientific Calculator" linkPath="/ScientificCalculator" />
      </div>
    </div>
  );
};

export default CalculatorHome;
