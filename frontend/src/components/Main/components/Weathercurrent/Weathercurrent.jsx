import "./WeatherCurrent.css";
import ImageLocation from "../../../../assets/sunny.svg?react";
import WeatherChart from "../Weathercurrent/components/WeatherChart.jsx"
function WeatherCurrent() {
  return (
    <div className="weather-Current">
      <div className="weather-current__container">
        <div className="weather-current__wrap-one">
          <ImageLocation className="weather-current__image"></ImageLocation>
          <div>
            <p className="weather-current__date">Segunda-feira, 23/01</p>
            <p className="weather-current__weather">Ensolarado</p>
          </div>
        </div>
        <div className="weather-current__wrap-two">
          <p className="weather-current__time">10:20 am</p>
          <p className="weather-current__location">Rio de Janeiro</p>
        </div>
      </div>
      <div className="weather-current__temp">
        <p className="weather-current__temp-nun">32</p>
        <p className="weather-current__temp-unit">c°</p>
      </div>

      <div className="weather-current__meta">
        <div className="weather-current__meta-iten">
          <p className="weather-current__meta-text">Pressão</p>
          <p className="weather-current__meta-num">200mb</p>
        </div>
        <div className="weather-current__meta-iten">
          <p className="weather-current__meta-text">Humidade</p>
          <p className="weather-current__meta-num">70%</p>
        </div>
        <div className="weather-current__meta-iten">
          <p className="weather-current__meta-text">Visibilidade</p>
          <p className="weather-current__meta-num">5km</p>
        </div>
      </div>

      <div className="weather-current__Sun">
        <div className="weather-current__Sun-card">
            <p className="weather-current__Sun-text">Nascer do sol</p>
            <p className="weather-current__Sun-time">5:10 am</p>

        </div>
        <div className="weather-current__Sun-card">
             <p className="weather-current__Sun-text">Por do sol</p>
            <p className="weather-current__Sun-time">6:20 pm</p>

        </div>

        
      </div>
      <p className="weather-Current__title"> Grafico de Temperatura</p>
      <div className="weather-Current__charts">
        <WeatherChart></WeatherChart>
      </div>
    </div>
  );
}

export default WeatherCurrent;
