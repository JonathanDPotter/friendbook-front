import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
// components
import Input from "./Input";
// styles
import "./MakePost.scss";

const MakePost = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [inputOpen, setInputOpen] = useState(false);

  if (user) {
    return (
      <div className="make-post">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="avatar"
        />
        <p onClick={() => setInputOpen(true)}>
          What's on your mind {user.firstName}?
        </p>
        {inputOpen && <Input close={() => setInputOpen(false)} />}
      </div>
    );
  } else {
    return <></>;
  }
};

export default MakePost;
