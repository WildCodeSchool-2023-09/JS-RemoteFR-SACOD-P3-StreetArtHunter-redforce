import "../css/user-profile.css";

export default function Home() {
  return (
    <div className="profile-contenair">
      <img className="user-pic" alt="user" src="https://picsum.photos/200" />
      <div className="money-count">
        Player Coin
        <img className="coin" alt="coin" src="../../public/coin.png" />
      </div>
      <button type="button" className="galery-player">
        My galery
      </button>
      <button type="button" className="player-rank-button">
        Player Ranking
      </button>
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
