import { create } from "zustand";
import { api } from "@/lib/api";

interface User {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, orgName: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const res = await api.post<{ access_token: string }>("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.access_token);
    api.setToken(res.access_token);
    set({ token: res.access_token, isAuthenticated: true });
  },

  signup: async (email: string, password: string, fullName: string, orgName: string) => {
    const res = await api.post<{ access_token: string }>("/auth/signup", {
      email,
      password,
      full_name: fullName,
      org_name: orgName,
    });
    localStorage.setItem("token", res.access_token);
    api.setToken(res.access_token);
    set({ token: res.access_token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  setToken: (token: string) => {
    api.setToken(token);
    set({ token, isAuthenticated: true });
  },
}));
