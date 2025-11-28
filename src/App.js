import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './portfolio/pages/HomePage/HomePage';
import GamesHome from './portfolio/games/GamesHomePage/GamesHome';
import Login from './portfolio/pages/Login/Login';
import Minesweeper from './portfolio/games/Minesweeper/Minesweeper';
import Backgammon from './portfolio/games/Backgammon/Backgammon';
import Snake from './portfolio/games/Snake/Snake';
// import GraphicCalculator from './portfolio/Calculators/GraphicCalculator';
import CalculatorsHome from './portfolio/Calculators/CalculatorHomePage/CalculatorsHome';
import ScientificCalculator from './portfolio/Calculators/ScientificCalculator/ScientificCalculator';
import SimpleCalculator from './portfolio/Calculators/SimpleCalculator/SimpleCalculator';
// import Navbar from './portfolio/components/Navbar/Navbar';
import Navbar from './portfolio/components/Navbar/Navbar';
import ClickerGame from './portfolio/games/ClickerGame/ClickerGame';
import WizardArenaGame from './portfolio/games/WizardArena/WizardArenaGame';


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
        <Route path="/WizardArena3D" element={<WizardArenaGame />} />
        {/* <Route path="/GraphicCalculator" element={<GraphicCalculator/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


