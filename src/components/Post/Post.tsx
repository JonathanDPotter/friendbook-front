import React, { FC } from "react";
import { Ipost } from "../../interfaces/post";
import { Iuser } from "../../interfaces/user";

interface Iprops {
  post: Ipost;
}

const Post: FC<Iprops> = ({ post }) => {
  const { author, body, image, reaction, comments } = post;
  const { _id, firstName, lastName, gender } = author as Iuser;
  return (
    <div className="post">
      <img
        src={author.image}
        alt={`avatar for ${firstName} ${lastName}`}
        className="avatar"
      />
      <p className="post-author">{`${firstName} ${lastName}`}</p>
      <p className="post-body">{body}</p>
      {image && <img src={image} alt="user submitted" className="post-img" />}
    </div>
  );
};

export default Post;
