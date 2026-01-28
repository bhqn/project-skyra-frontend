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
import Popup from "../Popup/Popup";
import { ProfileProvider } from "../../context/ProfileContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedCities, setSavedCities] = useState(() => {
    try {
      const raw = localStorage.getItem("savedCities");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  //salvar cidade ativa
  const [activeCityUf, setActiveCityUf] = useState(() => {
    return localStorage.getItem("activeCityUf");
  });

  const [capital, setCapital] = useState({
    nome: "Rio de Janeiro",
    uf: "RJ",
    lat: -22.9068,
    lon: -43.1729,
  });

  const userData = { username: "Bernardo" };

  //fechar popup com ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }, [savedCities]);

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all([
      getWeatherByCoords(capital.lat, capital.lon),
      getForecastByCoords(capital.lat, capital.lon),
    ])
      .then(([weatherData, forecastData]) => {
        setWeather(mapWeather(weatherData));
        setForecast(forecastData);
      })
      .catch(() => setError("Não foi possível carregar o clima"))
      .finally(() => setLoading(false));
  }, [capital.lat, capital.lon]);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  function handleCapitalSelect(selected) {
    setCapital(selected); // <- ESSENCIAL
  }

  function handleAddCity(capital, weather) {
    setSavedCities((prev) => {
      const exists = prev.some((c) => c.uf === capital.uf);
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
          lat: capital.lat,
          lon: capital.lon,
        },
      ];
    });
    setActiveCityUf(capital.uf);
    localStorage.setItem("activeCityUf", capital.uf);
  }

  function handleRemoveCity(uf) {
    setSavedCities((prev) => prev.filter((c) => c.uf !== uf));
    if (uf === activeCityUf) {
      setActiveCityUf(false);
      localStorage.removeItem("activeCityUf");
    }
  }

  function handleSelectSavedCity(city) {
    setCapital({
      nome: city.nome,
      uf: city.uf,
      lat: city.lat,
      lon: city.lon,
    });

    //salvar cidade selecionada
    setActiveCityUf(city.uf);
    localStorage.setItem("activeCityUf", city.uf);
  }

return (
  <>
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App */}
      <Route
        path="/"
        element={
          <ProfileProvider userData={userData}>
            <Header
              userData={userData}
              onSelectCapital={handleCapitalSelect}
            />

            {loading && <Loader />}
            {error && <p>{error}</p>}

            {!loading && weather && forecast && (
              <Main
                weather={weather}
                forecast={forecast}
                savedCities={savedCities}
                onAddCity={handleAddCity}
                onRemoveCity={handleRemoveCity}
                onSelectCity={handleSelectSavedCity}
                capital={capital}
                setActiveCityUf={setActiveCityUf}
                activeCityUf={activeCityUf}
                onOpen={onOpen}
              />
            )}

            {isOpen && <Popup isOpen={isOpen} onClose={onClose} />}
          </ProfileProvider>
        }
      />
    </Routes>
  </>
);
}

export default App;
