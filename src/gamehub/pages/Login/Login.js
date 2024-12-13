// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Validate credentials
    if (username === 'manager' && password === 'password') {
      onLogin(username);
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <Text className="text-title">Login</Text>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <Button className='login-button-insideLoginPage' body="Login" linkPath="/Login" onClick={handleLogin} />
      {/* <button onClick={handleLogin} className="login-button">Login</button> */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
