import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../assets/scss/Map.scss";
import Geolocation from "../components/Geolocation";

function Map() {
  const location = Geolocation();
  const center = {
    lat: 0,
    lng: 0,
  };
  const ZOOM_LEVEL = 13;
  const mapRef = useRef(null);
  const [isMarkerClicked1, setMarkerClicked1] = useState(false);
  const [isMarkerClicked2, setMarkerClicked2] = useState(false);
  const [isMarkerClicked3, setMarkerClicked3] = useState(false);

  if (location.loaded && !location.error) {
    mapRef.current.setView([
      location.coordinates.lat,
      location.coordinates.lng,
    ]);
  } else {
    console.error("error");
  }

  const showMyLocation = () => {
    mapRef.current.setView([
      location.coordinates.lat,
      location.coordinates.lng,
    ]);
  };
  const handleMarkerClick1 = () => {
    setMarkerClicked1((prevClicked) => !prevClicked);
  };
  const handleMarkerClick2 = () => {
    setMarkerClicked2((prevClicked) => !prevClicked);
  };
  const handleMarkerClick3 = () => {
    setMarkerClicked3((prevClicked) => !prevClicked);
  };
  const markerIcon1 = new L.Icon({
    iconUrl: "../../public/cat-art.png",
    iconSize: isMarkerClicked1 ? [300, 300] : [32, 32], // Ajustez la taille de l'icône au clic
    iconAnchor: [isMarkerClicked1 ? 24 : 16, isMarkerClicked1 ? 48 : 32], // Point d'ancrage de l'icône
    popupAnchor: [0, isMarkerClicked1 ? -48 : -32],
  });
  const markerIcon2 = new L.Icon({
    iconUrl: "../../public/lisa.png",
    iconSize: isMarkerClicked2 ? [300, 300] : [32, 32], // Ajustez la taille de l'icône au clic
    iconAnchor: [isMarkerClicked2 ? 24 : 16, isMarkerClicked2 ? 48 : 32], // Point d'ancrage de l'icône
    popupAnchor: [0, isMarkerClicked2 ? -48 : -32],
  });
  const markerIcon3 = new L.Icon({
    iconUrl: "../../public/artspert.png",
    iconSize: isMarkerClicked3 ? [300, 300] : [32, 32], // Ajustez la taille de l'icône au clic
    iconAnchor: [isMarkerClicked3 ? 24 : 16, isMarkerClicked3 ? 48 : 32], // Point d'ancrage de l'icône
    popupAnchor: [0, isMarkerClicked3 ? -48 : -32],
  });

  return (
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location.loaded && !location.error && (
          <Marker // Corrected prop here
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>
              <p>ma localisation</p>
            </Popup>
          </Marker>
        )}
        <Marker
          icon={markerIcon1} // Corrected prop here
          position={[50.28948, 3.869085]}
          eventHandlers={{ click: () => handleMarkerClick1() }}
        >
          <Popup>
            <p>amazing cat</p>
            <p>bastille</p>
          </Popup>
        </Marker>
        <Marker
          icon={markerIcon2} // Corrected prop here
          position={[50.29425, 3.890972]}
          eventHandlers={{ click: () => handleMarkerClick2() }}
        >
          <Popup>
            <p>lisa</p>
            <p>nation</p>
          </Popup>
        </Marker>
        <Marker
          icon={markerIcon3} // Corrected prop here
          position={[50.309789, 3.864533]}
          eventHandlers={{ click: () => handleMarkerClick3() }}
        >
          <Popup>
            <p>artspetrt</p>
            <p>republique</p>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="button_l-p">
        <button type="button" className="location" onClick={showMyLocation}>
          Voir ma localisation
        </button>
        <button type="button" className="picture">
          Appareil photo
        </button>
      </div>
    </div>
  );
}

export default Map;
