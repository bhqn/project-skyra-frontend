const BASE_URL = "http://localhost:3000";

function request(url, options) {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(res.status)
  );
}

export function getCards() {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function createCard(card) {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
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
    headers: { Authorization: `Bearer ${token}` },
  });
}
