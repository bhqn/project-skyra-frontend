import "./Forecast.css";
import mapWeeklyForecast from "../../../../utils/mapWeeklyForecast";
import React from "react";


function Forecast({ forecast }) {
  if (!forecast) return null;

  const days = mapWeeklyForecast(forecast);
  if (!days.length) return null;

  return (
    <section className="forecast">
      <p className="forecast__title">Previsão da semana</p>

      <div className="forecast__card">
        {days.map((day, index) => {
          const Icon = day.Icon;

          return (
            <div className="forecast__card-iten" key={index}>
              <p className="forecast__card-title">{day.name}</p>
        {Icon ? React.createElement(Icon, { className: "forecast__card-image", alt: day.name }) : null}

              <p className="forecast__card-temp">{day.temp}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;
