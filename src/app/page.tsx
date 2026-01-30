'use client';

import { useState } from 'react';
import { useGetLatestNewsQuery } from '@/store/services/newsApi';
import { NewsGrid } from '@/components/news/NewsGrid';
import { Pagination } from '@/components/ui/Pagination';
import { NewsCardSkeleton } from '@/components/ui/Skeleton';
import { ITEMS_PER_PAGE } from '@/constants';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, error, isLoading } = useGetLatestNewsQuery({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  const totalPages = data?.totalResults ? Math.ceil(data.totalResults / ITEMS_PER_PAGE) : 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Latest News
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay informed with the most recent headlines
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">
              Failed to load news articles. Please try again later.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* News Grid */}
        {!isLoading && data?.articles && (
          <>
            <NewsGrid articles={data.articles} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.min(totalPages, 10)} // Limit to 10 pages
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

