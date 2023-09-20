import React, { useState } from 'react';
import './login.css';




function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    checkCanSubmit(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkCanSubmit(username, e.target.value);
  };

  const checkCanSubmit = (uname, pword) => {
    if (uname && pword) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const handleLogin = () => {
    // Here you would make the API call to your backend to validate the login
    console.log('Logging in with', username, password);
  };

  return (
    <div className="login-container light-blue-background">
  <div className="login-form">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={username} onChange={handleUsernameChange} required />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} required />
      </div>
      <button type="submit" className="login-button">Login</button>
    </form>
    <div className="forgot-password-container">
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  </div>
</div>

  );
}

export default LoginPage;




