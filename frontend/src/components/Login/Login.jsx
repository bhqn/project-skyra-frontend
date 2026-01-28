import { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/login-image.webp"
import "./Login.css"
const Login = ({handleLogin}) => {
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  
  return (
    <div className="login">
        <img src={LoginImage} className="Login__img"></img>
      <form className="login__form"  onSubmit={handleSubmit}>
        <h1 className="login__welcome">Entrar</h1>
        <input
          className="login__input"
          placeholder="E-mail"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          className="login__input login__input-password"
          placeholder="Senha"
          id="password"
          name="password"
          type="password"
          value={data.password}
           onChange={handleChange}
        />

        <div className="login__button-container">
          <button type="submit" className="login__link">
           Entrar
          </button>
        </div>

        <div className="login__signin">
          <p>Ainda não é membro?</p>
          <Link to="/register" className="login__login-link">
            Inscreva-se aqui!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;