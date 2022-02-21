import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Iprops {
  open: boolean;
  close: () => void;
}

const Menu: FC<Iprops> = ({ open, close }) => {
  const navigate = useNavigate();

  const logOut = () => {
    close();
    navigate("/logout");
  };
  
  return (
    <div className={`menu ${open ? "open" : "closed"}`}>
      <h2 onClick={logOut}>Log Out</h2>
    </div>
  );
};

export default Menu;
