import React from "react";
import "./style/App.css";
import BookStore from "./bookstore";
import Login from "./components/login";
import Signup from "./components/signup";
import * as auth from "./auth-provider";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "react-query";

import { useUser } from "./context/user-context";

function App() {
  const [token, setToken] = React.useState(() => auth.getToken());
  const [, setUser] = useUser();
  const [err, setErr] = React.useState("");

  const login = (form) =>
    auth.login(form).then(
      (t) => {
        setToken(t.token);
      },
      (err) => setErr(err.message)
    );

  const signup = (form) =>
    auth.signup(form).then(
      (t) => {
        setToken(t.token);
      },
      (err) => setErr(err.message)
    );

  const logout = () => {
    auth.logout();
    setToken(null);
  };

  const { isLoading } = useQuery(
    "user",
    () => {
      return window
        .fetch(`${process.env.REACT_APP_AUTH_URL}/api/v1/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (response) => {
          if (response.status === 401) {
            return Promise.reject({ message: "unauthentication" });
          }
          if (response.ok) {
            return await response.json();
          }
        });
    },
    {
      enabled: token ? true : false,
      onSuccess: (user) => {
        setUser({ ...user, token: token });
      },
    }
  );

  if (isLoading) {
    return <p>Loading.........</p>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<BookStore logout={logout} />} />
        <Route path="/login" element={<Login onSubmit={login} err={err} />} />
        <Route
          path="/signup"
          element={<Signup onSubmit={signup} err={err} />}
        />
      </Routes>
    </div>
  );
}

export default App;
