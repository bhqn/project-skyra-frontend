import "./Main.css";
import homeIcon from "../../assets/home.svg";
import aboutIcon from "../../assets/about.svg";
import settingsIcon from "../../assets/Settings.svg";
import exitIcon from "../../assets/exit.svg";
function Main() {
  return (
    <main className="main">
      <section className="sidebar">
        <div className="sidebar__container">
          <button className="sidebar__button">
            <img src={homeIcon} alt="home" />
          </button>
          <button className="sidebar__button">
            <img src={aboutIcon} alt="about" />
          </button>
          <button className="sidebar__button">
            <img src={settingsIcon} alt="Settings" />
          </button>
          <button className="sidebar__button">
            <img src={exitIcon} alt="exit" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Main;
