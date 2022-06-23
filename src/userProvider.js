import axios from "axios";
import { useQuery } from "react-query";
import * as auth from "./../AuthProvider";
import React from "react";

const token = auth.getToken();

const userProvider = React.createContext();

function getUser() {
  axios.get("http://localhost:8000/api/v1/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function UserProvider({ props }) {
  const { data } = useQuery("user", getUser);

  return (
    <userProvider.Provider value={data} {...props}></userProvider.Provider>
  );
}

export default UserProvider;
