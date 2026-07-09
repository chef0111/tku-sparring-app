import * as React from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
  title?: string;
}

interface ErrorBoundaryClassProps {
  children: React.ReactNode;
  title: string;
  onReset: () => void;
}

interface ErrorBoundaryClassState {
  error: Error | null;
}

class ErrorBoundaryClass extends React.Component<
  ErrorBoundaryClassProps,
  ErrorBoundaryClassState
> {
  state: ErrorBoundaryClassState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryClassState {
    return { error };
  }

  reset = () => {
    this.props.onReset();
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div
          role="alert"
          className="border-destructive/20 bg-destructive/5 flex flex-col items-start gap-3 rounded-lg border p-4"
        >
          <div className="flex items-start gap-2">
            <AlertCircle
              className="text-destructive mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{this.props.title}</p>
              <p className="text-muted-foreground text-sm">
                {error.message || 'Something went wrong.'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={this.reset}
          >
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function QueryErrorBoundary({
  children,
  title = 'Failed to load this section',
}: QueryErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundaryClass title={title} onReset={reset}>
      {children}
    </ErrorBoundaryClass>
  );
}
