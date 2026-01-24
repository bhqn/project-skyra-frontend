import "./Main.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherCurrent from "./components/Weathercurrent/Weathercurrent"
import Forecast from "./components/Forecast/Forecast";






function Main() {
  return (
    <>
    <main className="main">
     <Sidebar></Sidebar>
     <WeatherCurrent></WeatherCurrent>
     <Forecast></Forecast>

    
    </main>
    </>
  );
}

export default Main;
