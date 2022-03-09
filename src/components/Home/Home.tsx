import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// utils
import api from "../../api";
import { logOut } from "../../store/authSlice";
import { useGetAllPostsQuery } from "../../store/postApiSlice";
// components
import MakePost from "../MakePost/MakePost";
import Post from "../Post/Post";
// interfaces
import { Ipost } from "../../interfaces/post";
// styles
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // get user from redux store
  const { user, token } = useAppSelector((state) => state.auth);
  // get posts from redux api call
  const { data, error, refetch } = useGetAllPostsQuery("");
  if (error) console.log(error);

  const checkValidation = async () => {
    // logout if the token has expired
    if (token) {
      const valid = await api.validate(token);
      if (!valid.data.success) dispatch(logOut());
    }
  };

  useEffect(() => {
    // navigate to login if there is no user in the store
    if (!user) navigate("/login");
    if (token) checkValidation();
  }, [user, token]);

  return (
    <div className="home page">
      <MakePost refetch={() => refetch()} />
      {data ? (
        data.posts.map((post: Ipost) => (
          <Post post={post} key={post._id} refetch={() => refetch()} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
