import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faThumbsUp,
  faAngry,
  faHandHoldingHeart,
  faHeart,
  faLaugh,
  faSadTear,
  faSurprise,
} from "@fortawesome/free-solid-svg-icons";
import { Popover } from "react-tiny-popover";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
// interfaces
import { Ipost, Reactions, Icomment, Ireactions } from "../../interfaces/post";
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
  const [userReacted, setUserReacted] = useState(false);

  // timeout variable
  let timer: ReturnType<typeof setTimeout>;

  const handleReaction = async (reaction: Reactions) => {
    if (user && post && post.reactions) {
      const userName = `${user.firstName} ${user.lastName}`;
      if (!userReacted) {
        try {
          // spreads keys of reactions object into newReactionsObject then replaces the array at the key that has the same name as the reaction chosen with a new array that consists of the old array (reactions[reaction]) plus the name of the user that posted the reaction
          const newReactionsObject = {
            ...reactions,
            [reaction]: [...reactions[reaction], userName],
          };
          const response = await api.updatePost(_id, {
            reactions: newReactionsObject,
          });
          console.log(response);
          refetch();
        } catch (error: any) {
          console.log(error);
        }
      } else {
        console.log(reactions);
        try {
          let arrayKey = "";
          Object.keys(reactions).forEach((key) => {
            if (reactions[key as keyof Ireactions].includes(userName)) {
              arrayKey = key;
            }
          });

          const newReactionsObject = {
            ...reactions,
            [arrayKey]: [...reactions[arrayKey as keyof Ireactions]].filter(
              (value) => value !== `${user.firstName} ${user.lastName}`
            ),
          };

          const response = await api.updatePost(_id, {
            reactions: newReactionsObject,
          });
          console.log(response);
          refetch();
        } catch (error: any) {
          console.log(error);
        }
      }
      setShowReactionChooser(false);
    }
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
          reactions: {
            angry: [],
            care: [],
            love: [],
            haha: [],
            wow: [],
            sad: [],
            like: [],
          },
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

  const handleShowReactionChooser = () => {
    timer = setTimeout(() => setShowReactionChooser(true), 1000);
  };

  const handleThumbClick = () => {
    handleReaction(Reactions.LIKE);
    clearTimeout(timer);
  };

  useEffect(() => {
    if (user && reactions) {
      if (
        Object.values(reactions)
          .flat()
          .includes(`${user.firstName} ${user.lastName}`)
      ) {
        setUserReacted(true);
      } else setUserReacted(false);
    }
  }, [reactions]);

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
        <div className="total-reactions">
          {reactions.angry.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faAngry} />
              <div className="tooltip-text">
                {reactions.angry.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          {reactions.care.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              <div className="tooltip-text">
                {reactions.care.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          {reactions.love.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faHeart} />
              <div className="tooltip-text">
                {reactions.love.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          {reactions.haha.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faLaugh} />
              <div className="tooltip-text">
                {reactions.haha.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          {reactions.wow.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faSurprise} />
              <div className="tooltip-text">
                {reactions.wow.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          {reactions.sad.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faSadTear} />
              <div className="tooltip-text">
                {reactions.sad.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          {reactions.like.length > 0 && (
            <label>
              <FontAwesomeIcon icon={faThumbsUp} />
              <div className="tooltip-text">
                {reactions.like.map((name) => (
                  <p>{name}</p>
                ))}
              </div>
            </label>
          )}
          <span>
            {/* gets total number of reactions */}
            {reactions &&
              Object.values(reactions).flat().length > 0 &&
              Object.values(reactions).flat().length}
          </span>
        </div>
        <div className="comment">
          <Popover
            isOpen={showReactionChooser}
            positions={["top", "right"]}
            padding={13}
            onClickOutside={() => setShowReactionChooser(false)}
            children={
              <div
                className="reaction"
                onMouseEnter={handleShowReactionChooser}
                onMouseLeave={() => clearTimeout(timer)}
                onClick={handleThumbClick}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={userReacted ? "reacted" : ""}
                />
              </div>
            }
            reposition={true}
            content={() =>
              !userReacted ? (
                <ReactionChooser submitReaction={handleReaction} />
              ) : (
                <></>
              )
            }
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
