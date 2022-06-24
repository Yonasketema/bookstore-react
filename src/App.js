import React from "react";
import AuthenticatedApp from "./authenticated-app";
import Login from "./components/login";
import * as auth from "./auth-provider";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "react-query";

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(() => auth.getToken());

  const login = (form) =>
    auth.login(form).then((u) => {
      setToken(u.token);
    });

  const logout = (form) =>
    auth.logout(form).then((u) => {
      setToken(null);
    });

  useQuery(
    "user",
    () => {
      return window
        .fetch("http://localhost:8000/api/v1/users/profile", {
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

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AuthenticatedApp user={user} logout={logout} />}
        />
        <Route path="/login" element={<Login onSubmit={login} />} />
      </Routes>
    </>
  );
}

export default App;
