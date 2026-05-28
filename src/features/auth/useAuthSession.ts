import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { mockAuthUser } from "../../mocks/authUser";
import type { AuthSession, AuthUserBase, UserRole, UserStatus } from "../../types/auth";
import { AuthSessionContext } from "./AuthSessionContext";

const roleSet = new Set<UserRole>(["student", "general_teacher", "employment_teacher", "admin"]);
const statusSet = new Set<UserStatus>(["anonymous", "pending", "active", "suspended"]);

function getBaseUser(session: AuthSession): AuthUserBase {
  switch (session.state) {
    case "active":
    case "pending":
    case "suspended":
      return session.user;
    case "authenticated_user_doc_loading":
      return session.authUser;
    default:
      return {
        uid: mockAuthUser.uid,
        email: mockAuthUser.email,
        displayName: mockAuthUser.displayName,
      };
  }
}

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

function applyOverride(session: AuthSession): AuthSession {
  const overrides = getOverrideFromLocation();

  if (!overrides.role && !overrides.status) {
    return session;
  }

  if (overrides.status === "anonymous") {
    return {
      state: "anonymous",
      isAuthenticated: false,
      status: "anonymous",
      user: null,
    };
  }

  const baseUser = getBaseUser(session);
  const status = overrides.status ?? "active";

  if (status === "pending") {
    return {
      state: "pending",
      isAuthenticated: true,
      status: "pending",
      user: baseUser,
      reason: "pending_status",
    };
  }

  if (status === "suspended") {
    return {
      state: "suspended",
      isAuthenticated: true,
      status: "suspended",
      user: {
        ...baseUser,
        role: overrides.role,
        schoolId: mockAuthUser.schoolId,
      },
    };
  }

  if (overrides.role) {
    return {
      state: "active",
      isAuthenticated: true,
      status: "active",
      user: {
        ...baseUser,
        role: overrides.role,
        status: "active",
        schoolId: mockAuthUser.schoolId,
      },
    };
  }

  return session;
}

export function useAuthSession(): AuthSession {
  useLocation();

  const session = useContext(AuthSessionContext);

  if (!session) {
    throw new Error("useAuthSession must be used within AuthProvider");
  }

  return applyOverride(session);
}
