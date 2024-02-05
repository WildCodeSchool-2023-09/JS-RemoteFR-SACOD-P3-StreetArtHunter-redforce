import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/admin.css";

function List({ items, profils, artworks }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img
              src={item.photo_src}
              alt={item.id}
              style={{ height: "100px", width: "100px" }}
            />
            <p>ID: {item.id}</p>
            <p>validation_status: {item.validation_status}</p>
            {/* Ajoutez d'autres informations si nécessaire */}
          </li>
        ))}
      </ul>
      <ul>
        {profils.map((profil) => (
          <li key={profil.id}>
            <p>ID: {profil.id}</p>
            <p>pseudo: {profil.pseudo}</p>
            <p>email: {profil.email}</p>
            <p>inscription_date: {profil.inscription_date}</p>
            {/* Ajoutez d'autres informations si nécessaire */}
          </li>
        ))}
      </ul>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <p>ID: {artwork.id}</p>
            <p>first_post_date: {artwork.first_post_date}</p>
            <p>post_date: {artwork.post_date}</p>
            <p>users_id: {artwork.users_id}</p>
            <p>title: {artwork.title}</p>
            <p>latitude: {artwork.latitude}</p>
            <p>longitude: {artwork.longitude}</p>
            {/* Ajoutez d'autres informations si nécessaire */}
          </li>
        ))}
      </ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      photo_src: PropTypes.string.isRequired,
      validation_status: PropTypes.number.isRequired,

      // ... autres propriétés
    })
  ).isRequired,
  profils: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      pseudo: PropTypes.string.isRequired,
      inscription_date: PropTypes.instanceOf(Date).isRequired,
      // ... autres propriétés
    })
  ).isRequired,
  artworks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_post_date: PropTypes.instanceOf(Date).isRequired,
      post_date: PropTypes.instanceOf(Date).isRequired,
      users_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      // ... autres propriétés
    })
  ).isRequired,
};

export default function Admin() {
  const [showValidationPhotos, setShowValidationPhotos] = useState(false);
  const [showUserProfileList, setShowUserProfileList] = useState(false);
  const [showStreetArtList, setShowStreetArtList] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const [validationPhotos, setValidationPhotos] = useState([]);
  const [userProfileList, setUserProfileList] = useState([]);
  const [streetArtWorks, setStreetArtWorks] = useState([]);

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

  useEffect(() => {
    console.info("Validation photos state:", validationPhotos);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/validation-status`)
      .then((res) => {
        setValidationPhotos(res.data);
        setShowValidationPhotos(true);
        console.info(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.info("User profile state:", userProfileList);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user`)
      .then((res) => {
        setUserProfileList(res.data);
        setShowUserProfileList(true);
        console.info(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.info("Street art works state:", streetArtWorks);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/artworks`)
      .then((res) => {
        setStreetArtWorks(res.data);
        setShowStreetArtList(true);
        console.info(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="profile-contenair" style={backgroundStyle}>
      <button
        className="validation"
        type="button"
        onClick={() => setShowValidationPhotos(!showValidationPhotos)}
      >
        <div className="button-text">Photos awaiting validation</div>
      </button>
      {showValidationPhotos && <List items={validationPhotos} />}

      <button
        className="profil-list-button"
        type="button"
        onClick={() => setShowUserProfileList(!showUserProfileList)}
      >
        <div className="button-text">User profile list</div>
      </button>
      {showUserProfileList && <List profils={userProfileList} />}

      <button
        className="artwork-list-button"
        type="button"
        onClick={() => setShowStreetArtList(!showStreetArtList)}
      >
        <div className="button-text">list of street art works</div>
      </button>
      {showStreetArtList && <List artworks={streetArtWorks} />}

      <button type="button" className="signout-button-admin">
        <div className="button-text">Sign out</div>
      </button>
      <Link type="button" className="button-back-admin" to="/map">
        <div className="button-text">Back</div>
      </Link>
    </div>
  );
}
