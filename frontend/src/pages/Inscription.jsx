import "./Style.css";
import React from "react";

function Inscription() {
  return (
    <div>
      <div className="form">
        <form action="" method="post">
          <h1>Hunt for street art near you!</h1>
          <div>
            <label htmlFor="Username" className="text-label">
              Username
            </label>
            <input type="Username" id="Username" required />
          </div>
          <div>
            <label htmlFor="email" className="text-label">
              E-mail
            </label>
            <input type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="Password" className="password">
              Password
            </label>
            <input type="password" id="password" required />
          </div>
          <button type="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
