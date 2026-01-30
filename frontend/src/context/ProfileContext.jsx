import { createContext, useMemo, useState, useEffect } from "react";

export const ProfileContext = createContext(null);

const DEFAULT_PROFILE = {
  username: "",
  avatar: "", // base64 ou URL
};

export function ProfileProvider({ children, userId }) {
  const profileKey = userId ? `profile_${userId}` : "profile";

  const [profileState, setProfileState] = useState(() => {
    try {
      const raw = localStorage.getItem(profileKey);
      return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const setProfile = (updater) => {
    setProfileState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        localStorage.setItem(profileKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const value = useMemo(() => ({ profile: profileState, setProfile }), [profileState]);
  // reload profile when userId/profileKey changes
  useEffect(() => {
    try {
      // migrate legacy global `profile` to namespaced `profile_<userId>` when needed
      if (userId && !localStorage.getItem(profileKey)) {
        const legacy = localStorage.getItem("profile");
        if (legacy) {
          localStorage.setItem(profileKey, legacy);
          // keep or remove legacy; remove to avoid duplication
          localStorage.removeItem("profile");
        }
      }

      const raw = localStorage.getItem(profileKey);
      setProfileState(raw ? JSON.parse(raw) : DEFAULT_PROFILE);
    } catch {
      setProfileState(DEFAULT_PROFILE);
    }
  }, [profileKey]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

