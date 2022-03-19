import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Popover, ArrowContainer } from "react-tiny-popover";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
// interfaces
import { Ipost, Reactions, Icomment } from "../../interfaces/post";
import { Iuser } from "../../interfaces/user";
import ReactionChooser from "../ReactionChooser/ReactionChooser";
// styles
import "./Post.scss";

interface Iprops {
  post: Ipost;
  refetch: () => void;
}

const Post: FC<Iprops> = ({ post, refetch }) => {
  // get current user from redux
  const { user } = useAppSelector((state) => state.auth);
  // destructure variables from post prop
  const { _id, author, body, image, reactions, comments } = post;
  const { firstName, lastName } = author as Iuser;

  // local state
  const [showReactionChooser, setShowReactionChooser] = useState(false);

  const handleReaction = async (reaction: Reactions) => {
    if (post && post.reactions) {
      try {
        const newReactionsArray = [...reactions, reaction];
        const response = await api.updatePost(_id, {
          reactions: newReactionsArray,
        });
        console.log(response);
        refetch();
      } catch (error: any) {
        console.log(error);
      }
    }
    setShowReactionChooser(false);
  };

  const handleComment = async () => {
    if (post && user) {
      try {
        const newComment: Icomment = {
          id: `${_id}comment${comments.length}`,
          author: user,
          date: Date.now(),
          body: "comment",
          image: "",
          reactions: [],
        };
        let newCommentsArray: Icomment[];
        if (comments) {
          newCommentsArray = [...comments, newComment];
        } else {
          newCommentsArray = [newComment];
        }
        const response = await api.updatePost(_id, {
          comments: newCommentsArray,
        });
        console.log(response);
        // refetch pulls updated data from the server
        refetch();
      } catch (error: any) {
        console.log(error);
        window.alert(error.message);
      }
    }
  };

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
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => {
          <div className="comment" key={comment.id}>
            <p>{comment.body}</p>
          </div>;
        })}
      <div className="comment-like">
        <div className="comment">
          <Popover
            isOpen={showReactionChooser}
            positions={["top", "right"]}
            padding={13}
            onClickOutside={() => setShowReactionChooser(false)}
            children={
              <div
                className="reaction"
                onMouseOver={() => setShowReactionChooser(true)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{reactions && reactions.length}</span>
              </div>
            }
            reposition={true}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowSize={20}
                arrowColor={"rgba($color: #000000, $alpha: 0.3);"}
                className="popover-arrow"
              >
                <ReactionChooser submitReaction={handleReaction} />
              </ArrowContainer>
            )}
          />
        </div>
        <button className="comment" onClick={handleComment}>
          <FontAwesomeIcon icon={faComment} />
        </button>
      </div>
    </div>
  );
};

export default Post;
