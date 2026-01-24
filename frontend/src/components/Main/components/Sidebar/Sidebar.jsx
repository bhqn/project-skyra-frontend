import "./Sidebar.css"
import HomeIcon from "../../../../assets/home.svg?react";
import AboutIcon from "../../../../assets/about.svg?react";
import SettingsIcon from "../../../../assets/Settings.svg?react";
import ExitIcon from "../../../../assets/exit.svg?react";

function Sidebar() {
  return (
    <section className="sidebar">
      <div className="sidebar__container">
        <button className="sidebar__button" aria-label="Home">
          <HomeIcon className="sidebar__icon" />
        </button>

        <button className="sidebar__button" aria-label="About">
          <AboutIcon className="sidebar__icon" />
        </button>

        <button className="sidebar__button" aria-label="Settings">
          <SettingsIcon className="sidebar__icon" />
        </button>

        <button className="sidebar__button" aria-label="Exit">
          <ExitIcon className="sidebar__icon" />
        </button>
      </div>
    </section>
  );
}

export default Sidebar;
