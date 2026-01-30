import React from 'react';
import { NewsCard } from './NewsCard';
import type { NewsArticle } from '@/types';

interface NewsGridProps {
  articles: NewsArticle[];
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No articles found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
}
