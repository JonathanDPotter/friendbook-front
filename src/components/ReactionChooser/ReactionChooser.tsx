import React, { FC, FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import { Reactions } from "../../interfaces/post";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icons
import {
  faAngry,
  faHandHoldingHeart,
  faHeart,
  faLaugh,
  faSadTear,
  faSurprise,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
// styles
import "./ReactionChooser.scss";

interface Iprops {
  submitReaction: (reaction: Reactions) => void;
}

const ReactionChooser: FC<Iprops> = ({ submitReaction }) => {
  return (
    <div className="chooser">
      <button className="angry" onClick={() => submitReaction(Reactions.ANGRY)}>
        <FontAwesomeIcon icon={faAngry} />
        <span className="tooltip-text">angry</span>
      </button>
      <button className="care" onClick={() => submitReaction(Reactions.CARE)}>
        <FontAwesomeIcon icon={faHandHoldingHeart} />
        <span className="tooltip-text">care</span>
      </button>
      <button className="love" onClick={() => submitReaction(Reactions.LOVE)}>
        <FontAwesomeIcon icon={faHeart} />
        <span className="tooltip-text">love</span>
      </button>
      <button className="haha" onClick={() => submitReaction(Reactions.HAHA)}>
        <FontAwesomeIcon icon={faLaugh} />
        <span className="tooltip-text">haha</span>
      </button>
      <button className="sad" onClick={() => submitReaction(Reactions.SAD)}>
        <FontAwesomeIcon icon={faSadTear} />
        <span className="tooltip-text">sad</span>
      </button>
      <button className="wow" onClick={() => submitReaction(Reactions.WOW)}>
        <FontAwesomeIcon icon={faSurprise} />
        <span className="tooltip-text">wow</span>
      </button>
      <button className="like" onClick={() => submitReaction(Reactions.LIKE)}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <span className="tooltip-text">like</span>
      </button>
    </div>
  );
};

export default ReactionChooser;
