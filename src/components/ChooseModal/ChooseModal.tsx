import React, { FC } from "react";
import { createPortal } from "react-dom";
import "./ChooseModal.scss";

interface Iprops {
  text: string;
  choose: () => void;
  cancel: () => void;
}

const ChooseModal: FC<Iprops> = ({ text, choose, cancel }) => {
  // set portal target to variable
  const portal = document.getElementById("portal");

  // set return element to variable
  const Return = () => {
    return (
      <div className="modal-back">
        <div className="modal-front">
          <p>{text}</p>
          <button onClick={choose}>OK</button>
          <button onClick={cancel}>cancel</button>
        </div>
      </div>
    );
  };
  if (portal) {
    return createPortal(<Return />, portal);
  } else {
    return <></>;
  }
};

export default ChooseModal;
