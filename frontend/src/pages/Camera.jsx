import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import "../css/camera.css";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: { ideal: 1080 },
    height: { ideal: 1920 },
    facingMode: "user",
    aspectRatio: window.innerWidth / window.innerHeight,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <div className="camera-container">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Captured"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div className="btn-container">
        <Link
          type="button"
          className="button-back"
          to="/camera"
          onClick={() => setImgSrc(null)}
        >
          <img alt="button" src="../../public/boutonAB.png" />
          <div className="button-text">Back</div>
        </Link>
        {!imgSrc && (
          <button type="button" className="button-take" onClick={capture}>
            <img alt="button" src="../../public/boutonAB.png" />
            <div className="button-text">Snap !</div>
          </button>
        )}
        {imgSrc && (
          <button type="button" className="button-post">
            <img alt="button" src="../../public/boutonAB.png" />
            <div className="button-text">Post-it</div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Camera;
