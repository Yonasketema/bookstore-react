import axios from "axios";
import React from "react";

import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";
import Login from "./components/login";
import * as auth from "./AuthProvider";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(() => auth.getToken());

  const login = (form) =>
    auth.login(form).then((u) => {
      setToken(u.token);
    });

  useQuery(
    "user",
    () => {
      return window
        .fetch("http://localhost:8000/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .catch((error) => Promise.reject(error));
    },
    {
      onSuccess: (user) => {
        setUser({ ...user, token: token });
      },
    }
  );

  console.log("......>>.", user);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticatedApp user={user} />} />
        <Route path="/login" element={<Login onSubmit={login} />} />
      </Routes>
    </>
  );
}

export default App;
