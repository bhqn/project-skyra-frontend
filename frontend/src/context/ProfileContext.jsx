import { createContext, useMemo, useState } from "react";

export const ProfileContext = createContext(null);

const DEFAULT_PROFILE = {
  username: "",
  avatar: "", // base64 ou URL
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem("profile");
      return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const value = useMemo(
    () => ({ profile, setProfile }),
    [profile]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}
