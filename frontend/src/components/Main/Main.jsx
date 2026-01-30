import "./Main.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherCurrent from "./components/Weathercurrent/Weathercurrent";
import Forecast from "./components/Forecast/Forecast";
import Cities from "./components/Cities/Cities";
import mapWeeklyForecast from "../../utils/mapWeeklyForecast"; // ✅ ajuste o caminho se precisar

function Main({
  weather,
  forecast,
  savedCities,
  onAddCity,
  onRemoveCity,
  capital,
  onSelectCity,
  activeCityUf,
  onOpen,
  signOut,
  selectedDayKey,
  onSelectDay,
}) {
  // ✅ calcula os dias a partir do forecast
  const days = forecast ? mapWeeklyForecast(forecast) : [];

  // ✅ acha o dia selecionado
  const picked = selectedDayKey
    ? days.find((d) => d.dayKey === selectedDayKey)
    : null;

  // ✅ monta selectedDay mantendo os campos do "weather" (pra não dar NaN/Invalid Date)
  const selectedDay = picked
    ? {
        ...weather,
        temp: picked.temp,
        description: picked.description,
        iconCode: picked.iconCode,
        dayKey: picked.dayKey,
      }
    : null;

  return (
    <main className="main">
      <Sidebar onOpenProfile={onOpen} signOut={signOut} />

      <WeatherCurrent
        weather={weather}
        forecast={forecast}
        capital={capital}
        activeCityUf={activeCityUf}
        selectedDay={selectedDay}
      />

      <div className="main__wrap">
        <Forecast
          forecast={forecast}
          selectedDayKey={selectedDayKey}
          onSelectDay={onSelectDay}
        />

        <Cities
          onAddCity={onAddCity}
          cities={savedCities}
          onRemoveCity={onRemoveCity}
          weather={weather}
          capital={capital}
          onSelectCity={onSelectCity}
          activeCityUf={activeCityUf}
        />
      </div>
    </main>
  );
}

export default Main;
