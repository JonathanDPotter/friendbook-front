import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) navigate("/login")
  }, [user])
  

  return <div>{`Hello ${user ? user : "Guest"}`}
    <button onClick={() => navigate("/logout")}>Log Out</button>
  </div>;
};

export default Home;
