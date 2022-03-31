import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface Iprops {
  close: () => void;
}

const CloseX: FC<Iprops> = ({ close }) => {
  return <button onClick={close}>{<FontAwesomeIcon icon={faX} />}</button>;
};

export default CloseX;
