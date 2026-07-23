import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("pp_authenticated") === "true"
  );
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pp_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData = { name: "Ayan Sharma", email: "ayan@example.com" }) => {
    localStorage.setItem("pp_authenticated", "true");
    localStorage.setItem("pp_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("pp_authenticated");
    localStorage.removeItem("pp_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
