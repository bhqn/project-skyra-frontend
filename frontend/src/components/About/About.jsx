import "./About.css";
import skyraImg from "../../assets/login-image.webp";
import Sidebar from "../Main/components/Sidebar/Sidebar.jsx";
function About({ signOut, onOpenProfile}) {
  return (
    <>
      <section className="about">
        <Sidebar onOpenProfile={onOpenProfile} signOut={signOut} />
        <img className="about__image" src={skyraImg} alt="Skyra" />
        <div className="about__card">
          <div className="about__content">
            <h1 className="about__title">SKYRA</h1>
            <p className="about__text">
              Este site de clima foi desenvolvido como projeto final da
              TripleTen, com o objetivo de consolidar os conhecimentos
              adquiridos ao longo do curso.Todo o projeto foi desenvolvido por
              mim, abrangendo frontend e backend, desde a interface até a lógica
              de consumo de dados.As informações meteorológicas são obtidas em
              tempo real por meio da API OpenWeatherMap, permitindo a exibição
              de dados atualizados como temperatura, condições climáticas e
              previsões. O foco do projeto foi criar uma aplicação funcional,
              com UI moderna, boa experiência do usuário e integração eficiente
              com serviços externos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;
