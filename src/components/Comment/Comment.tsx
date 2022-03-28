import React, { FC } from "react";
import { Icomment } from "../../interfaces/post";
// styles
import "./Comment.scss";

interface Iprops {
  comment: Icomment;
}

const Comment: FC<Iprops> = ({ comment }) => {
  const { author, body, image } = comment;
  const fullName = `${author.firstName} ${author.lastName}`;
  return (
    <div className="comment">
      <div className="avatar-name">
        <img src={author.image} alt={fullName} className="avatar" />
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
};

export default Comment;
