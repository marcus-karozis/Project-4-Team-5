import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import LogoutButton from './LogoutButton'; // Assuming LogoutButton is in the same directory

const AuthenticationPage = ({ onFail }) => {
  const webcamRef = useRef(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [username, setUsername] = useState(null);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const handleFaceRecognition = async () => {
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
      } else {
        setAuthStatus("showLoginForm");
      }
    } catch (error) {
      setAuthStatus("showLoginForm");
      console.error("Error during face recognition:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleFaceRecognition, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="authentication-container" style={containerStyle}>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <LogoutButton onLogout={() => {
          setAuthStatus(null);
          setUsername(null);
          // You might also want to add other logout-related actions here.
        }} />
      </div>

      <h2>Login Page</h2>
      {authStatus === "success" && <p style={messageStyle}>Login Successful as {username}</p>}
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
          <button onClick={() => {/* Implement login logic here */}}>Login</button>
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
  position: 'relative' // This is to ensure the absolute positioning of the LogoutButton works correctly
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
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '5px'
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
