import { apiClient } from "../api/apiClient";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../types/auth.types";

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async refresh(): Promise<{ success: boolean; data: { accessToken: string } }> {
    return apiClient("/auth/refresh", {
      method: "POST",
    });
  },

  async logout(): Promise<void> {
    await apiClient("/auth/logout", {
      method: "POST",
    });
  },
};