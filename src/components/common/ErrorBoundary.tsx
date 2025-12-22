'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="w-16 h-16 mb-4 text-error">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Algo salió mal
          </h2>
          <p className="text-secondary mb-4 max-w-md">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
          {this.state.error && (
            <p className="text-sm text-muted mb-4 font-mono bg-card-bg p-2 rounded max-w-full overflow-auto">
              {this.state.error.message}
            </p>
          )}
          <Button onClick={this.handleReset}>
            Intentar de nuevo
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
