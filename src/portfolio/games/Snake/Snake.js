import React, { useState, useEffect, useRef } from 'react';
import './Snake.css';

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 10;
const SPEED_THRESHOLD = 5;

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

const generateRandomFood = (snake) => {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS),
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
};

const generateMatrix = (snake, food) => {
    const matrix = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    snake.forEach(segment => {
        if (segment.y >= 0 && segment.y < ROWS && segment.x >= 0 && segment.x < COLS) {
            matrix[segment.y][segment.x] = 1;
        }
    });
    if (food.y >= 0 && food.y < ROWS && food.x >= 0 && food.x < COLS) {
        matrix[food.y][food.x] = 2;
    }
    return matrix;
};

const Snake = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
    const [food, setFood] = useState(generateRandomFood([{ x: 10, y: 10 }, { x: 9, y: 10 }]));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [gameOver, setGameOver] = useState(false);
    const [foodsEaten, setFoodsEaten] = useState(0);
    const gameLoop = useRef(null);
    const directionQueue = useRef([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newDirection = direction;
            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== Direction.DOWN) newDirection = Direction.UP;
                    break;
                case 'ArrowDown':
                    if (direction !== Direction.UP) newDirection = Direction.DOWN;
                    break;
                case 'ArrowLeft':
                    if (direction !== Direction.RIGHT) newDirection = Direction.LEFT;
                    break;
                case 'ArrowRight':
                    if (direction !== Direction.LEFT) newDirection = Direction.RIGHT;
                    break;
                default:
                    break;
            }
            if (directionQueue.current[directionQueue.current.length - 1] !== newDirection) {
                directionQueue.current.push(newDirection);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction]);

    useEffect(() => {
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            touchStartX.current = touch.clientX;
            touchStartY.current = touch.clientY;
        };

        const handleTouchMove = (e) => {
            if (!touchStartX.current || !touchStartY.current) return;

            const touch = e.touches[0];
            const diffX = touch.clientX - touchStartX.current;
            const diffY = touch.clientY - touchStartY.current;

            let newDirection = direction;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0 && direction !== Direction.LEFT) {
                    newDirection = Direction.RIGHT;
                } else if (diffX < 0 && direction !== Direction.RIGHT) {
                    newDirection = Direction.LEFT;
                }
            } else {
                if (diffY > 0 && direction !== Direction.UP) {
                    newDirection = Direction.DOWN;
                } else if (diffY < 0 && direction !== Direction.DOWN) {
                    newDirection = Direction.UP;
                }
            }

            if (directionQueue.current[directionQueue.current.length - 1] !== newDirection) {
                directionQueue.current.push(newDirection);
            }

            touchStartX.current = null;
            touchStartY.current = null;
            e.preventDefault();  // Prevent the default action
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false }); // Add passive: false here

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [direction]);

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);

    const moveSnake = () => {
        setSnake((prevSnake) => {
            const head = prevSnake[0];
            let newDirection = direction;

            if (directionQueue.current.length > 0) {
                newDirection = directionQueue.current.shift();
                setDirection(newDirection);
            }

            let newHead;

            switch (newDirection) {
                case Direction.UP:
                    newHead = { x: head.x, y: head.y - 1 };
                    break;
                case Direction.DOWN:
                    newHead = { x: head.x, y: head.y + 1 };
                    break;
                case Direction.LEFT:
                    newHead = { x: head.x - 1, y: head.y };
                    break;
                case Direction.RIGHT:
                    newHead = { x: head.x + 1, y: head.y };
                    break;
                default:
                    break;
            }

            if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
                setGameOver(true);
                clearInterval(gameLoop.current);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake.slice(0, -1)];
            return newSnake;
        });
    };

    const growSnake = () => {
        setSnake((prevSnake) => {
            const tail = prevSnake[prevSnake.length - 1];
            const newTail = { x: tail.x, y: tail.y };
            return [...prevSnake, newTail];
        });
    };

    const increaseSpeed = () => {
        setSpeed((prevSpeed) => Math.max(50, prevSpeed - SPEED_INCREMENT));
    };

    const isCollided = () => {
        const head = snake[0];
        return (
            head.x < 0 || 
            head.x >= COLS || 
            head.y < 0 || 
            head.y >= ROWS || 
            snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        );
    };

    const isEatingFood = () => {
        const head = snake[0];
        return head.x === food.x && head.y === food.y;
    };

    useEffect(() => {
        if (isCollided()) {
            setGameOver(true);
            clearInterval(gameLoop.current);
        } else if (isEatingFood()) {
            growSnake();
            setFood(generateRandomFood(snake));
            setFoodsEaten((prevFoodsEaten) => prevFoodsEaten + 1);
            if ((foodsEaten + 1) % SPEED_THRESHOLD === 0) {
                increaseSpeed();
            }
        }
    }, [snake, foodsEaten, food]);

    useEffect(() => {
        if (!gameOver) {
            clearInterval(gameLoop.current);
            gameLoop.current = setInterval(() => {
                moveSnake();
            }, speed);
            
            return () => clearInterval(gameLoop.current);
        }
    }, [speed, gameOver, direction]);

    const renderGrid = () => {
        const matrix = generateMatrix(snake, food);
        const cells = [];

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const value = matrix[row][col];
                cells.push(
                    <div
                        key={`${row}-${col}`}
                        className={`cell ${value === 1 ? 'snake' : ''} ${value === 2 ? 'food' : ''}`}
                        style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    ></div>
                );
            }
        }
        return cells;
    };

    const restartGame = () => {
        setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
        setFood(generateRandomFood([{ x: 10, y: 10 }, { x: 9, y: 10 }]));
        setDirection(Direction.RIGHT);
        setSpeed(INITIAL_SPEED);
        setGameOver(false);
        setFoodsEaten(0);
        directionQueue.current = [];
    };

    return (
        <div className="snake-game">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)` }}>
                {renderGrid()}
            </div>
    
            {gameOver && (
                <div className="overlay">
                    <h1>Game Over!</h1>
                    <button onClick={restartGame}>Restart</button>
                </div>
            )}
        </div>
    );
};

export default Snake;
