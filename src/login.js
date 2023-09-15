import React, { useState } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the entered email and password match any user in the list
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setLoginStatus('Login successful');
      // You can perform further actions here, such as redirecting to another page
    } else {
      setLoginStatus('Login failed');
      // Display an error message or handle the login failure as needed
    }
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
        {/* Display login status */}
        {loginStatus && <p className={`login-status ${loginStatus === 'Login successful' ? 'success' : 'failure'}`}>{loginStatus}</p>}
      </div>
    </div>
  );
}

const users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  // Add more users as needed
];

export default Login;
