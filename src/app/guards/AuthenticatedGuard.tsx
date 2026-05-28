import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../constants/routes";
import { useAuthSession } from "../../features/auth/useAuthSession";

type AuthenticatedGuardProps = {
  children: ReactNode;
};

export function AuthenticatedGuard({ children }: AuthenticatedGuardProps) {
  const session = useAuthSession();
  const location = useLocation();

  if (!session.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to={routes.login} />;
  }

  return <>{children}</>;
}
