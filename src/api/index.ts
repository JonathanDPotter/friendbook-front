import axios from "axios";
import { InewUser } from "../interfaces/user";

const apiBaseURL = "http://localhost:1337";

const register = (newUser: InewUser) =>
  axios.post(apiBaseURL + "/api/users/register", newUser);

export default { register };
