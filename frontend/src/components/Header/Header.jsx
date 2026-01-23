import "./Header.css";
import userimage from "../../assets/usericon.svg";
import SearchIcon from "../../assets/Search.svg";


function Header({ userData }) {
  return (
    <header className="header">
      <img className="logo" src={userimage} alt="logo around" />
      <div className="header__container">
        <div className="header__container_text">
          {" "}
          <p className="header__text">Olá,</p>
          <p className="header__username">{userData.username}</p>
        </div>
         <div className="header__search">
      <img src={SearchIcon} alt="Search" className="search-icon" />
      <input type="text" placeholder="Localizar" />
    </div>
      </div>
    </header>
  );
}

export default Header;
