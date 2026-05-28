import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="page-shell">
      <Outlet />
    </main>
  );
}
