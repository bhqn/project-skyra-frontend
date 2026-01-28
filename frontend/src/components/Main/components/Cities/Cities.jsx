import Delete from "../../../../assets/delete.svg";
import "./Cities.css";
import { weatherIconMap } from "../../../../utils/weatherMapIcon";
import React from "react";

function Cities({ cities = [], onAddCity, onRemoveCity, weather, capital, onSelectCity}) {
  const handleDeleteClick = (uf) => {
    onRemoveCity(uf);
  };

  const handleAddCard = () => {
    if (capital && weather) {
      onAddCity(capital, weather);
    }
  };

  return (
    <section className="cities__section">
      <p className="cities__title">Outras Cidades</p>
      <div className="cities__carousel">
        {cities.map((city) => (
          <button
            className="cities__card"
            key={`${city.uf ?? "??"}-${city.lat ?? "x"}-${city.lon ?? "y"}`}
            type="button"
            onClick={() => onSelectCity(city)}
          >
            <img
              src={Delete}
              alt="delete"
              className="cities__delete"
              onClick={() => handleDeleteClick(city.uf)}
            />
            <div className="cities__wrap">
              {weatherIconMap[city.iconCode] &&
                React.createElement(weatherIconMap[city.iconCode], {
                  className: "cities__image",
                })}
              <div className="cities__content">
                <p className="cities__name">{city.nome}</p>
                <p className="cities__weather">{city.description}</p>
              </div>

              <p className="cities__temp">{city.temp}°C</p>
            </div>
          </button>
        ))}
      </div>
      <button className="cities__add-btn" onClick={handleAddCard}>
        {" "}
        +{" "}
      </button>
    </section>
  );
}

export default Cities;
