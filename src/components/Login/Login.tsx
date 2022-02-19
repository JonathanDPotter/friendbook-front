import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
// components
import Register from "../Register/Register";
// utils
import api from "../../api";
import { useAppDispatch } from "../../store/hooks";
// styles
import "./Login.scss";
import { setToken, setUser } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const initialFormState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const { email, password } = formState;

  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await api.login(formState);

    if (!response.data.success) {
      window.alert(response.data.message);
    } else {
      await dispatch(setToken(response.data.token));
      await dispatch(setUser(response.data.userName));
      navigate("/");
    }
  };

  const handleChange = ({
    currentTarget: { id, value },
  }: FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [id]: value });
  };

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      const { email, googleId, givenName, familyName, imageUrl } =
        response.profileObj;

      const newUser = {
        firstName: givenName,
        lastName: familyName,
        email,
        image: imageUrl,
        password: googleId,
        gender: "custom",
      };

      await api.register(newUser);

      const loginResponse = await api.login({ email, password: googleId });

      if (!loginResponse.data.success) {
        window.alert(loginResponse.data.message);
      } else {
        await dispatch(setToken(loginResponse.data.token));
        await dispatch(setUser(loginResponse.data.userName));
        navigate("/");
      }
    }
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="login page">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="label-input">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={email.toLowerCase()}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <input type="submit" value="Log In" />
        </form>
        <div className="or">or</div>
        {clientId && (
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}
        <hr />
        <button onClick={() => setShowRegister(true)}>
          Create new account
        </button>
        {showRegister && <Register close={closeRegister} />}
      </div>
    </div>
  );
};

export default Login;
