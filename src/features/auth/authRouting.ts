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
  switch (session.state) {
    case "pending":
      return routes.pending;
    case "suspended":
      return routes.suspended;
    case "active":
      return getHomeRouteForRole(session.user.role);
    case "anonymous":
    case "error":
      return routes.login;
    default:
      return null;
  }
}
