import { useState, useEffect } from "react";

let id = 0;
const target = {
  latitude: 0,
  longitude: 0,
};

function Geolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;

    if (target.latitude === latitude && target.longitude === longitude) {
      navigator.geolocation.clearWatch(id);
    }

    setLocation({
      loaded: true,
      coordinates: { lat: latitude, lng: longitude },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: "", lng: "" },
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
      id = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }

    return () => {
      if (id) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, []);

  return location;
}

export default Geolocation;
