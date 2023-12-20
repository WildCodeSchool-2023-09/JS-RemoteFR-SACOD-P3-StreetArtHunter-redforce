import React, { useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../components/Map.scss";

function Map() {
  const [center] = useState({ lat: 51.505, lng: -0.09 });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef(null);
  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href=https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default Map;
