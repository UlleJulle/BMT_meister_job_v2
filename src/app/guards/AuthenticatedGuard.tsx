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

  if (session.state === "loading" || session.state === "authenticated_user_doc_loading") {
    return <main className="page-shell">인증 상태를 확인하고 있습니다.</main>;
  }

  if (!session.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to={routes.login} />;
  }

  return <>{children}</>;
}
