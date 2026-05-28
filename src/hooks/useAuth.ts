import { create } from "zustand";
import type { SystemRole } from "../types/role";

type AuthUser = {
  uid: string;
  email?: string;
  displayName?: string;
};

type AuthState = {
  user: AuthUser | null;
  role: SystemRole;
  isLoading: boolean;
};

const useAuthStore = create<AuthState>(() => ({
  user: null,
  role: "anonymous",
  isLoading: false,
}));

export function useAuth() {
  return useAuthStore();
}
