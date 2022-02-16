import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <header>
      <img src="./images/logo.jpg" alt="friendbook logo" />
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
