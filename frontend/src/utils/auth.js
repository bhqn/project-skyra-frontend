import { BASE_URL } from "./config";

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
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json().catch(() => ({})) : null;
    const text = !isJson ? await res.text().catch(() => "") : "";

    if (res.ok) return data;

    // tenta usar message do backend, senão dá um erro legível
    const msg =
      data?.message ||
      (text ? "Servidor retornou HTML (verifique rota /signin no deploy)" : "") ||
      `Erro ${res.status}`;

    return Promise.reject(msg);
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