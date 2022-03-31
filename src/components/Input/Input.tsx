import React, { FC, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
// utils
import { useAppSelector } from "../../store/hooks";
import { useGetAllUsersQuery } from "../../store/userApiSlice";
import api from "../../api";
// interfaces
import { Ipost } from "../../interfaces/post";
import { Iuser } from "../../interfaces/user";
// styles
import "./Input.scss";

interface Iprops {
  post?: Ipost;
  close: () => void;
  refetch: () => void;
}

const Input: FC<Iprops> = ({ close, refetch, post }) => {
  // store target for portal in variable portal
  const portal = document.getElementById("portal");

  // get current user from redux store
  const { user } = useAppSelector((state) => state.auth);

  // initialize local form state and destructure it for ease of use
  const initialFormState: { body: string; file: File | null } = {
    body: "",
    file: null,
  };

  const [formState, setFormState] = useState(initialFormState);
  const { body, file } = formState;

  const reactions = {
    angry: [],
    care: [],
    love: [],
    haha: [],
    wow: [],
    sad: [],
    like: [],
  };

  // local state for image file converted to base64 string
  const [image, setImage] = useState("");

  // local state for user
  const [fullUser, setFullUser] = useState<Iuser | null>(null);

  // get users from redux api call
  const { data, error } = useGetAllUsersQuery("");
  if (error) console.log(error);

  // get full user record for user
  const getFullUser = async () => {
    if (data && user) {
      const response = await data.users.filter(
        (userRec: Iuser) => userRec._id === user._id
      );
      setFullUser(response[0]);
    }
  };

  !fullUser && getFullUser();

  // change and submit handlers for form
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value, files } = event.currentTarget;
    if (id === "body") setFormState({ ...formState, body: value });
    if (id === "file" && files && files[0])
      setFormState({
        ...formState,
        file: files[0],
      });
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

    // if new post, api saves post in database
    try {
      if (fullUser && !post) {
        const response = await api.createPost({
          author: fullUser._id,
          body,
          image: imageUrl,
          date: Date.now(),
          comments: [],
          reactions,
        });
        console.log(response);
      }

      // if new comment api saves comment in database
      if (fullUser && post) {
        const response = await api.updatePost(post._id, {
          comments: [
            ...post.comments,
            {
              author: fullUser._id,
              body,
              image: imageUrl,
              date: Date.now(),
              reactions,
            },
          ],
        });
      }
    } catch (error: any) {
      window.alert(error.message);
    }
    // refresh page to close modal and display up-to-date posts
    close();
    refetch();
  };

  // watches the file variable for changes and saves a base64 string version of the image file in the local state variable image
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
      <div className="input-back">
        <div className="input-card">
          <h1>Create post</h1>
          <button onClick={close}>
            {<FontAwesomeIcon icon={faX} />}
          </button>
          <img src={fullUser ? fullUser.image : ""} alt="user avatar" />
          <span>
            {fullUser?.firstName} {fullUser?.lastName}
          </span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="body"
              id="body"
              onChange={handleChange}
              value={body}
            />
            <label htmlFor="file">Add Photos</label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpg, .png, .jpeg, .gif"
              onChange={handleChange}
            />
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="user uploaded"
                height="300"
              />
            )}
            <input type="submit" value="Post" />
          </form>
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default Input;
