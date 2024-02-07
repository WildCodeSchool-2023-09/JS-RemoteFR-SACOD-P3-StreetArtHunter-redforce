import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import Cookies from "js-cookie";
import axios from "axios";

import "../css/camera.css";

function ArtworkCam() {
  const webcamRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = Cookies.get("monToken");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const videoConstraints = {
    width: { ideal: 1080 },
    height: { ideal: 1920 },
    facingMode: "user",
    aspectRatio: window.innerWidth / window.innerHeight,
  };

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setImgFile(image);
  }, [webcamRef]);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!imgFile) {
      console.error("Pas de fichier à envoyer.");
      return;
    }
    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    };

    try {
      const formData = new FormData();

      formData.append("avatar", dataURItoBlob(imgFile), "avatar.jpg");
      formData.append("users_id", 1);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.info("Image téléchargée avec succès :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image", error);
    }
  };

  return (
    <div className="main-container">
      <div className="camera-container">
        {imgFile ? (
          <img
            src={imgFile}
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
          to="/map"
          onClick={() => setImgFile(null)}
        >
          <img alt="button" src="../../public/boutonAB.png" />
          <div className="button-text">Back</div>
        </Link>
        {!imgFile && (
          <button type="button" className="button-take" onClick={capture}>
            <img alt="button" src="../../public/boutonAB.png" />
            <div className="button-text">Snap</div>
          </button>
        )}
        {imgFile && (
          <button type="button" className="button-post" onClick={uploadImage}>
            <img alt="button" src="../../public/boutonAB.png" />
            <div className="button-text">Post</div>
          </button>
        )}
      </div>
    </div>
  );
}

export default ArtworkCam;
