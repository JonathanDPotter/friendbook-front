import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="home page">
      <button onClick={() => navigate("/logout")}>Log Out</button>
      <div className="makePost"></div>
    </div>
  );
};

export default Home;
