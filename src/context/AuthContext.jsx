import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails, loginUser } from "../lib/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadUser() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const { user } = await getUserDetails();
      setUser(user);
    } catch {
      localStorage.removeItem("access_token");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function login(email, password) {
    const { access } = await loginUser({ email, password });
    localStorage.setItem("access_token", access);
    const { user } = await getUserDetails();
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
