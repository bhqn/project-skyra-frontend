import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </BrowserRouter>
  </StrictMode>
);
