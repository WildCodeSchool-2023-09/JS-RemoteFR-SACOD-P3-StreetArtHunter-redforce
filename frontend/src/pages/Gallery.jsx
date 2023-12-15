import React from "react";

function Gallery() {
  return (
    <div className="gallery">
      <img
        src="https://i.pinimg.com/originals/f2/38/54/f238549aa412e46c7c7e7ef5de103e70.jpg"
        alt="street art"
      />
      <button type="button" className="back-button">
        Retour
      </button>
    </div>
  );
}

export default Gallery;
