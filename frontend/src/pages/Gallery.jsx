import React, { useState, useEffect } from "react";

function Gallery() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const getRandomImageUrl = () => {
    const randomImageIndex = Math.floor(Math.random() * 10) + 1;
    return `/background${randomImageIndex}.png`;
  };

  useEffect(() => {
    setBackgroundImageUrl(getRandomImageUrl());
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundattachment: "fixed",
    height: 844,
  };

  return (
    <div className="galery-contenair" style={backgroundStyle}>
      <img
        src="https://i.pinimg.com/originals/f2/38/54/f238549aa412e46c7c7e7ef5de103e70.jpg"
        alt="street art"
      />
      <button type="button" className="back-button">
        Retour
      </button>
    </div>
  );
}

export default Gallery;
