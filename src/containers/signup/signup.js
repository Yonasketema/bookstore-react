import React from "react";

import { useFormik } from "formik";
import Classes from "./signup.module.css";
import axios from "axios";

const Login = () => {
  async function makePostRequest(userData) {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        userData
      );

      if (data === "success") {
        localStorage.setItem("jwt", data.dat.token);
        window.location.replace("/");
      }
    } catch (err) {
      console.log("[Login.js] makePostRequest", err);

      ///some thing set to be true
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      passwordConfirm: "",
      email: "",
      age: "",
    },

    onSubmit: async (values) => {
      makePostRequest(values);
    },
  });

  return (
    <div className={Classes.login_wrapper}>
      <h1>Please Log In</h1>

      <form className={Classes.login_form} onSubmit={formik.handleSubmit}>
        <label className={Classes.login_label}>
          <p>Username</p>
          <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
          />
        </label>
        <label className={Classes.login_label}>
          <p>Password</p>
          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="text"
          />
        </label>
        <label className={Classes.login_label}>
          <p>passwordConfirm</p>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            type="text"
          />
        </label>
        <label className={Classes.login_label}>
          <p>Email</p>
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="text"
          />
        </label>
        <label className={Classes.login_label}>
          <p>Age</p>
          <input
            id="age"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            type="text"
          />
        </label>
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
