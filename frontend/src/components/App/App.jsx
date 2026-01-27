import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../index.css";
import { useEffect, useState } from "react";
import { getWeatherByCoords, getForecastByCoords } from "../../utils/weatherApi";
import Loader from "../Loader/Loader";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [capital, setCapital] = useState({
    nome: "Rio de Janeiro",
    lat: -22.9068,
    lon: -43.1729,
  });

  const userData = { username: "Bernardo" };

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all([
      getWeatherByCoords(capital.lat, capital.lon),
      getForecastByCoords(capital.lat, capital.lon),
    ])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
      })
      .catch(() => setError("Não foi possível carregar o clima"))
      .finally(() => setLoading(false));
  }, [capital.lat, capital.lon]);

  function handleCapitalSelect(selected) {
    setCapital(selected); // <- ESSENCIAL
  }

  return (
    <>
      <Header userData={userData} onSelectCapital={handleCapitalSelect} />

      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && weather && forecast && <Main weather={weather} forecast={forecast} />}
    </>
  );
}

export default App;
