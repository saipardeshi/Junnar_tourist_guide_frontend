import { createContext, useContext, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const name   = localStorage.getItem("name");
    const token  = localStorage.getItem("token");
    const role   = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    return name && token ? { name, token, role, userId } : null;
  });

  const login = async (email, password) => {
    try {
      const res = await apiLogin({ email, password });
      localStorage.setItem("token",  res.data.token);
      localStorage.setItem("name",   res.data.name);
      localStorage.setItem("role",   res.data.role || "USER");
      localStorage.setItem("userId", res.data.id ?? "");
      setUser({ name: res.data.name, token: res.data.token, role: res.data.role || "USER", userId: res.data.id ?? null });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await apiRegister({ name, email, password });
      localStorage.setItem("token",  res.data.token);
      localStorage.setItem("name",   res.data.name);
      localStorage.setItem("role",   res.data.role || "USER");
      localStorage.setItem("userId", res.data.id ?? "");
      setUser({ name: res.data.name, token: res.data.token, role: res.data.role || "USER", userId: res.data.id ?? null });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);