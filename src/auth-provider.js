const localStorageKey = "bookStore__auth_provider_token__";

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.token);
  window.location.assign("/");
  return data;
}

function login({ email, password }) {
  return client("login", { email, password }).then(handleUserResponse);
}

function signup({ name, password, passwordConfirm, email, age }) {
  return client("signup", {
    name,
    password,
    passwordConfirm,
    email,
    age,
  }).then(handleUserResponse);
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
  window.location.assign(window.location);
}

const authURL = `${process.env.REACT_APP_AUTH_URL}/api/v1/users`;
 

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data.data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { getToken, login, signup, logout, localStorageKey };
