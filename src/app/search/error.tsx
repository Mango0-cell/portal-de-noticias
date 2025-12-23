'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Search error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500 dark:text-red-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Error en la búsqueda
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Ocurrió un error al realizar la búsqueda. Por favor, intenta de nuevo.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>
            Intentar de nuevo
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/search'}>
            Nueva búsqueda
          </Button>
        </div>
      </div>
    </div>
  );
}
