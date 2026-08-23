import { createContext, useContext, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const name  = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    return name && token ? { name, token, role } : null;
  });

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name",  res.data.name);
    localStorage.setItem("role",  res.data.role || "USER");
    setUser({ name: res.data.name, token: res.data.token, role: res.data.role || "USER" });
  };

  const register = async (name, email, password) => {
    const res = await apiRegister({ name, email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name",  res.data.name);
    localStorage.setItem("role",  res.data.role || "USER");
    setUser({ name: res.data.name, token: res.data.token, role: res.data.role || "USER" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);