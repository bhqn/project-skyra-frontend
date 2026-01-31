import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../index.css";
import { useEffect, useMemo, useState } from "react";
import { getWeatherByCoords, getForecastByCoords } from "../../utils/weatherApi";
import Loader from "../Loader/Loader";
import { mapWeather } from "../../utils/mapWeather";
import Popup from "../Popup/Popup";
import { ProfileProvider } from "../../context/ProfileContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth";
import * as cardsApi from "../../utils/cardsApi";

function App() {
  const navigate = useNavigate();

  // estado: auth
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // estado: ui
  const [isOpen, setIsOpen] = useState(false);

  // estado: clima
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // estado: cidades
  const [savedCities, setSavedCities] = useState([]);
  const [activeCityUf, setActiveCityUf] = useState(null);
  

  // estado: cidade atual
  const [capital, setCapital] = useState({
    nome: "Rio de Janeiro",
    uf: "RJ",
    lat: -22.9068,
    lon: -43.1729,
  });

  // dia: seleciona o dia
  const [selectedDayKey, setSelectedDayKey] = useState(null);

  // dados: userData
  const userData = useMemo(
    () => ({ username: currentUser?.name || currentUser?.email || "Usuário" }),
    [currentUser]
  );

  // id do usuário (p/ persistência por usuário)
  const userId = currentUser?.email || currentUser?._id;

  // chaves do localStorage por usuário
  const storageKeys = useMemo(() => {
    if (!userId) return null;
    return {
      savedCities: `savedCities_${userId}`,
      activeCityUf: `activeCityUf_${userId}`,
      profile: `profile_${userId}`,
    };
  }, [userId]);

  // ui: tooltip/log (minimalista)
  const notify = (type, message) => {
    console.log(`[${type}] ${message}`);
  };

  // ui: abre/fecha popup
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  // cidade: seleciona capital
  const selectCapital = (selected) => setCapital(selected);

  // auth: limpa sessão local
  const clearSession = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedCities([]);
    setActiveCityUf(null);
  };

  // auth: logout
  const signOut = () => {
    clearSession();
    navigate("/login");
  };

  // cidades: adiciona cidade salva
 const addSavedCity = (capitalData, weatherData) => {
  // evita duplicar na UI enquanto o backend responde
  const exists = savedCities.some((c) => c.uf === capitalData.uf);
  if (exists) return;

  cardsApi
    .createCard({
      uf: capitalData.uf,
      nome: capitalData.nome,
      estado: capitalData.estado,
      lat: capitalData.lat,
      lon: capitalData.lon,
      temp: weatherData.temp,
      description: weatherData.description,
      iconCode: weatherData.iconCode,
    })
    .then((res) => {
      // dependendo do backend
      const card = res?.data?.data ?? res?.data;

      setSavedCities((prev) => [...prev, card]);
      setActiveCityUf(card.uf);
    })
    .catch((err) => {
      console.error("❌ Erro ao salvar card:", err);
    });
};


  // cidades: remove cidade salva
const removeSavedCity = (cardId) => {
  cardsApi
    .deleteCard(cardId)
    .then(() => {
      setSavedCities((prev) => prev.filter((c) => c._id !== cardId));
    })
    .catch((err) => console.error(err));
};

  // cidades: seleciona cidade salva
  const selectSavedCity = (city) => {
    setCapital({
      nome: city.nome,
      uf: city.uf,
      lat: city.lat,
      lon: city.lon,
    });
    setActiveCityUf(city.uf);
  };

  // ===== forecast -> dailyForecast =====
  function buildDailyForecast(forecastData) {
    if (!forecastData?.list) return [];

    const byDay = new Map();

    for (const item of forecastData.list) {
      const day = item.dt_txt.slice(0, 10); // "YYYY-MM-DD"
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day).push(item);
    }

    const days = [];
    for (const [day, items] of byDay.entries()) {
      const pick =
        items.find((x) => x.dt_txt.includes("12:00:00")) ||
        items[Math.floor(items.length / 2)];

      days.push({
        dayKey: day,
        temp: Math.round(pick.main.temp),
        description: pick.weather?.[0]?.description,
        iconCode: pick.weather?.[0]?.icon,
        raw: pick,
      });
    }

    return days.slice(0, 5);
  }

  const dailyForecast = useMemo(() => buildDailyForecast(forecast), [forecast]);

  const selectedDay = useMemo(() => {
    if (!selectedDayKey) return null;
    return dailyForecast.find((d) => d.dayKey === selectedDayKey) || null;
  }, [dailyForecast, selectedDayKey]);

  // auth: valida token + carrega usuário
  const fetchMe = (token) =>
    fetch("http://localhost:3000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));

  // ===== efeitos =====

  // ui: fecha popup com ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closePopup();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // clima: busca weather + forecast
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

  // auth: boot (verifica jwt ao iniciar)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    fetchMe(token)
      .then((user) => {
        setCurrentUser(user?.data || user);
        setIsLoggedIn(true);

        return cardsApi.getCards();
      })
      .then((res) => {
  setSavedCities(res.data); // vem do Mongo agora
})
      .catch(() => {
        clearSession();
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  // seleciona automaticamente o primeiro dia, mas SEM sobrescrever clique
  useEffect(() => {
    if (!dailyForecast.length) return;

    const stillExists = selectedDayKey
      ? dailyForecast.some((d) => d.dayKey === selectedDayKey)
      : false;

    if (!selectedDayKey || !stillExists) {
      setSelectedDayKey(dailyForecast[0].dayKey);
    }
  }, [dailyForecast, selectedDayKey]);

  // persistência: carrega dados por usuário ao trocar userId
  useEffect(() => {
    if (!storageKeys) return;

    try {
      const legacyCities = localStorage.getItem("savedCities");
      if (!localStorage.getItem(storageKeys.savedCities) && legacyCities) {
        localStorage.setItem(storageKeys.savedCities, legacyCities);
        localStorage.removeItem("savedCities");
      }

      const legacyActive = localStorage.getItem("activeCityUf");
      if (!localStorage.getItem(storageKeys.activeCityUf) && legacyActive) {
        localStorage.setItem(storageKeys.activeCityUf, legacyActive);
        localStorage.removeItem("activeCityUf");
      }

      const rawCities = localStorage.getItem(storageKeys.savedCities);
      setSavedCities(rawCities ? JSON.parse(rawCities) : []);
    } catch {
      setSavedCities([]);
    }

    const rawActive = localStorage.getItem(storageKeys.activeCityUf);
    setActiveCityUf(rawActive || null);
  }, [storageKeys]);

  // persistência: salva cidades por usuário
  useEffect(() => {
    if (!storageKeys) return;
    localStorage.setItem(storageKeys.savedCities, JSON.stringify(savedCities));
  }, [savedCities, storageKeys]);

  // persistência: salva activeCityUf por usuário
  useEffect(() => {
    if (!storageKeys) return;

    if (activeCityUf)
      localStorage.setItem(storageKeys.activeCityUf, activeCityUf);
    else localStorage.removeItem(storageKeys.activeCityUf);
  }, [activeCityUf, storageKeys]);

  // ===== handlers: auth =====

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .authorize({ email, password })
      .then((data) => {
        const token = data?.token || data?.jwt;
        if (!token) throw new Error("Token não retornado");

        localStorage.setItem("jwt", token);
        return fetchMe(token);
      })
      .then((user) => {
        setCurrentUser(user?.data || user);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("❌ Erro no login:", err);
        notify("error", "Falha no login");
      });
  };

  const handleRegistration = (data) => {
    auth
      .register(data)
      .then(() => {
        notify("success", "Cadastro realizado");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        notify("error", "Não foi possível cadastrar");
      });
  };

  // ✅ return condicional DEPOIS de todos hooks
  if (checkingAuth) return <Loader />;

  return (
    <Routes>
      {/* públicas */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login handleLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Register handleRegistration={handleRegistration} />
          )
        }
      />

      {/* protegida */}
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <Navigate to="/login" replace />
          ) : (
            <ProfileProvider userId={userId}>
              <Header userData={userData} onSelectCapital={selectCapital} />

              {loading && <Loader />}
              {error && <p>{error}</p>}

              {!loading && weather && forecast && (
                <Main
                  weather={weather}
                  forecast={forecast}
                  dailyForecast={dailyForecast}
                  selectedDayKey={selectedDayKey}
                  onSelectDay={setSelectedDayKey}
                  selectedDay={selectedDay}
                  savedCities={savedCities}
                  onAddCity={addSavedCity}
                  onRemoveCity={removeSavedCity}
                  onSelectCity={selectSavedCity}
                  capital={capital}
                  setActiveCityUf={setActiveCityUf}
                  activeCityUf={activeCityUf}
                  onOpen={openPopup}
                  signOut={signOut}
                />
              )}

              {isOpen && <Popup isOpen={isOpen} onClose={closePopup} />}
            </ProfileProvider>
          )
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
