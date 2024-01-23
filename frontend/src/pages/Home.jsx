import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import "../css/home.css";

function Home() {
  const { setUser } = useUser();
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
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/login", login)
      .then((res) => {
        setUser(res.data.user);
        console.info(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="home-contenair" style={backgroundStyle}>
      <img src="../public/logo-test3.png" alt="logo" className="logo" />
      <h1 className="inscription-title">Hunt for street art near you!</h1>
      <h2 className="start-text">START GAME</h2>
      <form action="" method="post" className="form" onSubmit={handleSubmit}>
        <div className="label-container">
          <label htmlFor="Email" className="text-label">
            Username/e-mail
          </label>
          <input
            type="email"
            id="Username"
            required
            name="email"
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
            required
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="home-button-container">
          <button className="connexion-button" type="submit">
            Connexion
          </button>
          <button className="connexion-visiteur" type="button">
            Mode visiteur
          </button>
        </div>
      </form>
      <Link to="/user-profil">se rendre a la page profil</Link>
    </div>
  );
}

export default Home;
