import React, { useState } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  

  return (
    <div className="login-container light-blue-background">
      
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;





// Amana Code 

import React from 'react';
import './App.css';
import LoginPage from './LoginPage';

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;




//amana additional code 
import React, { useState } from 'react';

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
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleLogin} disabled={!canSubmit}>
          Log-in
        </button>
      </div>
      <div>
        <a href="/forgot-password">Forgotten Password?</a>
      </div>
    </div>
  );
}

export default LoginPage;



Note: The above code is a basic representation of the requirements you provided. In a real-world application, you'd also consider things like validation, error handling, state management, security concerns like hashing the password before sending it to the server, etc.

