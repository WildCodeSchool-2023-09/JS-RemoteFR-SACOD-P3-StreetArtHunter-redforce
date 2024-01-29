import React from "react";
import PropTypes from "prop-types";

function ErrorPasswordsMatch({ errorMessage, onClose }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClose();
    }
  };

  return (
    <div className="overlay">
      <div className="popup-content">
        <div className="close-container">
          <span
            className="close"
            onClick={onClose}
            onKeyPress={handleKeyPress}
            tabIndex={0}
            role="button"
          >
            &times;
          </span>
        </div>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}

ErrorPasswordsMatch.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorPasswordsMatch;
