import "./WeatherCurrent.css";
import ImageLocation from "../../../../assets/sunny.svg?react";
import WeatherChart from "../Weathercurrent/components/WeatherChart.jsx";
import {
  formatTime,
  getCurrentHour,
  getDayAndMonth,
  getWeekDayLong,
  getWeekDayShort,
} from "../../../../utils/date";
import { mapWeather } from "../../../../utils/mapWeather";
import { weatherIconMap } from "../../../../utils/weatherMapIcon.js";
import Ensolarado from "../../../../assets/Ensolarado.svg?react";

function WeatherCurrent({ weather, forecast }) {
  if (!weather) return null;

  const mapped = mapWeather(weather);
  const Icon = weatherIconMap[mapped.iconCode] || Ensolarado;

  return (
    <div className="weather-Current">
      <div className="weather-current__container">
        <div className="weather-current__wrap-one">
          <Icon className="weather-current__image" />
          <div>
            <p className="weather-current__date">
              {getWeekDayShort()} {getDayAndMonth()}
            </p>
            <p className="weather-current__weather">{mapped.description}</p>
          </div>
        </div>

        <div className="weather-current__wrap-two">
          <p className="weather-current__time">{getCurrentHour()}</p>
          <p className="weather-current__location">{mapped.city}</p>
        </div>
      </div>

      <div className="weather-current__temp">
        <p className="weather-current__temp-nun">{mapped.temp}</p>
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
            {mapped.visibility / 1000} km
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
        <WeatherChart forecast={forecast} />
      </div>
    </div>
  );
}

export default WeatherCurrent;
