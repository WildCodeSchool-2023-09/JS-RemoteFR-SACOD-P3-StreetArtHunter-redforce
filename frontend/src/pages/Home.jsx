import React, { useState, useEffect } from "react";
import "../css/home.css";

function Home() {
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
    <div className="home-contenair" style={backgroundStyle}>
      <img src="../public/logo-test3.png" alt="logo" className="logo" />
      <h1 className="inscription-title">Hunt for street art near you!</h1>
      <h2 className="start-text">START GAME</h2>
      <form action="" method="post" className="form">
        <div className="label-container">
          <label htmlFor="Username" className="text-label">
            Username/e-mail
          </label>
          <input type="email" id="Username" required />
        </div>
        <div className="label-container">
          <label htmlFor="Password" className="password">
            Password
          </label>
          <input type="password" id="password" required />
        </div>
        <div className="home-button-container">
          <button className="connexion-button" type="button">
            Connexion
          </button>
          <button className="connexion-visiteur" type="button">
            Mode visiteur
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
