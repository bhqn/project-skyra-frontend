import "./Main.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherCurrent from "./components/Weathercurrent/Weathercurrent"
import Forecast from "./components/Forecast/Forecast";
import Cities from "./components/Cities/Cities";






function Main({weather, forecast, savedCities, onAddCity, onRemoveCity, capital,  onSelectCity}) {
  return (
    <>
    <main className="main">
     <Sidebar/>
     <WeatherCurrent weather={weather} forecast={forecast} />
     <div className="main__wrap">
     <Forecast weather={weather} forecast={forecast} 
     />
     <Cities 
     onAddCity={onAddCity} 
     cities={savedCities} 
     onRemoveCity={onRemoveCity} 
     weather={weather} 
     capital={capital}
     onSelectCity={onSelectCity}
     />
     
     </div>
    
    </main>
    </>
  );
}

export default Main;
