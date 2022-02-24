import React, { FC, FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";

interface Iprops {
  close: () => void;
}

const Input: FC<Iprops> = ({ close }) => {
  const initialFormState: { body: string; image: File | null } = {
    body: "",
    image: null,
  };

  const { user } = useAppSelector((state) => state.auth);

  const [formState, setFormState] = useState(initialFormState);
  const { body, image } = formState;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value, files } = event.currentTarget;
    if (id === "body") setFormState({ ...formState, body: value });
    if (id === "image" && files && files[0])
      setFormState({
        ...formState,
        image: files[0],
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <div className="input-back">
      <div className="input-card">
        <h1>Create post</h1>
        <button onClick={close}>{<FontAwesomeIcon icon={faX} />}</button>
        <img src={user ? user.image : ""} alt="user avatar" />
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="body"
            id="body"
            onChange={handleChange}
            value={body}
          />
          <label htmlFor="image">Add Photos</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="user uploaded"
              height="300"
            />
          )}
          <input type="submit" value="Post" />
        </form>
      </div>
    </div>
  );
};

export default Input;
