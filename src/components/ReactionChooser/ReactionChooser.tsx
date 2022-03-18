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
  close: () => void;
  submitReaction: (reaction: Reactions) => void;
}

const ReactionChooser: FC<Iprops> = ({ submitReaction }) => {
  //  get portal element
  const portal = document.getElementById("portal");

  const ReactionModal = () => {
    return (
      <div className="modal-back">
        <div className="chooser">
          <button
            className="angry"
            onClick={() => submitReaction(Reactions.ANGRY)}
          >
            <FontAwesomeIcon icon={faAngry} />
          </button>
          <button
            className="care"
            onClick={() => submitReaction(Reactions.CARE)}
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} />
          </button>
          <button
            className="love"
            onClick={() => submitReaction(Reactions.LOVE)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button
            className="haha"
            onClick={() => submitReaction(Reactions.HAHA)}
          >
            <FontAwesomeIcon icon={faLaugh} />
          </button>
          <button className="sad" onClick={() => submitReaction(Reactions.SAD)}>
            <FontAwesomeIcon icon={faSadTear} />
          </button>
          <button className="wow" onClick={() => submitReaction(Reactions.WOW)}>
            <FontAwesomeIcon icon={faSurprise} />
          </button>
          <button
            className="like"
            onClick={() => submitReaction(Reactions.LIKE)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
      </div>
    );
  };
  return portal ? ReactDOM.createPortal(<ReactionModal />, portal) : <></>;
};

export default ReactionChooser;
