import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const AuthenticationPage = () => {
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
      }
    } catch (error) {
      setAuthStatus("error");
      setUsername(null);
      console.error("Error during face recognition:", error);
    }
  };

  useEffect(() => {
    // Setting a delay to ensure the webcam is ready
    const timeoutId = setTimeout(handleFaceRecognition, 3000);
    return () => clearTimeout(timeoutId); // Cleanup to avoid memory leaks
  }, []);

  return (
    <div className="authentication-container">
      <h2>Facial Recognition</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {authStatus === "success" ? (
        <p>Login Successful as {username}</p>
      ) : (
        <p>Authenticating...</p>
      )}
      {authStatus === "fail" && (
        <div>
          <p>Face not recognized or authentication failed.</p>
          <button onClick={handleFaceRecognition}>Try Again</button>
        </div>
      )}
      {authStatus === "error" && (
        <div>
          <p>An error occurred. Please try again.</p>
          <button onClick={handleFaceRecognition}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
