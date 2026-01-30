import React from 'react';
import { NewsCard } from './NewsCard';
import type { NewsArticle } from '@/types';

interface NewsListProps {
  articles: NewsArticle[];
}

export function NewsList({ articles }: NewsListProps) {
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
    <div className="space-y-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
}
