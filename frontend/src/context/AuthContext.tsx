import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getApiUrl } from "@/config/api";

// ── Types ──────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
  updateUser: (user: User) => void;
}

// ── Context ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  /**
   * Try to refresh access token using httpOnly refresh cookie.
   * Returns true if successful.
   */
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(getApiUrl("/auth/refresh"), {
        method: "POST",
        credentials: "include", // sends the httpOnly cookie
      });

      if (!res.ok) return false;

      const data = await res.json();
      const newToken = data.data?.accessToken;
      if (!newToken) return false;

      setAccessToken(newToken);

      // Fetch user profile
      const userRes = await fetch(getApiUrl("/auth/me"), {
        headers: { Authorization: `Bearer ${newToken}` },
        credentials: "include",
      });

      if (!userRes.ok) return false;

      const userData = await userRes.json();
      setUser(userData.data?.user ?? null);
      return true;
    } catch {
      return false;
    }
  }, []);

  // On mount: attempt to restore session via refresh token cookie
  useEffect(() => {
    refreshAuth().finally(() => setIsLoading(false));
  }, [refreshAuth]);

  const login = async (email: string, password: string): Promise<void> => {
    const res = await fetch(getApiUrl("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setUser(data.data.user);
    setAccessToken(data.data.accessToken);
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ): Promise<void> => {
    const res = await fetch(getApiUrl("/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const err = Object.assign(new Error(data.message || "Registration failed"), {
        field: data.field,
        errors: data.errors,
      });
      throw err;
    }

    setUser(data.data.user);
    setAccessToken(data.data.accessToken);
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(getApiUrl("/auth/logout"), {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshAuth,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ───────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
