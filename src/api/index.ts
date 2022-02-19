import axios from "axios";
import { InewUser, Icredentials } from "../interfaces/user";

const apiBaseURL = "http://localhost:1337";

const register = (newUser: InewUser) =>
  axios.post(apiBaseURL + "/api/users/register", newUser);

const login = (credentials: Icredentials) =>
  axios.post(apiBaseURL + "/api/users/login", credentials);

const api = { register, login };

export default api;
