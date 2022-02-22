import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";

const MakePost = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [post, setPost] = useState("");

  if (user) {
    return (
      <div className="make-post">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="avatar"
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default MakePost;
