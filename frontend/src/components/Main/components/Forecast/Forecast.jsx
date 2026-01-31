import "./Forecast.css";
import { weatherIconMap } from "../../../../utils/weatherMapIcon";
import Ensolarado from "../../../../assets/pngs/ensolarado.png";

function Forecast({ days = [], selectedDayKey, onSelectDay }) {
  if (!days.length) return null;

  return (
    <section className="forecast">
      <p className="forecast__title">Previsão da semana</p>

      <div className="forecast__card">
        {days.map((day) => {
          const iconSrc = weatherIconMap[day.iconCode] || Ensolarado;

          // Se você já manda day.name pronto, usa ele.
          // Se não mandar, calcula pelo dayKey:
          const dayName =
            day.name ||
            new Date(day.dayKey).toLocaleDateString("pt-BR", {
              weekday: "short",
            });

          return (
            <button
              key={day.dayKey}
              type="button"
              onClick={() => {
                console.log("clicou dayKey:", day.dayKey);
                onSelectDay?.(day.dayKey);
              }}
              className={
                "forecast__card-iten" +
                (day.dayKey === selectedDayKey
                  ? " forecast__card-iten--active"
                  : "")
              }
            >
              <p className="forecast__card-title">{dayName}</p>

              <img
                src={iconSrc}
                className="forecast__card-image"
                alt={day.description || dayName}
                draggable="false"
              />

              <p className="forecast__card-temp">{day.temp}°C</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;
