import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// utils
import api from "../../api";
import { logOut } from "../../store/authSlice";
// components
import MakePost from "../MakePost/MakePost";
// styles
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);

  const checkValidation = async () => {
    if (token) {
      const valid = await api.validate(token);
      if (!valid.data.success) dispatch(logOut());
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    if (token) checkValidation();
  }, [user, token]);

  return (
    <div className="home page">
      <MakePost />
      <div className="makePost"></div>
    </div>
  );
};

export default Home;
