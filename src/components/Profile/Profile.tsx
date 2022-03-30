import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Iuser } from "../../interfaces/user";
// utils
import { useAppSelector } from "../../store/hooks";
import ChooseAvatarModal from "../ChooseAvatarModal/ChooseAvatarModal";
// styles
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();

  // local state chosenUser is the user who's profile we are displaying
  const [chosenUser, setChosenUser] = useState<Iuser | null>(null);
  const [id, setId] = useState("");
  const [ownProfile, setOwnProfile] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // get current user from redux state
  const { user } = useAppSelector((state) => state.auth);

  const getIdFromURL = () => {
    const idParam = new URLSearchParams(window.location.search).get("id");
    if (idParam) {
      setId(idParam);
    } else {
      window.alert("No user with that Id!");
      navigate("/");
    }
  };

  const getUserById = async () => {
    const response = await api.getUserById(id);
    setChosenUser(response.user as Iuser);
    if (response.user && user && response.user._id === user._id)
      setOwnProfile(true);
  };

  const handleAvatarClick = () => {
    if (ownProfile) {
      setShowAvatarModal(true);
    }
  };

  // runs once on render to get id
  useEffect(() => {
    getIdFromURL();
  }, []);

  // runs when state varible id changes
  useEffect(() => {
    getUserById();
  }, [id]);

  if (chosenUser) {
    return (
      <div className="profile page">
        <h2>Profile</h2>
        <div className="image-name">
          <img
            src={chosenUser.image}
            alt="user submitted"
            onClick={handleAvatarClick}
          />
          <span className="name">{`${chosenUser.firstName} ${chosenUser?.lastName}`}</span>
          <span className="pronouns">
            {chosenUser.gender === "male" && "He/Him"}
          </span>
          <span className="pronouns">
            {chosenUser.gender === "female" && "She/Her"}
          </span>
          <span className="pronouns">
            {chosenUser.gender === "custom" && "They/Them"}
          </span>
        </div>
        <div className="bio">
          <h2>Bio:</h2>
          <p></p>
        </div>
        <button onClick={() => navigate("/")}>Home</button>
        {showAvatarModal && (
          <ChooseAvatarModal
            close={() => setShowAvatarModal(false)}
            id={chosenUser._id}
          />
        )}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default Profile;
