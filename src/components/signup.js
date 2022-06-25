/** @jsxImportSource @emotion/react */

import { Input, Button } from "./lib";

const Login = ({ onSubmit, err }) => {
  function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, passwordConfirm, age } =
      event.target.elements;
    onSubmit({
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      age: age.value,
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
      signup
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
        <label htmlFor="name">name</label>
        <Input id="name" type="text" />

        <label htmlFor="email">email</label>
        <Input id="email" />

        <label htmlFor="password">password</label>
        <Input id="password" type="password" />

        <label htmlFor="passwordConfirm">passwordConfirm</label>
        <Input id="passwordConfirm" type="password" />

        <label htmlFor="age">age</label>
        <Input id="age" type="text" />

        <Button type="submit">Signup</Button>

        <div css={{ color: "red" }}>{err ? err : ""}</div>
      </form>
    </div>
  );
};

export default Login;
