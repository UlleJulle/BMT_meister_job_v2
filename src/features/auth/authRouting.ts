import { routes } from "../../constants/routes";
import type { AuthSession, UserRole } from "../../types/auth";

export function getHomeRouteForRole(role: UserRole) {
  switch (role) {
    case "student":
      return routes.student.root;
    case "general_teacher":
      return routes.teacher.root;
    case "employment_teacher":
      return routes.employment.root;
    case "admin":
      return routes.admin.root;
  }
}

export function getRedirectRouteForSession(session: AuthSession) {
  if (!session.isAuthenticated) {
    return routes.login;
  }

  if (session.status === "pending") {
    return routes.pending;
  }

  if (session.status === "suspended") {
    return routes.suspended;
  }

  return getHomeRouteForRole(session.user.role);
}
