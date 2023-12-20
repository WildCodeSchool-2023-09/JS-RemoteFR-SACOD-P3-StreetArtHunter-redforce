import React, { useState, useEffect } from "react";
import "../App.css";

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
      <form>
        <h1>Hunt for street art near you!</h1>
        <h2>START GAME</h2>
        <div>
          <label htmlFor="Username" className="text-label">
            Username/e-mail
          </label>
          <input type="email" id="Username" required />
        </div>
        <div>
          <label htmlFor="Password" className="password">
            Password
          </label>
          <input type="password" id="password" required />
        </div>
        <button type="button">Connexion</button>
      </form>
    </div>
  );
}

export default Home;
