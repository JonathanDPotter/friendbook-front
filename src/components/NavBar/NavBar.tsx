import React, { useState } from "react";
import logo from "../../images/favicon-32x32.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import {
  faHouse,
  faUserGroup,
  faUsers,
  faCaretDown,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
// styles
import "./NavBar.scss";
import Menu from "../Menu/Menu";

const NavBar = () => {
  const location = useLocation();
  const navRoutes = ["/", "/friends", "/groups"];
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (navRoutes.includes(location.pathname)) {
    return (
      <header>
        <img src={logo} alt="logo" className="logo" />
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
        <FontAwesomeIcon icon={faBell} className="icon bell" />
        <FontAwesomeIcon
          icon={faCaretDown}
          className="icon caret"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <Menu open={menuOpen} close={() => setMenuOpen(false)}/>
      </header>
    );
  } else {
    return <></>;
  }
};

export default NavBar;
