import React, { FC, useState } from "react";
// components
import Input from "../Input/Input";
// utils
import { useAppSelector } from "../../store/hooks";
import { useGetAllUsersQuery } from "../../store/userApiSlice";
// interfaces
import { Iuser } from "../../interfaces/user";
// styles
import "./MakePost.scss";

interface Iprops {
  refetch: () => void;
}

const MakePost: FC<Iprops> = ({ refetch }) => {
  const { user } = useAppSelector((state) => state.auth);

  // local state
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

  const [inputOpen, setInputOpen] = useState(false);

  if (fullUser) {
    return (
      <div className="make-post">
        <img
          src={fullUser.image}
          alt={`${fullUser.firstName} ${fullUser.lastName}`}
          className="avatar"
        />
        <p onClick={() => setInputOpen(true)}>
          What's on your mind, {fullUser.firstName}?
        </p>
        {inputOpen && (
          <Input close={() => setInputOpen(false)} refetch={() => refetch()} />
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default MakePost;
