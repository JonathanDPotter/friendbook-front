import React, { FormEvent, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Register from "../Register/Register";
// styles
import "./Login.scss";

const Login = () => {
  const initialFormState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const { email, password } = formState;

  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.table(formState);
  };

  const handleChange = ({
    currentTarget: { id, value },
  }: FormEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [id]: value });
  };

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      const { name, googleId } = response.profileObj;
      console.log(name, googleId);
    } else {
      console.log(response.code);
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
              value={email}
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
        <GoogleLogin
          clientId="1085757713654-5hllkudhdbui81f0tkj43ne5cr79jqrj.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
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
