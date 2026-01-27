const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

/* =========================
   POR COORDENADAS (CORRETO)
   ========================= */

export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
    
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar clima atual");
  }


  return res.json();
}

export async function getForecastByCoords(lat, lon) {
  const res = await fetch(
    `${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar previsão");
  }

  return res.json();
}

/* =========================
   (OPCIONAL) POR CIDADE
   ========================= */

export async function getForecastByCity(city) {
  const res = await fetch(
    `${BASE}/forecast?q=${city},BR&units=metric&lang=pt_br&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar previsão por cidade");
  }

  return res.json();
}
