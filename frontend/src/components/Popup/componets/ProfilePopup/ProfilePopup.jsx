import { useContext, useRef } from "react";
import "./ProfilePopup.css";
import { ProfileContext } from "../../../../context/ProfileContext";
import userImage from "../../../../assets/usericon.svg";

export default function ProfilePopup({ onSubmit, values, onChange, onClose }) {
  const { profile, setProfile } = useContext(ProfileContext);
  const fileRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    // salvar username no contexto
    if (values?.username) {
      setProfile((prev) => {
        const next = { ...prev, username: values.username };
        localStorage.setItem("profile", JSON.stringify(next));
        return next;
      });
    }

    onSubmit?.();
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => {
        const next = { ...prev, avatar: reader.result };
        localStorage.setItem("profile", JSON.stringify(next));
        return next;
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="profilePopup">
      <div className="profilePopup__avatarWrap">
        <div className="profilePopup__avatar">
         <img className="profilePopup__image" src={profile?.avatar || userImage} alt="logo around" />
        </div>

        {/* input escondido */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />

        <button
          className="profilePopup__changePhoto"
          type="button"
          onClick={() => fileRef.current?.click()}
        >
          alterar foto
        </button>
      </div>

      <form className="profilePopup__form" onSubmit={handleSubmit}>
        <input
          className="profilePopup__input"
          name="username"
          placeholder="Nome do Usuário"
          value={values?.username ?? ""}
          onChange={onChange}
        />

        <input
          className="profilePopup__input"
          name="password"
          type="password"
          placeholder="Alterar senha"
          value={values?.password ?? ""}
          onChange={onChange}
        />

        <input
          className="profilePopup__input"
          name="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
          value={values?.confirmPassword ?? ""}
          onChange={onChange}
        />

        <button className="profilePopup__btn" type="submit">
          Clique aqui!
        </button>
      </form>
    </div>
  );
}
