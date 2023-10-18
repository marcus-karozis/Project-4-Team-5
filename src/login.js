import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom'
import './login.css'

const AuthenticationPage = ({ onFail }) => {
  const webcamRef = useRef(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'y') {
        setAuthStatus("success");
        setEnteredUsername("Max");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); 
      } else if (e.key === 'n') {
        setAuthStatus("fail");
        setTimeout(() => {
          setAuthStatus("showLoginForm");
        }, 2000); // wait for 2 seconds before showing the login form
      }
    };

    // Add the event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="authentication-container">
      <h2 className="text">Login Page</h2>
      {authStatus === "showLoginForm" ? (
        <div style={loginFormStyle}>
          <div className="input-group" style={inputGroupStyle}>
            <label>Username:</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={enteredUsername} 
              onChange={e => setEnteredUsername(e.target.value)} 
            />
          </div>
          <div className="input-group" style={inputGroupStyle}>
            <label>Password:</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={enteredPassword} 
              onChange={e => setEnteredPassword(e.target.value)} 
            />
          </div>
          <button onClick={() => {}}>Login</button>
        </div>
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={webcamStyle}
        />
      )}
      {authStatus === "success" && <p className="text">Login Successful as {enteredUsername}</p>}
      {authStatus === "fail" && <p className="text">Authentication Unsuccessful</p>}
    </div>
  );
};

// const containerStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '100vh', // Fill the viewport vertically
//   textAlign: 'center',
//   backgroundColor: cornflowerblue // Setting background to light blue
// };

const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px', // Decreased spacing for a tighter look
  width: '300px'
};

const inputGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '5px' // Reduced space between the username and password
};

const webcamStyle = {
  boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.2)' // Adding a soft shadow for some depth
};

// const messageStyle = {
//   marginTop: '20px',
//   fontSize: '18px',
//   fontWeight: 'bold'
// };

export default AuthenticationPage;
