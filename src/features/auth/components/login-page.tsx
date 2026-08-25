import { LoginForm } from './login-form';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Highlighter } from '@/components/ui/highlighter';

export function LoginPage() {
  return (
    <FieldSet className="flex flex-col space-y-4 text-center">
      <FieldLegend className="text-2xl! font-semibold tracking-wide">
        Sign in to{' '}
        <Highlighter
          action="underline"
          color="#1685f5"
          className="font-esbuild font-medium"
          strokeWidth={2}
          padding={0}
        >
          Kyorbit
        </Highlighter>
      </FieldLegend>
      <FieldDescription className="text-muted-foreground w-full text-center text-base!">
        Enter your username and password to get access
      </FieldDescription>
      <FieldGroup>
        <LoginForm />
      </FieldGroup>
    </FieldSet>
  );
}
