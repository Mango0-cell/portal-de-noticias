'use client';

import NewsCard from './NewsCard';
import { TransformedArticle } from '@/types';
import { cn } from '@/lib/utils';

interface NewsGridProps {
  articles: TransformedArticle[];
  columns?: 1 | 2 | 3 | 4;
  priorityCount?: number;
  className?: string;
}

export default function NewsGrid({
  articles,
  columns = 3,
  priorityCount = 4,
  className,
}: NewsGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-muted">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No hay noticias disponibles
        </h3>
        <p className="text-secondary">
          No se encontraron artículos para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', columnClasses[columns], className)}>
      {articles.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
