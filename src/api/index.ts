import axios from "axios";
import { InewPost } from "../interfaces/post";
import { InewUser, Icredentials } from "../interfaces/user";

const apiBaseURL = "http://localhost:1337";

// auth routes
const register = (newUser: InewUser) =>
  axios.post(`${apiBaseURL}/api/users/register`, newUser);

const login = (credentials: Icredentials) =>
  axios.post(`${apiBaseURL}/api/users/login`, credentials);

const validate = (token: string) =>
  axios.get(`${apiBaseURL}/api/users/validate`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// post routes
const createPost = async (newPost: InewPost) => {
  const response = await axios.post(`${apiBaseURL}/api/posts`, newPost);
  return response.data;
};

const updatePost = async (_id: string, update: any) => {
  console.log(update);
  const response = await axios.put(`${apiBaseURL}/api/posts/${_id}`, update);
  return response.data;
};

const deletePost = async (_id: string) => {
  const response = await axios.delete(`${apiBaseURL}/api/posts/${_id}`);
  return response.data;
};

// image routes
const uploadImg = async (image: string) => {
  const response = await axios.post(`${apiBaseURL}/api/image`, { image });
  return response.data;
};

// user routes
const getUserById = async (_id: string) => {
  const response = await axios.get(`${apiBaseURL}/api/users/${_id}`);
  return response.data;
};

const updateUser = async (id: string, update: any) => {
  const response = await axios.put(`${apiBaseURL}/api/users/${id}`, update);
  return response.data;
};

const api = {
  register,
  login,
  validate,
  createPost,
  updatePost,
  deletePost,
  uploadImg,
  getUserById,
  updateUser,
};

export default api;
