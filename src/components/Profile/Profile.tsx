import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Iuser } from "../../interfaces/user";
// utils
import { useAppSelector } from "../../store/hooks";
import { useGetAllUsersQuery } from "../../store/userApiSlice";
// styles
import "./Profile.scss";

const Profile = () => {
  // get navigation from react-router
  const navigate = useNavigate();

  // get current user from redux store
  const { user } = useAppSelector((store) => store.auth);

  // get all users from redux api call
  const { data, error } = useGetAllUsersQuery("");
  if (error) console.log("query error", error);

  // get chosen user's profile from id provided in url
  const [searchParams] = useSearchParams();

  // local state
  const [ownProfile, setOwnProfile] = useState(false);
  const [chosenUser, setChosenUser] = useState(user);

  // useEffect will run once when the page is loaded
  useEffect(() => {
    if (user && searchParams && data) {
      user._id === searchParams.get("id") && setOwnProfile(true);
      setChosenUser(
        data.user.filter(
          (record: Iuser) => record._id === searchParams.get("id")
        )
      );
    }
  }, []);

  return (
    <div className="profile page">
      <h2>Profile</h2>
      <div className="image-name">
        <img src={chosenUser ? chosenUser.image : ""} alt="user submitted" />
        <span className="name">{`${chosenUser?.firstName} ${chosenUser?.lastName}`}</span>
        <span className="pronouns">
          {chosenUser?.gender === "male" && "He/Him"}
        </span>
        <span className="pronouns">
          {chosenUser?.gender === "female" && "She/Her"}
        </span>
        <span className="pronouns">
          {chosenUser?.gender === "custom" && "They/Them"}
        </span>
      </div>
      <div className="bio">
        <h2>Bio:</h2>
        <p></p>
      </div>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default Profile;
function useNavaigate() {
  throw new Error("Function not implemented.");
}
