import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/inscription.css";

function Inscription() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
    confirmPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
    console.info(register);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, register)
      .then((res) => {
        console.info(res);
        navigate("/map");
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
        <div className="label-container">
          <label htmlFor="confirmPassword" className="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            onChange={handleChange}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
        <button className="connexion-button" type="submit">
          Sign Up
        </button>
        <Link to="/home">
          <button className="back-button" type="submit">
            Back
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Inscription;
