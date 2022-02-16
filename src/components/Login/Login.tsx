import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");

  const onSignIn = (googleUser: any) => {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    setName(profile.getName());
  };

  return (
    <div>
      <div className="g-signin2" data-onsuccess="onSignIn">
        Sign in with Google
      </div>
      <h1>{name}</h1>
    </div>
  );
};

export default Login;
