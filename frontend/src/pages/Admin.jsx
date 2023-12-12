import React, { useState } from "react";
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

  const validationPhotos = ["Photo 1", "Photo 2", "Photo 3"];
  const userProfiles = ["Profil 1", "Profil 2", "Profil 3"];
  const streetArtWorks = ["Œuvre 1", "Œuvre 2", "Œuvre 3"];

  return (
    <div className="container-admin">
      <button
        className="validation"
        type="button"
        onClick={() => setShowValidationPhotos(!showValidationPhotos)}
      >
        Photos awaiting validation
      </button>
      {showValidationPhotos && <List items={validationPhotos} />}

      <button
        type="button"
        onClick={() => setShowUserProfileList(!showUserProfileList)}
      >
        User profile list
      </button>
      {showUserProfileList && <List items={userProfiles} />}

      <button
        type="button"
        onClick={() => setShowStreetArtList(!showStreetArtList)}
      >
        list of street art works
      </button>
      {showStreetArtList && <List items={streetArtWorks} />}

      <button type="button" className="signout-button">
        Sign out
      </button>
    </div>
  );
}
