import React from 'react';
import { NewsGrid } from '@/components/news/NewsGrid';
import type { NewsArticle } from '@/types';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  articles: NewsArticle[];
  searchQuery?: string;
  isLoading?: boolean;
}

export function SearchResults({ articles, searchQuery, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Searching...</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No results found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {searchQuery 
            ? `We couldn't find any articles matching &quot;${searchQuery}&quot;`
            : 'Try searching for something or select a different category'
          }
        </p>
      </div>
    );
  }

  return (
    <div>
      {searchQuery && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Found {articles.length} article{articles.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
        </p>
      )}
      <NewsGrid articles={articles} />
    </div>
  );
}
