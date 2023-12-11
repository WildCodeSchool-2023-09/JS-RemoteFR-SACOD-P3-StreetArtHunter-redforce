import "../App.css";
import React from "react";

function Home() {
  return (
    <div>
      <form className="flex flex-col my-auto">
        <h1>Hunt for street art near you!</h1>
        <h2>START GAME</h2>
        <div>
          <label htmlFor="Username" className="text-label">
            Username/e-mail
          </label>
          <input type="email" id="Username" required />
        </div>
        <div>
          <label htmlFor="Password" className="password">
            Password
          </label>
          <input type="password" id="password" required />
        </div>
        <button type="button">Connexion</button>
      </form>
    </div>
  );
}

export default Home;
