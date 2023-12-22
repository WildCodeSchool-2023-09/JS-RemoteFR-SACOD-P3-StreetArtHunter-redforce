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
  });

  const onSuccess = (loc) => {
    const crd = loc.coords;
    if (
      target.latitude === crd.latitude &&
      target.longitude === crd.longitude
    ) {
      console.info("Congratulations, you've reached the target");
      navigator.geolocation.clearWatch(id);
    }
    setLocation({
      loaded: true,
      coordinates: {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
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
    } else {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      id = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }
  }, []);
  return location;
}

export default Geolocation;
