import React from "react";
import logo from "../../images/favicon-32x32.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import {
  faHouse,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
// styles
import "./NavBar.scss";

const NavBar = () => {
  const location = useLocation();
  const navRoutes = ["/", "/friends", "/groups"];

  if (navRoutes.includes(location.pathname)) {
    return (
      <header>
        <img src={logo} alt="logo" className="icon" />
        <nav>
          <NavLink
            to="/"
            children={<FontAwesomeIcon icon={faHouse} className="icon" />}
          />
          <NavLink
            to="/friends"
            children={<FontAwesomeIcon icon={faUserGroup} className="icon" />}
          />
          <NavLink
            to="/groups"
            children={<FontAwesomeIcon icon={faUsers} className="icon" />}
          />
        </nav>
      </header>
    );
  } else {
    return <></>;
  }
};

export default NavBar;
