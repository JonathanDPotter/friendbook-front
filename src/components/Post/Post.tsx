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
  faShare,
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
      <div className="comments">
        {comments.map((comment, i) => (
          <p key={`comment${i}`}>{comment.body}</p>
        ))}
      </div>

      {/* displays the reaction icon and adds a tooltip with the names of all the users that reacted that way if there is at least one reaction of that type */}
      <div className="reactions">
        {reactions.angry.length > 0 && (
          <button className="angry">
            <FontAwesomeIcon icon={faAngry} />
            <div className="tooltip-text">
              {reactions.angry.map((name, i) => (
                <p key={`angry${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        {reactions.care.length > 0 && (
          <button className="care">
            <FontAwesomeIcon icon={faHandHoldingHeart} />
            <div className="tooltip-text">
              {reactions.care.map((name, i) => (
                <p key={`care${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        {reactions.love.length > 0 && (
          <button className="love">
            <FontAwesomeIcon icon={faHeart} />
            <div className="tooltip-text">
              {reactions.love.map((name, i) => (
                <p key={`love${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        {reactions.haha.length > 0 && (
          <button className="haha">
            <FontAwesomeIcon icon={faLaugh} />
            <div className="tooltip-text">
              {reactions.haha.map((name, i) => (
                <p key={`haha${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        {reactions.wow.length > 0 && (
          <button className="wow">
            <FontAwesomeIcon icon={faSurprise} />
            <div className="tooltip-text">
              {reactions.wow.map((name, i) => (
                <p key={`wow${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        {reactions.sad.length > 0 && (
          <button className="sad">
            <FontAwesomeIcon icon={faSadTear} />
            <div className="tooltip-text">
              {reactions.sad.map((name, i) => (
                <p key={`sad${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        {reactions.like.length > 0 && (
          <button className="like">
            <FontAwesomeIcon icon={faThumbsUp} />
            <div className="tooltip-text">
              {reactions.like.map((name, i) => (
                <p key={`like${i}`}>{name}</p>
              ))}
            </div>
          </button>
        )}
        <span className="total-reactions">
          {/* displays total number of reactions */}
          {reactions &&
            Object.values(reactions).flat().length > 0 &&
            Object.values(reactions).flat().length}
        </span>
      </div>
      <div className="comment-react">
        <div className="reaction-button">
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
        <button className="comment-button" onClick={handleComment}>
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className="share">
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
  );
};

export default Post;
