import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const SESSION_KEY = "admin_session";
const PASS_KEY = "admin_pass";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) return false;
    const { expiry } = JSON.parse(session);
    return Date.now() < expiry;
  });

  const [adminUsername, setAdminUsername] = useState<string | null>(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) return null;
    return JSON.parse(session).username || null;
  });

  const login = useCallback((username: string, password: string) => {
    const storedPass = localStorage.getItem(PASS_KEY) || "admin123";
    if (username === "admin" && password === storedPass) {
      const session = { username, expiry: Date.now() + 3600000 };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      setAdminUsername(username);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setAdminUsername(null);
  }, []);

  const changePassword = useCallback((oldPassword: string, newPassword: string) => {
    const storedPass = localStorage.getItem(PASS_KEY) || "admin123";
    if (oldPassword === storedPass) {
      localStorage.setItem(PASS_KEY, newPassword);
      return true;
    }
    return false;
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUsername, login, logout, changePassword }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
