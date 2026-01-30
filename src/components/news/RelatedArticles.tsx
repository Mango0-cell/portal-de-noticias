import React from 'react';
import { NewsGrid } from './NewsGrid';
import type { NewsArticle } from '@/types';

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <NewsGrid articles={articles.slice(0, 4)} />
    </section>
  );
}
