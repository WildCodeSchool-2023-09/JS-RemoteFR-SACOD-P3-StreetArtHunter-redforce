import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../assets/scss/Map.scss";
import Geolocation from "../components/Geolocation";

const markerIcon = new L.Icon({
  iconUrl: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function Map() {
  const location = Geolocation();
  const center = {
    lat: 0,
    lng: 0,
  };
  const ZOOM_LEVEL = 13;
  const mapRef = useRef(null);

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
  const bounds = [
    [location.coordinates.lat + 0.005, location.coordinates.lng - 0.01],
    [location.coordinates.lat + 0.015, location.coordinates.lng + 0.01],
  ];

  return (
    <>
    <div>
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href=https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location.loaded && !location.error && (
          <Marker
            Icon={markerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>
              <br /> Amazing cat.
            </Popup>
          </Marker>
        )}
        <ImageOverlay
          url="../src/assets/images/cat-art.jpg"
          bounds={bounds}
          opacity={1}
          zIndex={10}
        />
      </MapContainer>
      <div className="button_l-p">
        <button type="button" className="location" onClick={showMyLocation}>
          Voir ma localisation
        </button>
        <button type="button" className="picture">
          Appareil photo
        </button>
      </div>
    </>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
