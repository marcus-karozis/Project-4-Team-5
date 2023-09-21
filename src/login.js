import React, { useState } from 'react';
import { FaceClient } from '@azure/cognitiveservices-face';

// Initialize the Azure Face API client
const faceClient = new FaceClient('<Your-API-KEY>', '<Your-API-ENDPOINT>');

const AuthenticationPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFaceRecognition = async () => {
    // Assume faceImageData contains the face image data
    const faceImageData = ''; // Fetch this data from your UI
    try {
      const result = await faceClient.face.detectWithStream(faceImageData);
      if (result.length > 0) {
        // Face detected successfully, proceed with your logic
      } else {
        // No face detected or some error occurred
        setShowLoginForm(true);
      }
    } catch (error) {
      console.error("Azure Face API Error:", error);
      setShowLoginForm(true);
    }
  };

  const handleLogin = () => {
    // Your login logic here
  };

  return (
    <div className="authentication-container">
      {!showLoginForm ? (
        <>
          <h2>Facial Recognition</h2>
          {/* Your Facial Recognition UI here */}
          <button onClick={handleFaceRecognition}>Verify Face</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthenticationPage;
