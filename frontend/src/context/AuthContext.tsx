import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { apiClient } from "../api/apiClient";
import { authService } from "../services/auth.services";
import type { User } from "../types/auth.types";

interface CurrentUserResponse {
  success: boolean;
  data: {
    user: User;
  };
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuth = useCallback((user: User, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get a new access token using the HttpOnly refresh cookie
      const refreshResponse = await authService.refresh();

      const newAccessToken = refreshResponse.data.accessToken;

      setAccessToken(newAccessToken);

      // Get the currently authenticated user
      const userResponse = await apiClient<CurrentUserResponse>(
        "/users/me",
        {
          method: "GET",
          authToken: newAccessToken,
        },
      );

      setUser(userResponse.data.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  const value: AuthContextValue = {
    user,
    accessToken,
    isLoading,
    isAuthenticated: user !== null,
    refreshAuth,
    setAuth,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};