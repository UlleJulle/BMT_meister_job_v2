import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../constants/routes";
import { useAuthSession } from "../../features/auth/useAuthSession";

type PendingGuardProps = {
  children: ReactNode;
};

export function PendingGuard({ children }: PendingGuardProps) {
  const session = useAuthSession();
  const location = useLocation();

  if (session.state === "pending") {
    return <Navigate replace to={`${routes.pending}${location.search}`} />;
  }

  return <>{children}</>;
}
