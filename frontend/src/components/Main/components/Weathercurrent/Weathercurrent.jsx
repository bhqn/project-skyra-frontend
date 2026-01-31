import "./WeatherCurrent.css";
import WeatherChart from "../Weathercurrent/components/WeatherChart.jsx";
import {
  formatTime,
  getCurrentHour,
  getDayAndMonth,
  getWeekDayShort,
} from "../../../../utils/date";
import { weatherIconMap } from "../../../../utils/weatherMapIcon.js";
import Ensolarado from "../../../../assets/pngs/ensolarado.png";
import SunCalc from "suncalc";

function getSunTimesForDay(dayKey, lat, lon) {
  if (!dayKey || lat == null || lon == null)
    return { sunrise: null, sunset: null };

  // dayKey tipo "2026-02-02"
  const date = new Date(dayKey + "T12:00:00");
  const times = SunCalc.getTimes(date, lat, lon);

  return {
    sunrise: Math.floor(times.sunrise.getTime() / 1000),
    sunset: Math.floor(times.sunset.getTime() / 1000),
  };
}

function WeatherCurrent({
  weather,
  forecast,
  capital,
  activeCityUf,
  selectedDay,
}) {
  if (!weather) return null;

  // ---------- DEBUG SUNRISE/SUNSET ----------
  console.log("========== WEATHER DEBUG ==========");
  console.log("selectedDay?", !!selectedDay, "dayKey:", selectedDay?.dayKey);

  console.log("weather.sunrise/sunset:", weather?.sunrise, weather?.sunset);
  console.log(
    "weather.sys.sunrise/sunset:",
    weather?.sys?.sunrise,
    weather?.sys?.sunset,
  );
  console.log(
    "forecast.city.sunrise/sunset:",
    forecast?.city?.sunrise,
    forecast?.city?.sunset,
  );

  const lat = capital?.lat ?? weather?.lat ?? weather?.coord?.lat;
  const lon = capital?.lon ?? weather?.lon ?? weather?.coord?.lon;

  const sunFromSelected = selectedDay
    ? getSunTimesForDay(selectedDay.dayKey, lat, lon)
    : null;

  const sunrise = selectedDay
    ? sunFromSelected.sunrise
    : (weather?.sunrise ?? forecast?.city?.sunrise);

  const sunset = selectedDay
    ? sunFromSelected.sunset
    : (weather?.sunset ?? forecast?.city?.sunset);

  console.log("CHOSEN sunrise/sunset:", sunrise, sunset);

  // Detecta se está em segundos (10 dígitos) ou ms (13 dígitos)
  const toDateSmart = (v) => {
    if (!v) return null;
    const ms = v < 1e12 ? v * 1000 : v; // < 1e12 => seconds
    return new Date(ms);
  };

  console.log("as Date(smart) sunrise:", toDateSmart(sunrise));
  console.log("as Date(smart) sunset:", toDateSmart(sunset));

  // Testa seu formatTime (pra ver se ele já multiplica por 1000 ou não)
  console.log("formatTime(sunrise):", formatTime(sunrise));
  console.log("formatTime(sunset):", formatTime(sunset));
  console.log("==================================");
  // ---------- FIM DEBUG ----------

  const mapped = selectedDay
    ? {
        ...weather,
        temp: selectedDay.temp,
        description: selectedDay.description,
        iconCode: selectedDay.iconCode,
        pressure: selectedDay.raw?.main?.pressure ?? weather.pressure,
        humidity: selectedDay.raw?.main?.humidity ?? weather.humidity,
        visibility: selectedDay.raw?.visibility ?? weather.visibility,
        // IMPORTANTE: sunrise/sunset NÃO vêm por item no forecast 5d/3h na maioria dos casos
        sunrise,
        sunset,
      }
    : { ...weather, sunrise, sunset };

  const temp = mapped.temp;
  const description = mapped.description;
  const iconCode = mapped.iconCode;

  const isActive = capital?.uf === activeCityUf;
  const iconImage = weatherIconMap[iconCode] || Ensolarado;

  return (
    <div
      className={`weather-Current ${isActive ? "weather-current--active" : ""}`}
    >
      <div className="weather-current__container">
        <div className="weather-current__wrap-one">
          <img
            src={iconImage}
            className="weather-current__image"
            alt={mapped?.description || "Ícone do tempo"}
          />
          <div>
            <p className="weather-current__date">
              {selectedDay
                ? formatSelectedDate(selectedDay.dayKey)
                : `${getWeekDayShort()} ${getDayAndMonth()}`}
            </p>
            <p className="weather-current__weather">{description}</p>
          </div>
        </div>

        <div className="weather-current__wrap-two">
          <p className="weather-current__time">{getCurrentHour()}</p>
          <p className="weather-current__location">
            {mapped.city || capital?.nome}
          </p>
        </div>
      </div>

      <div className="weather-current__temp">
        <p className="weather-current__temp-nun">{temp}</p>
        <p className="weather-current__temp-unit">°C</p>
      </div>

      <div className="weather-current__meta">
        <div className="weather-current__meta-iten">
          <p className="weather-current__meta-text">Pressão</p>
          <p className="weather-current__meta-num">{mapped.pressure} hPa</p>
        </div>

        <div className="weather-current__meta-iten">
          <p className="weather-current__meta-text">Humidade</p>
          <p className="weather-current__meta-num">{mapped.humidity}%</p>
        </div>

        <div className="weather-current__meta-iten">
          <p className="weather-current__meta-text">Visibilidade</p>
          <p className="weather-current__meta-num">
            {mapped.visibility ? mapped.visibility / 1000 : "--"} km
          </p>
        </div>
      </div>

      <div className="weather-current__Sun">
        <div className="weather-current__Sun-card">
          <p className="weather-current__Sun-text">Nascer do sol</p>
          <p className="weather-current__Sun-time">
            {formatTime(mapped.sunrise)}
          </p>
        </div>

        <div className="weather-current__Sun-card">
          <p className="weather-current__Sun-text">Pôr do sol</p>
          <p className="weather-current__Sun-time">
            {formatTime(mapped.sunset)}
          </p>
        </div>
      </div>

      <p className="weather-Current__title">Gráfico de Temperatura</p>

      <div className="weather-Current__charts">
        <WeatherChart
          forecast={forecast}
          selectedDayKey={selectedDay?.dayKey}
        />
      </div>
    </div>
  );
}

export default WeatherCurrent;

function formatSelectedDate(dayKey) {
  const d = new Date(dayKey);

  const week = d.toLocaleDateString("pt-BR", { weekday: "short" });
  const dm = d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  return `${week} ${dm}`;
}
