import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../css/user-profile.css";

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

export default function Home() {
  const [showUserArt, setShowUserArt] = useState(false);
  const [showPlayerRank, setShowPlayerRank] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

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
    backgroundattachment: "fixed",
  };

  return (
    <div className="profile-contenair" style={backgroundStyle}>
      <div className="pic-coincontainer">
        <img className="user-pic" alt="user" src="https://picsum.photos/200" />
        <div className="player-name">Player name</div>
        <div className="money-count">1000</div>
        <img className="coin" alt="coin" src="../../public/pixel-coin.png" />
      </div>
      <button
        type="button"
        className="galery-player"
        onClick={() => setShowUserArt(!showUserArt)}
      >
        My galery
      </button>
      {showUserArt && <List items={userArtWork} />}
      <button
        type="button"
        className="player-rank-button"
        onClick={() => setShowPlayerRank(!showPlayerRank)}
      >
        Player Ranking
      </button>
      {showPlayerRank && <List items={playerRankList} />}
      <button type="button" className="edit-profil-button">
        Edit profile
      </button>
      <button type="button" className="signout-button">
        Sign out
      </button>
      <button type="button" className="deleteprofile-button">
        Delete profile
      </button>
    </div>
  );
}
