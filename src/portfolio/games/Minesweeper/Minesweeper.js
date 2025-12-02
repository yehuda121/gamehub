// export default Minesweeper;
import React, { useState, useEffect } from "react";
import "./Minesweeper.css";
import { useTranslation } from "react-i18next";

const Minesweeper = () => {
    // State variables
    const [boardSize, setBoardSize] = useState(10);
    const [numMines, setNumMines] = useState(10);
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [difficulty, setDifficulty] = useState("easy"); 
    const { t } = useTranslation();
    // Images
    const backgroundImage = process.env.PUBLIC_URL + "/background-games.avif";
    const flagImage = process.env.PUBLIC_URL + "/israel-flag-png.png";
    const mineImage = process.env.PUBLIC_URL + "/mine.png";

    // Directions for neighbor traversal (8 neighbors)
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    // Initialize board when component mounts or when size/mines change
    useEffect(() => {
        initializeBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardSize, numMines]);

  // Function to create a fresh board with mines and adjacent counts
  const initializeBoard = () => {
    const size = boardSize;
    const mines = Math.min(numMines, size * size - 1); // safety guard

    // Create empty board
    const newBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        isMine: false,
        isOpen: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (!newBoard[x][y].isMine) {
        newBoard[x][y].isMine = true;
        minesPlaced++;
      }
    }

    // Compute adjacent mine counts
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (newBoard[x][y].isMine) continue;

        let count = 0;
        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            nx < size &&
            ny >= 0 &&
            ny < size &&
            newBoard[nx][ny].isMine
          ) {
            count++;
          }
        }

        newBoard[x][y].adjacentMines = count;
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
  };

  // Function to check win condition:
  // Player wins if every non-mine cell is open.
  const checkWin = (currentBoard) => {
    for (let row of currentBoard) {
      for (let cell of row) {
        if (!cell.isMine && !cell.isOpen) {
          return false;
        }
      }
    }
    setGameWon(true);
    alert("Congratulations! You won the game!");
    return true;
  };

  // Function to reveal a cell and expand if there are 0 adjacent mines
  const floodReveal = (startX, startY, currentBoard) => {
    const size = currentBoard.length;
    const stack = [[startX, startY]];

    while (stack.length > 0) {
      const [x, y] = stack.pop();

      if (
        x < 0 ||
        x >= size ||
        y < 0 ||
        y >= size ||
        currentBoard[x][y].isOpen ||
        currentBoard[x][y].isFlagged
      ) {
        continue;
      }

      currentBoard[x][y].isOpen = true;

      // If no adjacent mines, continue to neighbors
      if (currentBoard[x][y].adjacentMines === 0 && !currentBoard[x][y].isMine) {
        for (const [dx, dy] of directions) {
          stack.push([x + dx, y + dy]);
        }
      }
    }
  };

  // Function to handle left-click on a cell
  const handleClick = (x, y) => {
    if (gameOver || gameWon || !board.length) return;

    const size = board.length;
    if (x < 0 || x >= size || y < 0 || y >= size) return;

    const currentBoard = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const cell = currentBoard[x][y];

    if (cell.isOpen || cell.isFlagged) return;

    // If clicked on a mine -> game over
    if (cell.isMine) {
      setGameOver(true);

      // Reveal all mines
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (currentBoard[i][j].isMine) {
            currentBoard[i][j].isOpen = true;
          }
        }
      }

      setBoard(currentBoard);
      alert("Game Over! You clicked on a mine.");
      return;
    }

    // If not a mine -> reveal this cell and flood if needed
    floodReveal(x, y, currentBoard);
    setBoard(currentBoard);
    checkWin(currentBoard);
  };

  // Function to handle right-click (flagging)
  const handleRightClick = (event, x, y) => {
    event.preventDefault();
    if (gameOver || gameWon || !board.length) return;

    const size = board.length;
    if (x < 0 || x >= size || y < 0 || y >= size) return;

    const currentBoard = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const cell = currentBoard[x][y];

    if (cell.isOpen) return;

    cell.isFlagged = !cell.isFlagged;
    setBoard(currentBoard);
    // We do not require flags for win condition, so we don't call checkWin here.
  };

  // Function to handle difficulty level change
  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);

    switch (selectedDifficulty) {
      case "easy":
        setBoardSize(8);
        setNumMines(8);
        break;
      case "hard":
        setBoardSize(12);
        setNumMines(20);
        break;
      case "very-hard":
        setBoardSize(16);
        setNumMines(40);
        break;
      default:
        break;
    }
  };

  return (
    <div className="ms-page">
      <div className="ms-header">
        <h1 className="ms-title">{t("minesweeper.title")}</h1>
        <p className="ms-instructions">{t("minesweeper.instructions")}</p>
      </div>

      <div className="ms-panel">
        <label className="ms-label" htmlFor="difficulty">
          {t("minesweeper.difficultyLabel")}
        </label>

        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="ms-select"
        >
          <option value="easy">{t("minesweeper.difficultyEasy")}</option>
          <option value="hard">{t("minesweeper.difficultyMedume")}</option>
          <option value="very-hard">{t("minesweeper.difficultyHard")}</option>
        </select>

        <button className="ms-btn" onClick={initializeBoard}>
          {t("minesweeper.buttonStartOver")}
        </button>
      </div>

      <div className="ms-board">
        {board.map((row, x) => (
          <div key={x} className="ms-row">
            {row.map((cell, y) => (
              <div
                key={`${x}-${y}`}
                className={`ms-cell
                  ${cell.isOpen ? "open" : ""}
                  ${cell.isFlagged ? "flag" : ""}
                  ${cell.isMine && cell.isOpen ? "mine" : ""}`}
                onClick={() => handleClick(x, y)}
                onContextMenu={(event) => handleRightClick(event, x, y)}
              >
                {cell.isOpen && !cell.isMine && cell.adjacentMines > 0 ? (
                  <span className="ms-number" data-number={cell.adjacentMines}>
                    {cell.adjacentMines}
                  </span>
                ) : null}

                {cell.isOpen && cell.isMine && (
                  <img src="/mine.png" alt="mine" className="ms-mine-img" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Minesweeper;
