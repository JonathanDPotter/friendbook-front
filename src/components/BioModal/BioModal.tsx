import React, { FC, FormEvent, useState } from "react";
import api from "../../api";
import CloseX from "../CloseX/CloseX";

interface Iprops {
  id: string;
  currentBio: string;
  close: () => void;
}

const BioModal: FC<Iprops> = ({ id, currentBio, close }) => {
  // local state
  const [bio, setBio] = useState(currentBio);

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setBio(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    api.updateUser(id, { bio });
    close();
  };

  return (
    <div className="modal-back">
      <div className="bio-modal-front">
        <h2>Update Bio</h2>
        <CloseX close={close} />
        <form onSubmit={handleSubmit}>
          <div className="label-input">
            <label htmlFor="bio">Edit Bio: </label>
            <textarea name="bio" id="bio" onChange={handleChange}>
              {bio}
            </textarea>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default BioModal;
