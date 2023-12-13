/* eslint-disable no-shadow */
import { useState, useEffect } from "react";

function Geolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "50.284", lng: "3.924" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
}

export default Geolocation;
