import "./Sidebar.css";
import HomeIcon from "../../../../assets/home.svg?react";
import AboutIcon from "../../../../assets/about.svg?react";
import SettingsIcon from "../../../../assets/Settings.svg?react";
import ExitIcon from "../../../../assets/exit.svg?react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ onOpenProfile, signOut }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAbout = location.pathname === "/about";

  return (
    <section className="sidebar">
      <div className="sidebar__container">

        <button
          className="sidebar__button"
          aria-label="Home"
          onClick={() => navigate("/")}
        >
          <HomeIcon className="sidebar__icon" />
        </button>

        <button
          className="sidebar__button"
          aria-label="About"
          onClick={() => navigate("/about")}
        >
          <AboutIcon className="sidebar__icon" />
        </button>

        {/* SETTINGS DESABILITADO NO ABOUT */}
        <button
          className="sidebar__button"
          aria-label="Settings"
          onClick={!isAbout ? onOpenProfile : undefined}
          disabled={isAbout}
          style={{ opacity: isAbout ? 0.4 : 1, cursor: isAbout ? "not-allowed" : "pointer" }}
        >
          <SettingsIcon className="sidebar__icon" />
        </button>

        <button
          className="sidebar__button"
          aria-label="Exit"
          onClick={signOut}
        >
          <ExitIcon className="sidebar__icon" />
        </button>

      </div>
    </section>
  );
}

export default Sidebar;
