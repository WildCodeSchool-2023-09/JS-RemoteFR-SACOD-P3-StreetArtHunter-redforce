import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [register, setRegister] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
    console.info(register);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/user", register)
      .then((res) => {
        console.info(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="inscription-contenair" style={backgroundStyle}>
      <img src="../public/logo-test3.png" alt="logo" className="logo" />
      <h1 className="inscription-title">Hunt for street art near you!</h1>
      <form className="form" action="" method="post" onSubmit={handleSubmit}>
        <div className="label-container">
          <label htmlFor="pseudo" className="text-label">
            Pseudo
          </label>
          <input
            type="Username"
            id="Username"
            name="pseudo"
            required
            onChange={handleChange}
          />
        </div>
        <div className="label-container">
          <label htmlFor="email" className="text-label">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="label-container">
          <label htmlFor="Password" className="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <button className="connexion-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Inscription;
