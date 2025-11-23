// GamesHome.js

import React from 'react';
import { Link } from 'react-router-dom';
import './GameHome.css';

function GamesHome() {
  const games = [
    {
      id: 'minesweeper',
      title: 'Minesweeper',
      path: '/Minesweeper',
      description:
        'A classic logic-based grid game focused on deduction and careful planning.',
      tags: ['React', 'State management', 'Game logic'],
    },
    {
      id: 'backgammon',
      title: 'Backgammon',
      path: '/Backgammon',
      description:
        'Implementation of the traditional board game with turn-based logic and dice rolls.',
      tags: ['React', 'Game rules', 'UI interactions'],
    },
    {
      id: 'snake',
      title: 'Snake',
      path: '/Snake',
      description:
        'Real-time snake movement, collision detection and increasing difficulty over time.',
      tags: ['Canvas-style movement', 'Collision detection'],
    },
    {
      id: 'clicker',
      title: 'Clicker Game',
      path: '/ClickerGame',
      description:
        'A simple incremental game used as a sandbox for state updates and UI feedback loops.',
      tags: ['React', 'Incremental logic'],
    },
  ];

  return (
    <div className="games-page">
      <section className="games-header">
        <h1 className="games-title">Games Playground</h1>
        <p className="games-subtitle">
          A small collection of side games built as experiments in UI,
          state management and game mechanics. These are not production
          systems, but they demonstrate curiosity and hands-on practice.
        </p>
      </section>

      <section className="games-grid">
        {games.map((game) => (
          <article key={game.id} className="game-card">
            <div className="game-card-header">
              <h2 className="game-card-title">{game.title}</h2>
              <span className="game-card-pill">Personal sandbox</span>
            </div>
            <p className="game-card-description">{game.description}</p>

            {game.tags && (
              <div className="game-card-tags">
                {game.tags.map((tag) => (
                  <span key={tag} className="game-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="game-card-actions">
              <Link to={game.path} className="game-card-button">
                Open game
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default GamesHome;
