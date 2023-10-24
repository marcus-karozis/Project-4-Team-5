import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom'; // Update this import path as necessary

const AuthenticationPage = ({ onFail }) => {
  const webcamRef = useRef(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [username, setUsername] = useState(null);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  // Use the navigate method to perform redirection
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: enteredUsername,
          password_cleartext: enteredPassword
        })
      });

      const result = await response.json();

      if (result.status === "success") {
        setAuthStatus("success");
        setUsername(result.username);
        navigate('/dashboard');
      } else {
        setAuthStatus("showLoginForm");
        // Optionally display an error message to the user here
      }
    } catch (error) {
      setAuthStatus("showLoginForm");
      console.error("Error during login:", error);
    }
  };

  const handleFaceRecognition = async () => {
    if (!webcamRef.current) {
      console.warn('Webcam is not available yet.');
      return;
  }
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      const formData = new FormData();
      formData.append('image', imageSrc);

      const response = await fetch('http://localhost:5000/login_with_face', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.status === "success") {
        setAuthStatus("success");
        setUsername(result.username);
        navigate('/dashboard');
      } else {
        setAuthStatus("showLoginForm");
      }
    } catch (error) {
      setAuthStatus("showLoginForm");
      console.error("Error during face recognition:", error);
    }
  };


  useEffect(() => {
    const timeoutId = setTimeout(handleFaceRecognition, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="authentication-container" style={containerStyle}>
      <h2>Login Page</h2>
      {authStatus === "success" && (
        <p style={messageStyle}>Login Successful as {username}</p>
      )}
      {authStatus === "showLoginForm" ? (
        <div style={loginFormStyle}>
          <div className="input-group" style={inputGroupStyle}>
            <label style={labelStyle}>Username:</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={enteredUsername} 
              onChange={e => setEnteredUsername(e.target.value)} 
              style={inputStyle}
            />
          </div>
          <div className="input-group" style={inputGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={enteredPassword} 
              onChange={e => setEnteredPassword(e.target.value)} 
              style={inputStyle}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={webcamStyle}
          />
          {!authStatus && <p style={messageStyle}>Authenticating...</p>}
        </>
      )}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: 'lightblue',
  position: 'relative'
};

const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  width: '300px'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '350px',
  marginBottom: '5px',
};

const labelStyle = {
  marginRight: '20px',
};


const inputStyle = {
  width: '80%', // increased width from the default
  padding: '5px 10px'
};

const webcamStyle = {
  boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.2)'
};

const messageStyle = {
  marginTop: '20px',
  fontSize: '18px',
  fontWeight: 'bold'
};

export default AuthenticationPage;
