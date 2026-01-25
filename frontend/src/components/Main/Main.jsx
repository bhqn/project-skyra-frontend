import "./Main.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherCurrent from "./components/Weathercurrent/Weathercurrent"
import Forecast from "./components/Forecast/Forecast";
import Cities from "./components/Cities/Cities";






function Main() {
  return (
    <>
    <main className="main">
     <Sidebar></Sidebar>
     <WeatherCurrent></WeatherCurrent>
     <div className="main__wrap">
     <Forecast></Forecast>
     <Cities></Cities>
     </div>
    
    </main>
    </>
  );
}

export default Main;
