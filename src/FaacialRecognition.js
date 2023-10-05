import React, { useRef, useEffect } from 'react';

const FaceRecognitionPopup = ({ onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Activate the camera and stream to the video element
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing the camera", err);
        });
    }

    return () => {
      // Cleanup: stop the camera stream when the component is unmounted
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="popup">
      <video ref={videoRef} autoPlay={true} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FaceRecognitionPopup;
