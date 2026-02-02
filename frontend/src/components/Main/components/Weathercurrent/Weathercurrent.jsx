import "./Weathercurrent.css";
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
  if (!dayKey || lat == null || lon == null) return { sunrise: null, sunset: null };

  // "T12:00:00" evita bugs de timezone (troca de dia)
  const date = new Date(`${dayKey}T12:00:00`);
  const times = SunCalc.getTimes(date, lat, lon);

  return {
    sunrise: times?.sunrise ? Math.floor(times.sunrise.getTime() / 1000) : null,
    sunset: times?.sunset ? Math.floor(times.sunset.getTime() / 1000) : null,
  };
}

function formatSelectedDate(dayKey) {
  const d = new Date(dayKey);

  const week = d.toLocaleDateString("pt-BR", { weekday: "short" });
  const dm = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  return `${week} ${dm}`;
}

function WeatherCurrent({ weather, forecast, capital, activeCityUf, selectedDay }) {
  if (!weather) return null;

  // coords para calcular nascer/pôr do sol por dia
  const lat = capital?.lat ?? weather?.lat ?? weather?.coord?.lat;
  const lon = capital?.lon ?? weather?.lon ?? weather?.coord?.lon;

  // nascer/pôr do sol:
  // - se clicou em um dia: calcula com SunCalc
  // - se não: usa o que já vem do weather/forecast
  const sunFromSelected = selectedDay ? getSunTimesForDay(selectedDay.dayKey, lat, lon) : null;

  const sunrise = selectedDay
    ? sunFromSelected.sunrise
    : (weather?.sunrise ?? weather?.sys?.sunrise ?? forecast?.city?.sunrise ?? null);

  const sunset = selectedDay
    ? sunFromSelected.sunset
    : (weather?.sunset ?? weather?.sys?.sunset ?? forecast?.city?.sunset ?? null);

  // vento (fallback do dia clicado -> current)
  const windSpeed =
    selectedDay?.raw?.wind?.speed ??
    weather?.windSpeed ??
    weather?.wind?.speed ??
    null;

  // dados exibidos (troca temp/desc/icone quando seleciona dia)
  const mapped = selectedDay
    ? {
        ...weather,
        temp: selectedDay.temp,
        description: selectedDay.description,
        iconCode: selectedDay.iconCode,
        pressure: selectedDay.raw?.main?.pressure ?? weather.pressure,
        humidity: selectedDay.raw?.main?.humidity ?? weather.humidity,
        windSpeed,
        sunrise,
        sunset,
      }
    : {
        ...weather,
        windSpeed,
        sunrise,
        sunset,
      };

  const temp = mapped.temp;
  const description = mapped.description;
  const iconCode = mapped.iconCode;

  const isActive = capital?.uf === activeCityUf;
  const iconImage = weatherIconMap[iconCode] || Ensolarado;

  return (
    <div className={`weather-Current ${isActive ? "weather-current--active" : ""}`}>
      <div className="weather-current__container">
        <div className="weather-current__wrap-one">
          <img
            src={iconImage}
            className="weather-current__image"
            alt={mapped?.description || "Ícone do tempo"}
          />
          <div>
            <p className="weather-current__date">
              {selectedDay ? formatSelectedDate(selectedDay.dayKey) : `${getWeekDayShort()} ${getDayAndMonth()}`}
            </p>
            <p className="weather-current__weather">{description}</p>
          </div>
        </div>

        <div className="weather-current__wrap-two">
          <p className="weather-current__time">{getCurrentHour()}</p>
          <p className="weather-current__location">{mapped.city || capital?.nome}</p>
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
          <p className="weather-current__meta-text">Vento</p>
          <p className="weather-current__meta-num">
            {mapped.windSpeed !== null && mapped.windSpeed !== undefined
              ? `${Math.round(mapped.windSpeed * 3.6)} km/h`
              : "--"}
          </p>
        </div>
      </div>

      <div className="weather-current__Sun">
        <div className="weather-current__Sun-card">
          <p className="weather-current__Sun-text">Nascer do sol</p>
          <p className="weather-current__Sun-time">
            {mapped.sunrise ? formatTime(mapped.sunrise) : "--"}
          </p>
        </div>

        <div className="weather-current__Sun-card">
          <p className="weather-current__Sun-text">Pôr do sol</p>
          <p className="weather-current__Sun-time">
            {mapped.sunset ? formatTime(mapped.sunset) : "--"}
          </p>
        </div>
      </div>

      <p className="weather-Current__title">Gráfico de Temperatura</p>

      <div className="weather-Current__charts">
        <WeatherChart forecast={forecast} selectedDayKey={selectedDay?.dayKey} />
      </div>
    </div>
  );
}

export default WeatherCurrent;
