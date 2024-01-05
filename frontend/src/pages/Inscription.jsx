import React, { useState, useEffect } from "react";
import "../css/inscription.css";

function Inscription() {
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
    <div className="inscription-contenair" style={backgroundStyle}>
      <img src="../public/logo-test3.png" alt="logo" className="logo" />
      <h1 className="inscription-title">Hunt for street art near you!</h1>
      <form className="form" action="" method="post">
        <div className="label-container">
          <label htmlFor="Username" className="text-label">
            Username
          </label>
          <input type="Username" id="Username" required />
        </div>
        <div className="label-container">
          <label htmlFor="email" className="text-label">
            E-mail
          </label>
          <input type="email" id="email" required />
        </div>
        <div className="label-container">
          <label htmlFor="Password" className="password">
            Password
          </label>
          <input type="password" id="password" required />
        </div>
        <button className="connexion-button" type="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Inscription;
