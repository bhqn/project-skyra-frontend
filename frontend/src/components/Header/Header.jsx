import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import "./Header.css";
import userImage from "../../assets/usericon.jpg";
import SearchIcon from "../../assets/Search.svg";
import CapitalAutocomplete from "../AutoComplete/CapitalAutocomplete";

function Header({ onSelectCapital }) {
  const { profile } = useContext(ProfileContext);

  console.log("profileKey user:", profile);
console.log("localStorage profile:", localStorage.getItem("profile"));
console.log("localStorage profile_user:", localStorage.getItem(`profile_${profile?._id}`));

  return (
    <header className="header">
      <div className="header__avatar-container">
      <img className="header__avatar" src={profile?.avatar || userImage} alt="logo around" />
      </div>
      <div className="header__container">
        <div className="header__container_text">
          <p className="header__text">Olá,</p>
          <p className="header__username">{profile?.username || "Visitante"}</p>
        </div>

        <div className="header__search">
          <img src={SearchIcon} alt="Search" className="search-icon" />
          <CapitalAutocomplete onSelect={onSelectCapital} type="text" placeholder="Localizar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
