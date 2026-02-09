import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@/modules/auth';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});

function LoginPage() {
  return <Login />;
}
