import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';

function Homepage() {
  return (
    <div className="homepage">
      <Text className="text-title">Welcome to the Gamehub</Text>
      <div className="button-container">
            <Button body="Login" linkPath="/Login" />
            <Button body="Games" linkPath="/GamesHome" />
            <Button body="Calculators" linkPath="/CalculatorsHome" />
      </div>
      <div className="social-media-container">
        <a href="https://www.linkedin.com/in/yehuda-shmulevitz-61324a194/" target="_blank" rel="noopener noreferrer" className="social-media-link">
          <img src="/linkdinLogo.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/yehuda121?tab=repositories" target="_blank" rel="noopener noreferrer" className="social-media-link">
          <img src="/githubLogo.png" alt="GitHub" />
        </a>
        <a href="https://www.facebook.com/yehuda.shmulevitz.1" target="_blank" rel="noopener noreferrer" className="social-media-link">
          <img src="/facebookLogo.png" alt="Facebook" />
        </a>
      </div>
    </div>
  );
}

export default Homepage;
