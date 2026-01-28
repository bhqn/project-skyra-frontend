import "./Popup.css"
import { useState } from "react";
import ProfilePopup from "./componets/ProfilePopup/ProfilePopup";
export default function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const {onClose} = props;

  return (
    <div className="popup">
      <div
        className="popup__content"
        onClick={e => e.stopPropagation()}
      >
        <button
          aria-label="Close Popup"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
       <ProfilePopup 
        open={isOpen} 
        values={form}
        onChange={(e) =>
          setForm({ ...form, [e.target.name]: e.target.value })
        }
        onSubmit={() => {
          console.log("submit", form);
          setIsOpen(false);
        }}
        onClose={onClose}
        />
      </div>
    </div>
  );
}