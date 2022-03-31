import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
// interfaces
import { Icomment } from "../../interfaces/post";
import { Iuser } from "../../interfaces/user";
// utils
import { useGetAllUsersQuery } from "../../store/userApiSlice";
// styles
import "./Comment.scss";

interface Iprops {
  comment: Icomment;
}

const Comment: FC<Iprops> = ({ comment }) => {
  const navigate = useNavigate();

  const { author, body, image } = comment;

  // local state
  const [fullAuthor, setFullAuthor] = useState<Iuser | null>(null);

  // get users from redux api call
  const { data, error } = useGetAllUsersQuery("");
  if (error) console.log(error);

  // get full user record for comment author
  const getFullUser = async () => {
    if (data) {
      const response = await data.users.filter(
        (userRec: Iuser) => userRec._id === author
      );
      setFullAuthor(response[0]);
    }
  };

  !fullAuthor && getFullUser();

  const openProfile = () => {
    fullAuthor && navigate(`/profile?id=${fullAuthor._id}`);
  };

  if (fullAuthor) {
    const fullName = `${fullAuthor.firstName} ${fullAuthor.lastName}`;
    return (
      <div className="comment">
        <div className="avatar-name">
          <img
            src={fullAuthor.image}
            alt={fullName}
            className="avatar"
            onClick={openProfile}
          />
          <p>{fullName}</p>
        </div>
        <div className="body">
          <p>{body}</p>
        </div>
        {image && <img src={image} height="300" alt="user submitted" />}
        <div className="reactions"></div>
        <button className={"react"}></button>
      </div>
    );
  } else {
    return <>Comment Not Available</>;
  }
};

export default Comment;
