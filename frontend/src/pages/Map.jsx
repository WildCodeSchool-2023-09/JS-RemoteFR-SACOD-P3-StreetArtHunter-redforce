import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/Map.css";
import Geolocation from "../components/Geolocation";
import { useUser } from "../context/UserContext";

function Map() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [artworks, setArtworks] = useState([]);
  const mapRef = useRef(null);
  const location = Geolocation();
  const { user } = useUser();
  console.info(user);

  const getRandomImageUrl = () => {
    const randomImageIndex = Math.floor(Math.random() * 10) + 1;
    return `/background${randomImageIndex}.png`;
  };

  useEffect(() => {
    setBackgroundImageUrl(getRandomImageUrl());
  }, []);

  useEffect(() => {
    if (location.loaded && !location.error && mapRef.current) {
      mapRef.current.setView([
        location.coordinates.lat,
        location.coordinates.lng,
      ]);
    }
  }, [location, mapRef.current]);

  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/artworks`)
    .then((res) => {
      setArtworks(res.data[0]);
    })
    .catch((err) => console.error(err));

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: 844,
  };

  const center = {
    lat: 0,
    lng: 0,
  };
  const ZOOM_LEVEL = 13;

  const showMyLocation = () => {
    if (location.loaded && !location.error && mapRef.current) {
      mapRef.current.setView([
        location.coordinates.lat,
        location.coordinates.lng,
      ]);
    }
  };

  return (
    <div className="home-contenair" style={backgroundStyle}>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location.loaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>
              <p>ma localisation</p>
            </Popup>
          </Marker>
        )}
        {artworks.map((artwork) => (
          <Marker
            key={artwork.id}
            icon={
              new L.Icon({ iconUrl: artwork.photo_src, iconSize: [25, 25] })
            }
            position={(artwork.latitude, artwork.longitude)}
          >
            <Popup>
              <p>{artwork.title}</p>
              <img
                src={artwork.photo_src}
                alt={artwork.title}
                height="250px"
                width="250px"
              />
              <p>{artwork.title}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="button_l-p">
        <Link
          type="button"
          to="/user-profil"
          className="profil-button"
          onClick={showMyLocation}
        >
          <div className="button-text-map">Profil</div>
        </Link>
        <button type="button" className="location" onClick={showMyLocation}>
          <div className="button-text-map">Me</div>
        </button>
        <Link to="/camera" type="button">
          <img
            className="cameralogo"
            alt="camera logo"
            src="../../public/cameralogo.png"
          />
        </Link>
      </div>
    </div>
  );
}

export default Map;
