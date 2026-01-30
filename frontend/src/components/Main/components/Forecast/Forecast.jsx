import "./Forecast.css";
import mapWeeklyForecast from "../../../../utils/mapWeeklyForecast";

function Forecast({ forecast, selectedDayKey, onSelectDay }) {
  if (!forecast) return null;

  const days = mapWeeklyForecast(forecast);
  if (!days.length) return null;

  return (
    <section className="forecast">
      <p className="forecast__title">Previsão da semana</p>

      <div className="forecast__card">
        {days.map((day) => {
          const iconSrc = day.Icon;

          return (
            <button
              key={day.dayKey}
              type="button"
              onClick={() => onSelectDay?.(day.dayKey)}
              className={
                "forecast__card-iten" +
                (day.dayKey === selectedDayKey
                  ? " forecast__card-iten--active"
                  : "")
              }
            >
              <p className="forecast__card-title">{day.name}</p>

              {iconSrc && (
                <img
                  src={iconSrc}
                  className="forecast__card-image"
                  alt={day.name}
                />
              )}

              <p className="forecast__card-temp">{day.temp}°C</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;
