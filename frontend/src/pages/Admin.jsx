import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/admin.css";

function List({
  items,
  profils,
  artworks,
  handleUserButtonClick,
  handleDeleteUser,
}) {
  return (
    <>
      <div className="cardelements">
        <ul className="unordered">
          {items.map((item) => (
            <li key={item.id} className="liste">
              <img
                src={item.photo_src}
                alt={item.id}
                style={{ height: "200px", width: "200px" }}
              />
              <p>ID: {item.id}</p>
              <p>validation_status: {item.validation_status}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="cardelements">
        <ul className="unordered">
          {profils.map((profil) => (
            <li key={profil.id} className="liste" id={`profil-${profil.id}`}>
              <p>ID: {profil.id}</p>
              <p>
                pseudo: <br /> {profil.pseudo}
              </p>
              <p>
                email: <br />
                {profil.email}
              </p>
              <p>
                inscription_date: <br />{" "}
                {new Date(profil.inscription_date).toLocaleDateString()}
              </p>
              <button
                type="button"
                className="button-delete"
                onClick={() => handleDeleteUser(profil.id)}
              >
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cardelements">
        <ul className="unordered">
          {artworks.map((artwork) => (
            <li key={artwork.id} className="liste">
              <p>ID: {artwork.id}</p>
              <img
                src={artwork.photo_src}
                alt={artwork.id}
                style={{ height: "200px", width: "200px" }}
              />
              <p>
                first_post_date: <br />{" "}
                {new Date(artwork.first_post_date).toLocaleDateString()}
              </p>
              <p>
                post_date: <br />{" "}
                {new Date(artwork.post_date).toLocaleDateString()}
              </p>
              <p>User: {artwork.users_id}</p>
              <p>Title: {artwork.title}</p>
              <button
                className="button-view"
                type="button"
                onClick={() => handleUserButtonClick(artwork.users_id)}
              >
                View User Profile
              </button>
              <Link
                to={`/map?lat=${artwork.latitude}&lng=${artwork.longitude}`}
              >
                <button type="button" className="button-view">
                  View on map
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      photo_src: PropTypes.string,
      validation_status: PropTypes.number,
    })
  ),
  profils: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      id: PropTypes.number,
      pseudo: PropTypes.string,
      inscription_date: PropTypes.string,
    })
  ),
  artworks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      first_post_date: PropTypes.string,
      photo_src: PropTypes.string,
      post_date: PropTypes.string,
      users_id: PropTypes.number,
      title: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
  handleUserButtonClick: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
  profils: [],
  artworks: [],
};

export default function Admin() {
  const [showValidationPhotos, setShowValidationPhotos] = useState(false);
  const [showUserProfileList, setShowUserProfileList] = useState(false);
  const [showStreetArtList, setShowStreetArtList] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const [validationPhotos, setValidationPhotos] = useState([]);
  const [userProfileList, setUserProfileList] = useState([]);
  const [streetArtWorks, setStreetArtWorks] = useState([]);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    height: "100%",
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/validation-status`)
      .then((res) => {
        setValidationPhotos(res.data);
        setShowValidationPhotos(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user`)
      .then((res) => {
        setUserProfileList(res.data);
        setShowUserProfileList(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/artworks`)
      .then((res) => {
        setStreetArtWorks(res.data);
        setShowStreetArtList(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUserButtonClick = (userId) => {
    const userProfileElement = document.getElementById(`profil-${userId}`);
    if (userProfileElement) {
      setShowUserProfileList(true);
      userProfileElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteConfirmation = (userId) => {
    setConfirmDeleteUserId(userId);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setConfirmDeleteUserId(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`
      );
      setUserProfileList(userProfileList.filter((user) => user.id !== userId));
    } catch (err) {
      console.error(err);
    }
    setConfirmDeleteUserId(null);
    setShowDeleteConfirmation(false);
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
      {showValidationPhotos && (
        <List
          items={validationPhotos}
          handleUserButtonClick={handleUserButtonClick}
          handleDeleteUser={handleDeleteConfirmation}
        />
      )}
      <button
        className="profil-list-button"
        type="button"
        onClick={() => setShowUserProfileList(!showUserProfileList)}
      >
        <div className="button-text">User profile list</div>
      </button>
      {showUserProfileList && (
        <List
          profils={userProfileList}
          handleDeleteUser={handleDeleteConfirmation}
        />
      )}
      <button
        className="artwork-list-button"
        type="button"
        onClick={() => setShowStreetArtList(!showStreetArtList)}
      >
        <div className="button-text">List of street artworks</div>
      </button>
      {showStreetArtList && (
        <List
          artworks={streetArtWorks}
          handleUserButtonClick={handleUserButtonClick}
        />
      )}
      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-buttons">
              <button
                className="button-delete-yes"
                type="button"
                onClick={() => handleDeleteUser(confirmDeleteUserId)}
              >
                Yes
              </button>
              <button
                className="button-delete-no"
                type="button"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <Link type="button" className="button-back-admin" to="/user-profil">
        <div className="button-text">Back</div>
      </Link>
    </div>
  );
}
