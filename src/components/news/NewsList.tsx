'use client';

import NewsCard from './NewsCard';
import { NewsArticle } from '@/types';

interface NewsListProps {
  articles: NewsArticle[];
  priorityCount?: number;
}

export default function NewsList({ articles, priorityCount = 0 }: NewsListProps) {
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
    <div className="space-y-6">
      {articles.map((article, index) => (
        <NewsCard
          key={article.uri}
          article={article}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
