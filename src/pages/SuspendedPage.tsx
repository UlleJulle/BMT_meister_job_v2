import { Card } from "../components/ui/Card";

export function SuspendedPage() {
  return (
    <Card className="stack">
      <h1>Account suspended</h1>
      <p>Your access is currently restricted. Please contact your school administrator.</p>
    </Card>
  );
}
