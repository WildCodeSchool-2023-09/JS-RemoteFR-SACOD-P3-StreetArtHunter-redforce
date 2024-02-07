import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/user-profile.css";
import PropTypes from "prop-types";
import { useUser } from "../context/UserContext";

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
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const userArtWork = ["Œuvre 1", "Œuvre 2", "Œuvre 3"];
  const playerRankList = ["Player1", "Player2", "Player2"];

  const getRandomImageUrl = () => {
    const randomImageIndex = Math.floor(Math.random() * 10) + 1;
    return `/background${randomImageIndex}.png`;
  };

  useEffect(() => {
    setBackgroundImageUrl(getRandomImageUrl());
    console.info("User data:", user);
    if (user && user.is_admin === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  console.info("isAdmin:", isAdmin);

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
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const { setUser } = useUser();

  const handleConfirmDeleteProfile = () => {
    if (user && user.id) {
      if (passwordConfirmation !== user.hashedPassword) {
        toast.error("Password confirmation does not match");
        return;
      }

      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Profile deleted successfully!", {
            style: {
              background: "red",
              color: "white",
              fontFamily: "RetroGaming, sans-serif",
              textAlign: "center",
            },
          });

          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`)
            .then(() => {
              setUser(null);
              navigate("/");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const openConfirmDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDelete = () => {
    setConfirmDeleteOpen(false);
  };

  const handleDeleteProfile = () => {
    openConfirmDelete();
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
          <div className="button-text">My gallery</div>
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
        <button type="button" className="edit-profile-button">
          <div className="button-text">Edit profile</div>
        </button>
        <button
          type="button"
          className="signout-button"
          onClick={handleSignOut}
        >
          <div className="button-text">Sign out</div>
        </button>
        <div className="delete-profile-container">
          <button
            type="button"
            className="delete-profile-button"
            onClick={handleDeleteProfile}
          >
            <div className="button-text">Delete Profile</div>
          </button>
        </div>
        {isAdmin && (
          <Link to="/admin" type="button" className="admin-button">
            <div className="button-text">God mode</div>
          </Link>
        )}
        <Link to="/map" type="button" className="back-button">
          <div className="button-text">Back</div>
        </Link>
      </div>
      {confirmDeleteOpen && (
        <div className="password-confirmation-popup">
          <input
            type="password"
            placeholder="Enter your password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              handleConfirmDeleteProfile();
              closeConfirmDelete();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => {
              closeConfirmDelete();
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
