import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        <button type="button" className="button-back">
          Retour
        </button>
        {imgSrc === null ? (
          <button type="button" onClick={capture}>
            Take your picture!
          </button>
        ) : (
          <button type="button" className="button-post">
            Post-it!
          </button>
        )}
      </div>
    </div>
  );
}

export default Camera;
