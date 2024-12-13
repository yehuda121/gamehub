
// Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; 

const Button = ({ body, linkPath, onClick, className, disabled }) => {
    return (
        <Link to={linkPath}>
            <button className={`gamehab-button ${className}`} onClick={onClick} disabled={disabled}>
                {body}
            </button>
        </Link>
    );
};

export default Button;
