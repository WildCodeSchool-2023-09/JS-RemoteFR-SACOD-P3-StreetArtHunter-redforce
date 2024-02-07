import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "../css/camera.css";
import Cookies from "js-cookie";
import axios from "axios";
import Geolocation from "../components/Geolocation";
import { useUser } from "../context/UserContext";
import { roundToDecimalPlaces, dataURItoBlob } from "../services/Camera";

function Camera() {
  const location = Geolocation();

  const webcamRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState(null);
  const [token, setToken] = useState("");
  const [artworks, setArtworks] = useState({});
  const [idArtwork, setIdArtwork] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const userToken = Cookies.get("monToken");
    if (userToken) {
      setToken(userToken);
    }
    if (location.loaded && !location.error && mapRef.current) {
      mapRef.current.setView([
        location.coordinates.lat,
        location.coordinates.lng,
      ]);
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/artwork`)
      .then((res) => {
        setArtworks(res.data);
      })
      .catch((err) => console.error(err));
  }, [location, mapRef.current]);

  const videoConstraints = {
    width: { ideal: 1080 },
    height: { ideal: 1920 },
    facingMode: "user",
    aspectRatio: window.innerWidth / window.innerHeight,
  };

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setImgFile(image);

    const userRoundLat = roundToDecimalPlaces(location.coordinates.lat, 2);
    const userRoundLng = roundToDecimalPlaces(location.coordinates.lng, 2);

    const result = artworks
      .map((artwork) => {
        return userRoundLat === roundToDecimalPlaces(artwork.latitude, 2) &&
          userRoundLng === roundToDecimalPlaces(artwork.longitude, 2)
          ? artwork.id
          : false;
      })
      .filter((element) => Number.isInteger(element));

    if (result.length !== 0) {
      setIdArtwork(result[0]);
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/artwork`, {
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        })
        .then((res) => {
          setIdArtwork(res.data.insertId);
        })
        .catch((err) => console.error(err));
    }
  }, [webcamRef, location.coordinates, artworks]);

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!imgFile) {
      console.error("Pas de fichier à envoyer.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", dataURItoBlob(imgFile), "avatar.jpg");
      formData.append("users_id", user.id);
      formData.append("artwork_id", idArtwork);

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

        // Redirection vers /map après avoir posté la photo
        navigate("/map");
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

export default Camera;
