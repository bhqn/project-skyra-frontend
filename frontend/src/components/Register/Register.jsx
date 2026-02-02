import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import RegisterImage from "../../assets/login-image.webp";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log("handleSubmit chamado — state atual:", data);
    if (!data.email || !data.password || !data.username) {
      console.log("Preencha todos os campos");
      return;
    }

    if (data.password !== data.confirmPassword) {
      console.log("As senhas não coincidem");
      return;
    }

    // chama o handler recebido via props com o objeto de dados
    handleRegistration && handleRegistration(data);
  };

  

  return (
    <div className="register">
      <img src={RegisterImage} className="Login__img"></img>
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__welcome">Inscreva-se</h1>
        <input
          className="register__input"
          placeholder="Nome"
          id="username"
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
        />
        <input
          className="register__input"
          placeholder="E-mail"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          className="register__input register__input-password"
          placeholder="Senha"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />

        <input
          className="register__input register__input-confirm-password"
          placeholder="Confirmar senha"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={data.confirmPassword}
          onChange={handleChange}
        />

        <div className="register__button-container">
          <button type="submit" className="register__link">
            Inscreva-se
          </button>
        </div>

        <div className="register__signin">
          <p>Já é um membro? </p>
          <Link to="/login" className="register__login-link">
            Faça o login aqui!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
