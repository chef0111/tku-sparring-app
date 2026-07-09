import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { AlertCircle, ArrowLeft, HomeIcon } from 'lucide-react';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { FullWidthDivider } from '@/components/ui/full-width-divider';

function errorMessage(error: unknown): string {
  if (!error || typeof error !== 'object' || !('message' in error)) return '';
  return String((error as { message?: unknown }).message ?? '');
}

function isNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const e = error as { code?: string; message?: string };
  if (e.code === 'NOT_FOUND') return true;
  return /not found/i.test(errorMessage(error));
}

function isTournamentNotFound(error: unknown): boolean {
  return /tournament not found/i.test(errorMessage(error));
}

export function TournamentNotFound() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen items-center border-x">
        <div>
          <FullWidthDivider />
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Tournament not found</EmptyTitle>
              <EmptyDescription className="text-foreground/80">
                This tournament may have been deleted or the link is invalid.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild>
                <Link to="/dashboard/tournaments">
                  <ArrowLeft data-icon="inline-start" />
                  Back to tournaments
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
          <FullWidthDivider />
        </div>
      </div>
    </div>
  );
}

export function DashboardRouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const { reset: resetQueries } = useQueryErrorResetBoundary();

  if (isTournamentNotFound(error)) {
    return <TournamentNotFound />;
  }

  if (isNotFoundError(error)) {
    return (
      <div className="flex w-full items-center justify-center overflow-hidden">
        <div className="flex h-screen items-center border-x">
          <div>
            <FullWidthDivider />
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Not found</EmptyTitle>
                <EmptyDescription className="text-foreground/80">
                  {error.message ||
                    "The page you're looking for might have been moved or doesn't exist."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button asChild>
                  <Link to="/dashboard">
                    <HomeIcon data-icon="inline-start" />
                    Go to dashboard
                  </Link>
                </Button>
              </EmptyContent>
            </Empty>
            <FullWidthDivider />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 p-6"
    >
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <AlertCircle className="text-destructive size-8" aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium">Something went wrong</p>
          <p className="text-muted-foreground text-sm">
            {error.message || 'Failed to load this page.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              resetQueries();
              reset();
              void router.invalidate();
            }}
          >
            Retry
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/dashboard">
              <HomeIcon data-icon="inline-start" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
