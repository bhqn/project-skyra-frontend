import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../index.css";
import { useEffect, useState } from "react";
import {
  getWeatherByCoords,
  getForecastByCoords,
} from "../../utils/weatherApi";
import Loader from "../Loader/Loader";
import { mapWeather } from "../../utils/mapWeather";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedCities, setSavedCities] = useState([]);

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
        setWeather(mapWeather(weatherData)); // ✅ agora é mapeado
        setForecast(forecastData);
      })
      .catch(() => setError("Não foi possível carregar o clima"))
      .finally(() => setLoading(false));
  }, [capital.lat, capital.lon]);

  function handleCapitalSelect(selected) {
    setCapital(selected); // <- ESSENCIAL
  }

  function handleAddCity(capital, weather) {
    setSavedCities((prev) => {
      const exists = prev.some((c) => c.uf === capital.uf); // ✅
      if (exists) return prev;

      return [
        ...prev,
        {
          uf: capital.uf,
          nome: capital.nome,
          estado: capital.estado,
          temp: weather.temp,
          description: weather.description,
          iconCode: weather.iconCode,
        },
      ];
    });
  }

  function handleRemoveCity(uf) {
    setSavedCities((prev) => prev.filter((c) => c.uf !== uf));
  }

  return (
    <>
      <Header userData={userData} onSelectCapital={handleCapitalSelect} />

      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && weather && forecast && (
        <Main
          weather={weather}
          forecast={forecast}
          savedCities={savedCities}
          onAddCity={handleAddCity}
          onRemoveCity={handleRemoveCity}
          capital={capital}
        />
      )}
    </>
  );
}

export default App;
