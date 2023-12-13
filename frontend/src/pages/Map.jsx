import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/scss/Map.scss";
import Geolocation from "../components/Geolocation";

function Map() {
  const ZOOM_LEVEL = 13;
  const mapRef = useRef(null);

  const location = Geolocation();
  const [center] = useState([
    location.coordinates.lat,
    location.coordinates.lng,
  ]);
  console.info(location);

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href=https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {location.loaded && !location.error && (
        <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
