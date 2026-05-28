import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getHomeRouteForRole } from "../../features/auth/authRouting";
import { useAuthSession } from "../../features/auth/useAuthSession";
import type { UserRole } from "../../types/auth";

type RoleGuardProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const session = useAuthSession();
  const location = useLocation();

  if (session.state !== "active") {
    return <>{children}</>;
  }

  if (!allowedRoles.includes(session.user.role)) {
    return <Navigate replace to={`${getHomeRouteForRole(session.user.role)}${location.search}`} />;
  }

  return <>{children}</>;
}
