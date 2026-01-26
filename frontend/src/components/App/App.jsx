import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../index.css";
import { useEffect, useState } from "react";
import { getWeatherByCity, getForecastByCity } from "../../utils/weatherApi";
import Loader from "../Loader/Loader";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Rio de Janeiro");
  const [forecast, setForecast] = useState([]);

  const userData = {
    username: "Bernardo",
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all([getWeatherByCity(city), getForecastByCity(city)])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData);
        setForecast(forecastData);
      })
      .catch(() => setError("Cidade não encontrada"))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <>
      <Header userData={userData} />

      {loading && <Loader/>}
      {error && <p>{error}</p>}
      {!loading && weather && forecast && (
        <Main weather={weather} forecast={forecast} />
      )}
    </>
  );
}

export default App;
