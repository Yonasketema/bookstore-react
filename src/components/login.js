/** @jsxImportSource @emotion/react */

import { Input, Button } from "./lib";

const Login = ({ onSubmit, err }) => {
  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  }
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: " center",
        flexDirection: "column",
        height: "100vh",
        gap: " 1rem",
      }}
    >
      Login
      <form
        onSubmit={handleSubmit}
        css={{
          display: "flex",
          flexDirection: "column",
          width: "35%",
          gap: "1rem",
          border: "1px solid rgb(167, 167, 167)",
          padding: "2rem 3rem",
        }}
      >
        <label htmlFor="email">email</label>
        <Input id="email" />

        <label htmlFor="password">password</label>
        <Input id="password" type="password" />

        <Button type="submit">Login</Button>

        <div css={{ color: "red" }}>{err ? err : ""}</div>
      </form>
    </div>
  );
};

export default Login;
