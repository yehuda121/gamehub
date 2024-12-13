import React from 'react';
import { Link } from 'react-router-dom';
import '../navbar/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link className='navbar-left-button' to="/login">Login</Link>
                <Link className='navbar-left-button' to="/">Home</Link>
            </div>
            <div className="navbar-right">
                <div className="dropdown">
                    <button className="dropbtn">Games&#x25BC;</button>
                    <div className="dropdown-content">
                        <Link to="/minesweeper">Minesweeper</Link>
                        <Link to="/snake">Snake</Link>
                        <Link to="/backgammon">Backgammon</Link>
                        <Link to="/ClickerGame">Clicker Game</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Calculators&#x25BC;</button>
                    <div className="dropdown-content">
                        <Link to="/simpleCalculator">Simple Calculator</Link>
                        <Link to="/scientificCalculator">Scientific Calculator</Link>
                        <Link to="/graphicCalculator">Graphic Calculator</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
