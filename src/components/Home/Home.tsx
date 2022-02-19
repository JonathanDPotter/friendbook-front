import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);

  return <div>{`Hello ${user ? user : "Guest"}`}</div>;
};

export default Home;
