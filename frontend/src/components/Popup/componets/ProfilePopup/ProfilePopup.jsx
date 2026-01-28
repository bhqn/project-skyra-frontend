import "./ProfilePopup.css";

export default function ProfilePopup({ onSubmit, values, onChange, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.();
  }

  return (
    <div className="profilePopup">
      <div className="profilePopup__avatarWrap">
        <div className="profilePopup__avatar">
          <svg width="76" height="76" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="32" cy="26" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M18 49c3.5-7 24.5-7 28 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <button className="profilePopup__changePhoto" type="button">
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
