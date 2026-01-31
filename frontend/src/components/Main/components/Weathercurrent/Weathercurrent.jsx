import "./WeatherCurrent.css";
import WeatherChart from "../Weathercurrent/components/WeatherChart.jsx";
import {
  formatTime,
  getCurrentHour,
  getDayAndMonth,
  getWeekDayLong,
  getWeekDayShort,
} from "../../../../utils/date";
import { weatherIconMap } from "../../../../utils/weatherMapIcon.js";
import Ensolarado from "../../../../assets/pngs/ensolarado.png";



function WeatherCurrent({ weather, forecast, capital, activeCityUf, selectedDay }) {
  if (!weather) return null;

const mapped = selectedDay
  ? {
      ...weather,
      temp: selectedDay.temp,
      description: selectedDay.description,
      iconCode: selectedDay.iconCode,
      // pega do raw do forecast quando existir
      pressure: selectedDay.raw?.main?.pressure ?? weather.pressure,
      humidity: selectedDay.raw?.main?.humidity ?? weather.humidity,
      visibility: selectedDay.raw?.visibility ?? weather.visibility,
    }
  : weather;

const temp = mapped.temp;
const description = mapped.description;
const iconCode = mapped.iconCode;

const isActive = capital?.uf === activeCityUf;
const iconImage = weatherIconMap[iconCode] || Ensolarado;

  return (
    <div className={`weather-Current ${
        isActive ? "weather-current--active" : ""
      }`}>
      <div className="weather-current__container">
        <div className="weather-current__wrap-one">
          <img src={iconImage} className="weather-current__image" alt={mapped?.description || "Ícone do tempo"} />
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
        <WeatherChart forecast={forecast} selectedDayKey={selectedDay?.dayKey} />
      </div>
    </div>
  );
}

export default WeatherCurrent;


function formatSelectedDate(dayKey) {
  const d = new Date(dayKey);

  const week = d.toLocaleDateString("pt-BR", {
    weekday: "short",
  });

  const dm = d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  return `${week} ${dm}`;
}
