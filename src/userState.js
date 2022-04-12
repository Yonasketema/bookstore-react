import axios from "axios";
import { useQuery } from "react-query";

const token = localStorage.getItem("jwt");

async function getUser() {
  try {
    return await axios.get("http://localhost:8000/api/v1/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    return null;
  }
}

export const User = () => useQuery("user", getUser);
