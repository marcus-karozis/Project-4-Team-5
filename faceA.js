import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const AuthenticationPage = ({ onFail }) => {
  const webcamRef = useRef(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [username, setUsername] = useState(null);

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
        setAuthStatus("fail");
        setUsername(null);
        onFail();  // This will trigger the redirection to the Login page
      }
    } catch (error) {
      setAuthStatus("error");
      setUsername(null);
      onFail();  // This will also trigger the redirection in case of an error
      console.error("Error during face recognition:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(handleFaceRecognition, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="authentication-container">
      <h2>Facial Recognition</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {authStatus === "success" && <p>Login Successful as {username}</p>}
      {!authStatus && <p>Authenticating...</p>}
    </div>
  );
};

export default AuthenticationPage;
