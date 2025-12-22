'use client';

import { useSearchParams } from 'next/navigation';
import NewsGrid from '@/components/news/NewsGrid';
import Pagination from '@/components/ui/Pagination';
import { SearchResultsSkeleton } from '@/components/ui/Skeleton';
import { useSearchNewsQuery } from '@/store/services/newsApi';
import { CATEGORIES, DEFAULT_PAGE_SIZE } from '@/constants';
import { useRouter } from 'next/navigation';

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  // Find category URI
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryUri = category?.uri || '';

  const { data, isLoading, isError, error } = useSearchNewsQuery({
    keyword: query || undefined,
    category: categoryUri || undefined,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/search?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded" />
        <SearchResultsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
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
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Error loading results
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {(error as Error)?.message || 'An error occurred while searching. Please try again.'}
        </p>
      </div>
    );
  }

  const articles = data?.articles || [];
  const totalResults = data?.totalResults || 0;
  const totalPages = data?.totalPages || 0;

  // Empty state
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-slate-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No results found
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          {query
            ? `We couldn't find any news matching "${query}".`
            : 'No news available for the selected filters.'}
          {' '}Try different keywords or categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-slate-600 dark:text-slate-400">
        <p>
          {totalResults.toLocaleString('en-US')} {totalResults === 1 ? 'result' : 'results'}
          {query && (
            <> for <span className="font-medium text-slate-900 dark:text-white">&ldquo;{query}&rdquo;</span></>
          )}
          {category && category.id !== 'all' && (
            <> in <span className="font-medium text-slate-900 dark:text-white">{category.label}</span></>
          )}
        </p>
      </div>

      {/* Results grid */}
      <NewsGrid articles={articles} columns={3} priorityCount={3} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  );
}
