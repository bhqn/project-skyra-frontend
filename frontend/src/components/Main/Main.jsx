import "./Main.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherCurrent from "./components/Weathercurrent/Weathercurrent"






function Main() {
  return (
    <>
    <main className="main">
     <Sidebar></Sidebar>
     <WeatherCurrent></WeatherCurrent>

    
    </main>
    </>
  );
}

export default Main;
