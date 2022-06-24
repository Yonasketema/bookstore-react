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
