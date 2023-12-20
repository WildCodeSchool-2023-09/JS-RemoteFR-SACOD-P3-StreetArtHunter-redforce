import "../App.css";
import React, { useState, useEffect } from "react";

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
      <form className="flex flex-col my-auto">
        <h1>Hunt for street art near you!</h1>
        <div>
          <label htmlFor="Username" className="text-label">
            Username
          </label>
          <input type="Username" id="Username" required />
        </div>
        <div>
          <label htmlFor="Email" className="text-label">
            E-mail
          </label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="Password" className="password">
            Password
          </label>
          <input type="password" id="password" required />
        </div>
        <button type="button">Sign Up</button>
      </form>
    </div>
  );
}

export default Inscription;
