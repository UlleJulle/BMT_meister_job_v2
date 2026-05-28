import { useAuth } from "./useAuth";
import type { PermissionAction, PermissionDomain } from "../constants/permissions";

export function useRole() {
  const { role } = useAuth();

  function can(_domain: PermissionDomain, _action: PermissionAction) {
    return role === "admin" || role === "master";
  }

  return { role, can };
}
