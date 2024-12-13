import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './gamehub/pages/HomePage/HomePage';
import GamesHome from './gamehub/games/GamesHomePage/GamesHome';
import Login from './gamehub/pages/Login/Login';
import Minesweeper from './gamehub/games/Minesweeper/Minesweeper';
import Backgammon from './gamehub/games/Backgammon/Backgammon';
import Snake from './gamehub/games/Snake/Snake';
// import GraphicCalculator from './gamehub/Calculators/GraphicCalculator';
import CalculatorsHome from './gamehub/Calculators/CalculatorHomePage/CalculatorsHome';
import ScientificCalculator from './gamehub/Calculators/ScientificCalculator/ScientificCalculator';
import SimpleCalculator from './gamehub/Calculators/SimpleCalculator/SimpleCalculator';
import Navbar from './gamehub/components/navbar/navbar';
import ClickerGame from './gamehub/games/ClickerGame/ClickerGame';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Existing routes */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/GamesHome" element={<GamesHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Minesweeper" element={<Minesweeper />} />
        <Route path="/Backgammon" element={<Backgammon />} />
        <Route path="/Snake" element={<Snake />} />
        <Route path="/SimpleCalculator" element={<SimpleCalculator />} />
        <Route path="/ScientificCalculator" element={<ScientificCalculator/>} />
        <Route path="/CalculatorsHome" element={<CalculatorsHome />} />
        <Route path="/ClickerGame" element={<ClickerGame />} />
        {/* <Route path="/GraphicCalculator" element={<GraphicCalculator/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


