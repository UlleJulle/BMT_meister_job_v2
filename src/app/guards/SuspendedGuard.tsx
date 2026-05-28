import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../constants/routes";
import { useAuthSession } from "../../features/auth/useAuthSession";

type SuspendedGuardProps = {
  children: ReactNode;
};

export function SuspendedGuard({ children }: SuspendedGuardProps) {
  const session = useAuthSession();
  const location = useLocation();

  if (session.isAuthenticated && session.status === "suspended") {
    return <Navigate replace to={`${routes.suspended}${location.search}`} />;
  }

  return <>{children}</>;
}
