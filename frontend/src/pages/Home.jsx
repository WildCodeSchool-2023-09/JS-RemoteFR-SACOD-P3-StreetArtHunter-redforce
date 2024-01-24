import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "../css/home.css";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Home() {
  const { setUser } = useUser();
  
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  
  const [login, setLogin] = useState({
    email: "johnnyboy59000@gmail.com",
    password: "admin",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, login)
      .then((res) => console.info(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

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
    backgroundAttachment: "fixed", // Correction : "backgroundattachment" -> "backgroundAttachment"
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
    <div className="home-container" style={backgroundStyle}>
      <img src="../public/logo-test3.png" alt="logo" className="logo" />
      <h1 className="inscription-title">Hunt for street art near you!</h1>
      <h2 className="start-text">START GAME</h2>
      {isLoggedIn ? (
        <div>
          <h1>Bienvenue, utilisateur connecté !</h1>
          <button
            onClick={handleLogout}
            className="logout-button"
            type="button"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="form">
          <div className="label-container">
            <label htmlFor="email" className="text-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={login.email}
              required
            />
          </div>
          <div className="label-container">
            <label htmlFor="password" className="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={login.password}
              required
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
      )}
      <Link to="/user-profil">se rendre a la page profil</Link>
    </div>
  );
}

export default Home;
