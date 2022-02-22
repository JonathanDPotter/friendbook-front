import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
// components
import Register from "../Register/Register";
// utils
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// styles
import "./Login.scss";
import { setToken, setUser } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const facebookClientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
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
      await dispatch(setUser(response.data.user));
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

      console.log(imageUrl);

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
        await dispatch(setUser(loginResponse.data.user));
        navigate("/");
      }
    }
  };

  const responseFacebook = async (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    if ("status" in response) {
      window.alert(response.status);
    } else if ("email" in response && response.email && response.id) {
      const { email, id, name, picture } = response;
      const names: string[] = [];
      if (name) names.push(...name.split(" "));

      const newUser = {
        firstName: names[0],
        lastName: names[names.length - 1],
        email,
        image: picture?.data.url || "",
        password: id,
        gender: "custom",
      };

      await api.register(newUser);

      const loginResponse = await api.login({ email, password: id });

      if (!loginResponse.data.success) {
        window.alert(loginResponse.data.message);
      } else {
        await dispatch(setToken(loginResponse.data.token));
        await dispatch(setUser(loginResponse.data.user));
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
              autoComplete="email"
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
              autoComplete="password"
            />
          </div>
          <input type="submit" value="Log In" />
        </form>
        <div className="or">or</div>
        {googleClientId && (
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}
        {facebookClientId && (
          <FacebookLogin
            appId={facebookClientId}
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile, email"
            callback={responseFacebook}
            icon="fa-facebook"
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
