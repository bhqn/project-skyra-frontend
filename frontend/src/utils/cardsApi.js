const BASE_URL = "https://project-skyra-backend.onrender.com";

function request(url, options = {}) {
  return fetch(url, options).then(async (res) => {
    const data = await res.json().catch(() => ({}));

    if (res.ok) return data;

    return Promise.reject({
      status: res.status,
      message: data?.message || `Erro ${res.status}`,
    });
  });
}

export function getCards() {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/cards`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createCard(card) {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(card),
  });
}

export function deleteCard(cardId) {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
