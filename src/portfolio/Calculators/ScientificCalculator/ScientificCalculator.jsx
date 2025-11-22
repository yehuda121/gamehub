import React, { useState, useEffect } from 'react';
import './ScientificCalculator.css';

// problems
// 1 -> the result do not show has a result
// 2 -> need to check all the errors and nan to see that its work as expected
// 3 -> need background set
// 4 -> the result is int and mot flot (delete the decimal)

const ScientificCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [equalClicked, setEqualClicked] = useState(false);

  // use the expression and result whenever they change
  useEffect(() => {
    if (equalClicked) {
      setExpression(result.toString());
      setResult('');
      setEqualClicked(false);
    } else if (result === 'Error' || result === 'NaN' || expression === 'NaN') {
      setExpression('');
      setResult('Error');
    }
  }, [equalClicked, result, expression]);

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
    'sin': 4,
    'cos': 4,
    'sqrt': 4,
    '%': 4,
  };

  // Helper function to check if a character is an operator
  const isOperator = (char) => /[+\-*/^%]/.test(char);
  // Helper function to check if a string is a function
  const isFunction = (func) => ['sin', 'cos', 'sqrt'].includes(func);

  // Function to convert infix expression to postfix (Reverse Polish Notation) using Shunting Yard algorithm
  const toPostfix = (infix) => {
    const output = [];
    const operators = [];
    const tokens = infix.match(/(\d+|\+|\-|\*|\/|\^|\(|\)|sin|cos|sqrt|%)/g);

    tokens.forEach((token) => {
      if (/\d/.test(token)) {
        // If the token is a number, add it to the output
        output.push(token);
      } else if (isFunction(token)) {
        // If the token is a function, push it to the operators stack
        operators.push(token);
      } else if (token === '(') {
        // If the token is '(', push it to the operators stack
        operators.push(token);
      } else if (token === ')') {
        // If the token is ')', pop from the operators stack to the output until '(' is found
        while (operators.length && operators[operators.length - 1] !== '(') {
          output.push(operators.pop());
        }
        operators.pop();
        if (isFunction(operators[operators.length - 1])) {
          output.push(operators.pop());
        }
      } else if (isOperator(token)) {
        // If the token is an operator, pop from the operators stack to the output based on precedence
        while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
          output.push(operators.pop());
        }
        operators.push(token);
      }
    });

    // Pop all remaining operators to the output
    while (operators.length) {
      output.push(operators.pop());
    }

    return output;
  };

  // Function to evaluate postfix expression
  const evaluatePostfix = (postfix) => {
    const stack = [];

    postfix.forEach((token) => {
      if (/\d/.test(token)) {
        // If the token is a number, push it to the stack
        stack.push(parseFloat(token));
      } else if (isOperator(token)) {
        // If the token is an operator, pop two values from the stack and apply the operator
        const b = stack.pop();
        const a = stack.pop();
        let result;

        switch (token) {
          case '+':
            result = a + b;
            break;
          case '-':
            result = a - b;
            break;
          case '*':
            result = a * b;
            break;
          case '/':
            result = a / b;
            break;
          case '^':
            result = Math.pow(a, b);
            break;
          case '%':
            result = a * 0.01;
            break;
          default:
            break;
        }

        stack.push(result);
      } else if (isFunction(token)) {
        // If the token is a function, pop one value from the stack and apply the function
        const a = stack.pop();
        let result;

        switch (token) {
          case 'sin':
            result = Math.sin(a);
            break;
          case 'cos':
            result = Math.cos(a);
            break;
          case 'sqrt':
            result = Math.sqrt(a);
            break;
          default:
            break;
        }

        stack.push(result);
      }
    });

    return stack[0];// The final result will be the only value left in the stack
  };

  const handleButtonClick = (value) => {
    let expr = expression.toString(); // Ensure expression is a string
    if (result === 'Error' || result === 'NaN' || expr === 'NaN') {
      setExpression('');
      setResult('');
    }

    if (value === '=') {
      // If '=' is clicked, evaluate the expression
      setEqualClicked(true);
      try {
        const postfix = toPostfix(expr);
        const evalResult = evaluatePostfix(postfix);
        setResult(evalResult);
        setExpression(`${expr} = ${evalResult}`);
      } catch (error) {
        setResult('Error');
        setExpression('');
      }
    } else if (value === 'clear') {
      // If 'clear' is clicked, reset the expression and result
      setExpression('');
      setResult('');
    } else if (value === 'delete') {
      // If 'delete' is clicked, remove the last input
      if (expr.endsWith('sin') || expr.endsWith('cos')) {
        setExpression(expr.slice(0, -3));
      } else if (expr.endsWith('cos(') || expr.endsWith('sqrt') || expr.endsWith('sin(')) {
        setExpression(expr.slice(0, -4));
      } else if (expr.endsWith('sqrt(')) {
        setExpression(expr.slice(0, -5));
      } else {
        setExpression(expr.slice(0, -1));
      }
    } else {
      // For any other button click, append the value to the expression
      setExpression(`${expr}${value}`);
    }
  };

  return (
    <div className="scientific-calculator">
      <h2>Scientific Calculator</h2>
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <div className="scientific-keypad">
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('delete')} className="delete">del</button>
        <button onClick={() => handleButtonClick('clear')} className="clear">C</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('*')} className="operator">*</button>
        <button onClick={() => handleButtonClick('/')} className="operator">/</button>
        <button onClick={() => handleButtonClick('1')} className="number">1</button>
        <button onClick={() => handleButtonClick('2')} className="number">2</button>
        <button onClick={() => handleButtonClick('3')} className="number">3</button>
        <button onClick={() => handleButtonClick('+')} className="operator">+</button>
        <button onClick={() => handleButtonClick('-')} className="operator">-</button>
        <button onClick={() => handleButtonClick('0')} className="number">0</button>
        <button onClick={() => handleButtonClick('.')} className="decimal">.</button>
        <button onClick={() => handleButtonClick('(')} className="parenthesis">(</button>
        <button onClick={() => handleButtonClick(')')} className="parenthesis">)</button>
        <button onClick={() => handleButtonClick('^')} className="function">^</button>
        <button onClick={() => handleButtonClick('=')} className="equal">=</button>
        <button onClick={() => handleButtonClick('sin')} className="function">sin</button>
        <button onClick={() => handleButtonClick('cos')} className="function">cos</button>
        <button onClick={() => handleButtonClick('sqrt')} className="function">sqrt</button>
        <button onClick={() => handleButtonClick('%')} className="function">%</button>
      </div>
    </div>
  );
};

export default ScientificCalculator;
