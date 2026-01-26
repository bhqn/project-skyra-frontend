
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Busca o clima ATUAL de uma cidade.
 *
 * Retorna dados como:
 * - temperatura atual
 * - descrição do clima
 * - umidade
 * - pressão
 * - nascer e pôr do sol
 *
 * @param {string} city - Nome da cidade (ex: "Rio de Janeiro")
 * @returns {Promise<Object>} Dados do clima atual
 */
export function getWeatherByCity(city) {
  return fetch(
    `${BASE_URL}?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao buscar clima atual");
    }
    return res.json();
  });
}

/**
 * Busca a PREVISÃO DO TEMPO de uma cidade.
 *
 * Retorna uma lista de previsões a cada 3 horas,
 * usada principalmente para:
 * - gráfico de temperatura
 * - previsão das próximas horas/dias
 *
 * @param {string} city - Nome da cidade (ex: "Rio de Janeiro")
 * @returns {Promise<Object>} Dados de previsão (forecast)
 */
export function getForecastByCity(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao buscar previsão do tempo");
    }
    return res.json();
  });
}
