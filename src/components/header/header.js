import React from "react";

import { Link } from "react-router-dom";

import { User } from "./../../userState";

import "./header.css";

function Logout() {
  return (
    <Link to="/login">
      {" "}
      <button
        className="btn btn-register"
        onClick={() => {
          localStorage.removeItem("jwt");
          window.location.replace("/login");
        }}
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        logout
      </button>
    </Link>
  );
}

function Login() {
  return (
    <div className="login-container">
      <Link to="/signup">
        {" "}
        <button className="btn btn-register">
          <i className="fa-solid fa-right-to-bracket"></i>
          Sign up
        </button>
      </Link>
      <Link to="/login">
        {" "}
        <button className="btn btn-register">
          <i className="fa-solid fa-right-to-bracket"></i>
          Login
        </button>
      </Link>
    </div>
  );
}

const Header = () => {
  const { data } = User();

  return (
    <header className="">
      <div className="nav-bar">
        <div className="logo">BookStore</div>
        {data ? Logout() : Login()}
      </div>
    </header>
  );
};

export default Header;
