import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/Map.css";
import Geolocation from "../components/Geolocation";
import { useUser } from "../context/UserContext";

function Map() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
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
  const markersData = [
    {
      id: 1,
      coordinates: [50.622553, 2.285938],
      iconUrl: "../../public/cat-art.png",
      popupContent: {
        title: "amazing cat",
        image: "../../public/cat-art.png",
        description: "bastille",
      },
    },
    {
      id: 2,
      coordinates: [44.131393, 4.724903],
      iconUrl: "../../public/lisa.png",
      popupContent: {
        title: "lisa",
        image: "../../public/lisa.png",
        description: "nation",
      },
    },
    {
      id: 3,
      coordinates: [45.703845, -0.26289],
      iconUrl: "../../public/artspert.png",
      popupContent: {
        title: "artspert",
        image: "../../public/artspert.png",
        description: "republique",
      },
    },
  ];

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
        {markersData.map((marker) => (
          <Marker
            key={marker.id}
            icon={new L.Icon({ iconUrl: marker.iconUrl, iconSize: [25, 25] })}
            position={marker.coordinates}
          >
            <Popup>
              <p>{marker.popupContent.title}</p>
              <img
                src={marker.popupContent.image}
                alt={marker.popupContent.title}
                height="250px"
                width="250px"
              />
              <p>{marker.popupContent.description}</p>
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
