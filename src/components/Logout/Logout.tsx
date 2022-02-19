import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {logOut} from "../../store/authSlice"

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logUserOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="logout page">
      <button onClick={logUserOut}>Log Out</button>
    </div>
  );
};

export default Logout;
