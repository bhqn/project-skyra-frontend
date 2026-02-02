import Delete from "../../../../assets/delete.svg";
import "./Cities.css";
import { weatherIconMap } from "../../../../utils/weatherMapIcon";

function Cities({
  cities = [],
  onAddCity,
  onRemoveCity,
  weather,
  capital,
  onSelectCity,
  activeCityUf,
}) {

  const handleDeleteClick = (id) => {
    onRemoveCity(id);
  };

  const handleAddCard = () => {
    if (capital && weather) {
      onAddCity(capital, weather);
    }
  };

  const canAdd = capital?.uf && !cities.some((c) => c.uf === capital.uf);
  return (
    <section className="cities__section">
      <p className="cities__title">Favoritos</p>
      <div className="cities__carousel">
       {cities.map((city) => (
  <button
    className={`cities__card ${
      city.uf === activeCityUf ? "cities__card--active" : ""
    }`}
    key={city._id}
    type="button"
    onClick={() => onSelectCity(city)}
  >
    <img
      src={Delete}
      alt="delete"
      className="cities__delete"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteClick(city._id);
      }}
    />

    <div className="cities__wrap">
      {weatherIconMap[city.iconCode] && (
        <img
          src={weatherIconMap[city.iconCode]}
          className="cities__image"
          alt={city.description}
        />
      )}

      <div className="cities__content">
        <p className="cities__name">
          {city.nome}, {city.uf}
        </p>
        <p className="cities__weather">{city.description}</p>
      </div>

      <p className="cities__temp">{city.temp}°C</p>
    </div>
  </button>
))}

      </div>
      <button
        className={`cities__add-btn ${canAdd ? "cities__add-btn--active" : ""}`}
  onClick={handleAddCard}
  disabled={!canAdd}
      >
        {" "}
        +{" "}
      </button>
    </section>
  );
}

export default Cities;
