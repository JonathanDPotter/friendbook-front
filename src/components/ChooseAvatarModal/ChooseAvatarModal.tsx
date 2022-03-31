import React, { FC, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api";
import "./ChooseAvatarModal.scss";

interface Iprops {
  id: string;
  close: () => void;
}

const ChooseAvatarModal: FC<Iprops> = ({ id, close }) => {
  // get portal div
  const portal = document.getElementById("portal");

  // local state
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    files && setFile(files[0]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let imageUrl = "";

    // api saves image to cloudinary and returns URL
    if (image) {
      try {
        const response = await api.uploadImg(image);
        imageUrl = response;
      } catch (error: any) {
        window.alert(error.message);
      }
    }
    // api updates user image url on server
    api.updateUser(id, { image: imageUrl });

    close();
  };

  // if file state variable changes this sets the image variable to a base64 string version of the file
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
    }
  }, [file]);

  if (portal) {
    return createPortal(
      <div className="modal-back">
        <div className="choose-avatar">
          <form onSubmit={handleSubmit}>
            <div className="label-input">
              <label htmlFor="file">Choose Image</label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button onClick={close}>Cancel</button>
          </form>
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="user submitted"
              className="preview"
              height={100}
            />
          )}
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default ChooseAvatarModal;
