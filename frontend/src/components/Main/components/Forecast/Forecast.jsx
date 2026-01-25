import "./Forecast.css";
import ForecastImage from "../../../../assets/sunny.svg"; // use import normal para SVG

const days = [
  { name: "Segunda", image: ForecastImage, temp: "26°C" },
  { name: "Terça", image: ForecastImage, temp: "29°C" },
  { name: "Quarta", image: ForecastImage, temp: "24°C" },
  { name: "Quinta", image: ForecastImage, temp: "18°C" },
  { name: "Sexta", image: ForecastImage, temp: "18°C" },
  { name: "Sábado", image: ForecastImage, temp: "18°C" },
  { name: "Domingo", image: ForecastImage, temp: "18°C" },
];

function Forecast() {
  return (
    <section className="forecast">
      <p className="forecast__title">Previsão da semana</p>
      <div className="forecast__card">
        {days.map((day, index) => (
          <div className="forecast__card-iten" key={index}>
            <p className="forecast__card-title">{day.name}</p>
            <img
              src={day.image}
              alt={day.name}
              className="forecast__card-image"
            />
            <p className="forecast__card-temp">{day.temp}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
