import React, { useRef, useState, useEffect, useContext } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom'; // Update this import path as necessary
import axios from 'axios';
import User from './User.js'
import UserContext from './usercontext.js';
import Navbar from './components/Navbar.js';
import './login.css';

const AuthenticationPage = ({ onFail }) => {
  const webcamRef = useRef(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [username, setUsername] = useState(null);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // Use the navigate method to perform redirection
  const { setUser } = useContext(UserContext);
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
        let user1 = await axios.get('/db/getUserById', {params: {id: result.username}});
        let userInstance =  new User(user1.data._id,user1.data.user_type, user1.data.password_cleartext, user1.data.first_name, user1.data.last_name,  user1.data.enrolment, user1.data.photo_string);
        setUser(userInstance);
        navigate('/dashboard');
      } else {
        setAuthStatus("showLoginForm");
        setErrorMessage("Invalid username or password");
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
        // setUsername(result.username);
        let user1 = await axios.get('/db/getUserById', {params: {id: result.username}});
        let userInstance =  new User(user1.data._id,user1.data.user_type, user1.data.password_cleartext, user1.data.first_name, user1.data.last_name,  user1.data.enrolment, user1.data.photo_string);
        setUser(userInstance);
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
    <>
    <Navbar/>
    <div className="authentication">
      <h2>Log in</h2>
      {authStatus === "success" && (
        <p className="messageStyle">Authentication successful! Logging in as {username}</p>
      )}
      {authStatus === "showLoginForm" ? (
          <div className="input">
            {/* <label className="labelStyle">Username:</label> */}
            <input 
              type="text" 
              placeholder="Username" 
              value={enteredUsername} 
              onChange={e => setEnteredUsername(e.target.value)} 
              className="inputStyle"
            />
            {/* <label className="labelStyle">Password:</label> */}
            <input 
              type="password" 
              placeholder="Password" 
              value={enteredPassword} 
              onChange={e => setEnteredPassword(e.target.value)} 
              className="inputStyle"
            />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button onClick={handleLogin}>LOGIN</button>
        </div>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcamStyle"
          />
          {!authStatus && <p className="messageStyle">Authenticating...</p>}
        </>
      )}
    </div>
    </>
  );
};

// const containerStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '100vh',
//   textAlign: 'center',
//   backgroundColor: 'lightblue',
//   position: 'relative'
// };

// const loginFormStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: '10px',
//   width: '300px'
// };

// const inputGroupStyle = {
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   width: '350px',
//   marginBottom: '5px',
// };

// const labelStyle = {
//   marginRight: '20px',
// };

// const inputStyle = {
//   width: '80%',
//   padding: '5px 10px'
// };

// const webcamStyle = {
//   boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.2)'
// };

// const messageStyle = {
//   marginTop: '20px',
//   fontSize: '18px',
//   fontWeight: 'bold'
// };

export default AuthenticationPage;
