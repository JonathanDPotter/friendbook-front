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
      <button onClick={logOut}>Log Out</button>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default Menu;
