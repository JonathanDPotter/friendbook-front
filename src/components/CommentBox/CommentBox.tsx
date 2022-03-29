import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// components
import Comment from "../Comment/Comment";
// Interfaces
import { Icomment } from "../../interfaces/post";
// styles
import "./CommentBox.scss";

interface Iprops {
  comments: Icomment[];
  id: string;
}

const CommentBox: FC<Iprops> = ({ id, comments }) => {
  // local state
  const [showAllComments, setShowAllComments] = useState(false);

  return (
    <div className="comment-box">
      {comments.length > 1 && (
        <button onClick={() => setShowAllComments(!showAllComments)}>
          <span>{showAllComments ? "See less" : "See all comments"}</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      )}
      {comments.length > 0 && !showAllComments ? (
        <Comment comment={comments[comments.length - 1]} />
      ) : (
        comments.map((comment, i) => (
          <Comment key={`${id}comment${i}`} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentBox;
