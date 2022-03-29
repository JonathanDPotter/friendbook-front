import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { useAppSelector } from "../../store/hooks";

interface Iprops {
  open: boolean;
  close: () => void;
}

const Menu: FC<Iprops> = ({ open, close }) => {
  // navigate hook from react-router
  const navigate = useNavigate();

  // get current user from redux store
  const { user } = useAppSelector((state) => state.auth);

  const openProfile = () => {
    close();
    navigate(`/profile?id=${user?._id}`);
  };

  const logOut = () => {
    close();
    navigate("/logout");
  };

  return (
    <div className={`menu ${open ? "open" : "closed"}`}>
      <button onClick={openProfile}>Profile</button>
      <button onClick={logOut}>Log Out</button>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default Menu;
