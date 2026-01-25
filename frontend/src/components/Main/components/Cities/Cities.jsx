import CitiesImage from "../../../../assets/sunny.svg"; 
import "./Cities.css"; 

const cities = [
  { image: CitiesImage, name: "São Paulo, SP",weather: "Ensolarado" ,temp: "26°C" },
  { image: CitiesImage, name: "Rio de Janeiro, RJ",weather: "Ensolarado", temp: "29°C" },
  { image: CitiesImage, name: "Belo Horizonte, MG",weather: "Ensolarado", temp: "24°C" },
  { image: CitiesImage, name: "Curitiba, PR", weather: "Ensolarado", temp: "18°C" },
];

function Cities() {
  return (
    <section className="cities__section">
      <p className="cities__title">Outras Cidades</p>
      <div className="cities__carousel">
        {cities.map((city, index) => (
          <div className="cities__card" key={index}>
            <img src={city.image} alt="sol" className="cities__image" />
            <div className="cities__wrap">
                <div className="cities__content">
              <p className="cities__name">{city.name}</p>
              <p className="cities__weather">{city.weather}</p>
              </div>
              <p className="cities__temp">{city.temp}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cities;
