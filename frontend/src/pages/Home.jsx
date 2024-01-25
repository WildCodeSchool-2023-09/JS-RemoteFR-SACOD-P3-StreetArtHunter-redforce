import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

function Home() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [login, setLogin] = useState({
    email: "adminsah@gmail.com",
    password: "admin",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, login, {
        withCredentials: true,
      })
      .then((res) => {
        console.info(res.data);
        navigate("/map");
      })
      .catch((err) => {
        const message = err.response?.data?.error || "Une erreur est survenue";
        setError(message);
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
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
    backgroundAttachment: "fixed",
    height: 844,
  };

  return (
    <div className="home-container" style={backgroundStyle}>
      <img src="/logo-test3.png" alt="logo" className="logo" />
      <h1 className="inscription-title">Hunt for street art near you!</h1>
      <h2 className="start-text">START GAME</h2>
      <form onSubmit={handleSubmit} className="form">
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
        {error && <div className="error-message">{error}</div>}
        <div className="home-button-container">
          <button className="connexion-button" type="submit">
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
