
export const BASE_URL = "https://project-skyra-backend.onrender.com";

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (res.ok) return data;

  // aqui pega a mensagem real do back
  const message = data?.message || `Erro: ${res.status}`;
  return Promise.reject(message);
};


export const register = ({ email, password, username }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error: ${res.status} um dos campos foi preenchido incorretamente`
        );
  });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));

    if (res.ok) return data;

    return Promise.reject(data?.message || `Error: ${res.status}`);
  });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};