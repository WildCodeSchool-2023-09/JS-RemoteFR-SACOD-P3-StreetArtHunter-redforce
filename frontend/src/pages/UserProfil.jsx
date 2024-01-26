import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import ConfirmationDialog from "../components/ConfirmationDialog";

import "../css/user-profile.css";

function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Home() {
  const [showUserArt, setShowUserArt] = useState(false);
  const [showPlayerRank, setShowPlayerRank] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const userArtWork = ["Œuvre 1", "Œuvre 2", "Œuvre 3"];
  const playerRankList = ["Player1", "Player2", "Player2"];

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
  };

  const handleSignOut = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`)
      .then(() => {
        navigate("/Home");
      })
      .catch((err) => console.error(err));
  };

  const { setUser } = useUser();

  const handleDeleteAccount = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDeleteAccount = () => {
    if (user && user.id) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`, {
          withCredentials: true,
        })
        .then(() => {
          setUser(null);
          navigate("/home");
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression du compte :", err);
        });
    }
  };

  const handleCancelDeleteAccount = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="profile-contenair" style={backgroundStyle}>
      <div className="pic-coincontainer">
        <img className="user-pic" alt="user" src="https://picsum.photos/200" />
        <div className="player-name">{user?.pseudo || "Player name"}</div>
        <div className="money-count">1000</div>
        <img className="coin" alt="coin" src="../../public/pixel-coin.png" />
      </div>
      <div className="button-container">
        <Link
          to="/galerie"
          type="button"
          className="galery-player"
          onClick={() => setShowUserArt(!showUserArt)}
        >
          <div className="button-text">My galery</div>
        </Link>
        {showUserArt && <List items={userArtWork} />}
        <button
          type="button"
          className="player-rank-button"
          onClick={() => setShowPlayerRank(!showPlayerRank)}
        >
          <div className="button-text">Player Ranking</div>
        </button>
        {showPlayerRank && <List items={playerRankList} />}
        <button type="button" className="edit-profil-button">
          <div className="button-text">Edit profile</div>
        </button>
        <button
          type="button"
          className="signout-button"
          onClick={handleSignOut}
        >
          <div className="button-text">Sign out</div>
        </button>
        <button
          type="button"
          className="deleteprofile-button"
          onClick={handleDeleteAccount}
        >
          <div className="button-text">Delete profile</div>
        </button>
        <Link to="/map" type="button" className="back-button">
          <div className="button-text">Back</div>
        </Link>
      </div>
      {showConfirmDialog && (
        <div className="confirmation-dialog">
          <ConfirmationDialog
            open={showConfirmDialog}
            onConfirm={handleConfirmDeleteAccount}
            onCancel={handleCancelDeleteAccount}
          />
        </div>
      )}
    </div>
  );
}
