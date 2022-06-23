const localStorageKey = "bookStore__auth_provider_token__";

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.token);

  return data;
}

function login({ email, password }) {
  //  "http://localhost:8000/api/v1/users/login";
  return client("login", { email, password }).then(handleUserResponse);
}

function register({ username, password, passwordConfirm, email, age }) {
  return client("login", {
    username,
    password,
    passwordConfirm,
    email,
    age,
  }).then(handleUserResponse);
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = "http://localhost:8000/api/v1/users";
// process.env.REACT_APP_AUTH_URL;

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const { data } = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { getToken, login, register, logout, localStorageKey };
