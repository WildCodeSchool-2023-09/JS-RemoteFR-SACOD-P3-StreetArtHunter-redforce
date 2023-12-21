import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../css/admin.css";

function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Admin() {
  const [showValidationPhotos, setShowValidationPhotos] = useState(false);
  const [showUserProfileList, setShowUserProfileList] = useState(false);
  const [showStreetArtList, setShowStreetArtList] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const validationPhotos = ["Photo 1", "Photo 2", "Photo 3"];
  const userProfiles = ["Profil 1", "Profil 2", "Profil 3"];
  const streetArtWorks = ["Œuvre 1", "Œuvre 2", "Œuvre 3"];

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
      {showUserProfileList && <List items={userProfiles} />}

      <button
        className="artwork-list-button"
        type="button"
        onClick={() => setShowStreetArtList(!showStreetArtList)}
      >
        <div className="button-text">list of street art works</div>
      </button>
      {showStreetArtList && <List items={streetArtWorks} />}

      <button type="button" className="signout-button">
        <div className="button-text">Sign out</div>
      </button>
    </div>
  );
}
