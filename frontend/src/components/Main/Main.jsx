import "./Main.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherCurrent from "./components/Weathercurrent/Weathercurrent";
import Forecast from "./components/Forecast/Forecast";
import Cities from "./components/Cities/Cities";

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
  selectedDay, 
  dailyForecast
}) {
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
days={dailyForecast}
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
