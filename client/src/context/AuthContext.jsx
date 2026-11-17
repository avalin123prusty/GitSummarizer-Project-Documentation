import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, logoutUser, registerUser } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("gitsummarizer.token") || null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("gitsummarizer.user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Guest session does not need remote token validation
      if (token === "guest-token") {
        setLoading(false);
        return;
      }

      try {
        const profile = await getMe();
        if (profile) {
          setUser(profile);
          localStorage.setItem("gitsummarizer.user", JSON.stringify(profile));
        }
      } catch {
        // Token expired or invalid
        setToken(null);
        setUser(null);
        localStorage.removeItem("gitsummarizer.token");
        localStorage.removeItem("gitsummarizer.user");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const result = await loginUser(credentials);
    if (result?.token) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem("gitsummarizer.token", result.token);
      localStorage.setItem("gitsummarizer.user", JSON.stringify(result.user));
    }
    return result;
  };

  const register = async (userData) => {
    const result = await registerUser(userData);
    if (result?.token) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem("gitsummarizer.token", result.token);
      localStorage.setItem("gitsummarizer.user", JSON.stringify(result.user));
    }
    return result;
  };

  const continueAsGuest = () => {
    const guestUser = {
      id: "guest-user",
      name: "Guest Explorer",
      email: "guest@gitsummarizer.local",
      isGuest: true,
    };
    setToken("guest-token");
    setUser(guestUser);
    localStorage.setItem("gitsummarizer.token", "guest-token");
    localStorage.setItem("gitsummarizer.user", JSON.stringify(guestUser));
    return guestUser;
  };

  const logout = async () => {
    if (token && token !== "guest-token") {
      await logoutUser();
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("gitsummarizer.token");
    localStorage.removeItem("gitsummarizer.user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token && user),
        loading,
        login,
        register,
        continueAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
