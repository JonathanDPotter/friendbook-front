import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import "./NavBar.scss";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header>
      <img src="./images/logo.jpg" alt="friendbook logo" />
      <nav>
        <NavLink to="/">Home</NavLink>
        {user ? (
          <NavLink to="/logout">Log Out</NavLink>
        ) : (
          <NavLink to="/login">Log In</NavLink>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
