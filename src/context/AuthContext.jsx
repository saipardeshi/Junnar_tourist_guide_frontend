import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister, getProfile } from "../services/api";

const AuthContext = createContext();

// Persist the session returned by /auth/login and /auth/register.
function storeSession({ token, name, role, id }) {
  localStorage.setItem("token",  token);
  localStorage.setItem("name",   name ?? "");
  localStorage.setItem("role",   role || "USER");
  localStorage.setItem("userId", id ?? "");
}

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const name   = localStorage.getItem("name");
    const token  = localStorage.getItem("token");
    const role   = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    return name && token ? { name, token, role, userId } : null;
  });

  // Re-validate the saved session against the server once per token. This
  //  - refreshes role/userId for sessions saved before the backend returned them
  //    (otherwise admins would have to log out and back in to see the dashboard),
  //  - picks up role changes (e.g. a user promoted to admin), and
  //  - logs the user out if the token has expired or the account no longer exists.
  // Network errors (e.g. the backend is cold-starting) are ignored on purpose.
  useEffect(() => {
    if (!user?.token) return;
    let cancelled = false;
    getProfile()
      .then((res) => {
        if (cancelled) return;
        const { id, name, role } = res.data;
        const fresh = { name: name ?? "", role: role || "USER", userId: id ?? null };
        localStorage.setItem("name",   fresh.name);
        localStorage.setItem("role",   fresh.role);
        localStorage.setItem("userId", fresh.userId ?? "");
        setUser((prev) =>
          prev && prev.name === fresh.name && prev.role === fresh.role && prev.userId === fresh.userId
            ? prev
            : prev && { ...prev, ...fresh }
        );
      })
      .catch((error) => {
        if (cancelled) return;
        if (error?.response?.status === 401) {
          clearSession();
          setUser(null);
        }
      });
    return () => { cancelled = true; };
  }, [user?.token]);

  const login = async (email, password) => {
    try {
      const res = await apiLogin({ email, password });
      storeSession(res.data);
      setUser({ name: res.data.name, token: res.data.token, role: res.data.role || "USER", userId: res.data.id ?? null });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await apiRegister({ name, email, password });
      storeSession(res.data);
      setUser({ name: res.data.name, token: res.data.token, role: res.data.role || "USER", userId: res.data.id ?? null });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
