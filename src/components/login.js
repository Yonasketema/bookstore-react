import React from "react";
import * as auth from "./../AuthProvider";
import { Input, FlexBox } from "./lib";

const Login = ({ onSubmit }) => {
  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;

    onSubmit({
      email: email.value,
      password: password.value,
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FlexBox>
          <Input id="email" />
          <Input id="password" />
        </FlexBox>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
