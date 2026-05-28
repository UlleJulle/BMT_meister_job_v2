import { useLocation } from "react-router-dom";
import { mockAuthUser } from "../../mocks/authUser";
import type { AuthSession, UserRole, UserStatus } from "../../types/auth";

const roleSet = new Set<UserRole>(["student", "general_teacher", "employment_teacher", "admin"]);
const statusSet = new Set<UserStatus>(["anonymous", "pending", "active", "suspended"]);

function getOverrideFromLocation() {
  if (typeof window === "undefined" || !import.meta.env.DEV) {
    return {};
  }

  // DEV-only route guard testing override
  // Remove or replace when Firebase Auth is connected
  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get("mockRole");
  const statusParam = params.get("mockStatus");
  const anonymousParam = params.get("mockAnonymous");

  return {
    role: roleParam && roleSet.has(roleParam as UserRole) ? (roleParam as UserRole) : undefined,
    status:
      statusParam && statusSet.has(statusParam as UserStatus)
        ? (statusParam as UserStatus)
        : anonymousParam === "1"
          ? "anonymous"
          : undefined,
  };
}

export function useAuthSession(): AuthSession {
  useLocation();

  const overrides = getOverrideFromLocation();
  const status = overrides.status ?? mockAuthUser.status;

  if (status === "anonymous") {
    return {
      isAuthenticated: false,
      status: "anonymous",
      user: null,
    };
  }

  const user = {
    ...mockAuthUser,
    role: overrides.role ?? mockAuthUser.role,
    status,
  };

  return {
    isAuthenticated: true,
    status: user.status,
    user,
  };
}
