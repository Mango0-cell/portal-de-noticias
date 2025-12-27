'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import NewsGrid from '@/components/news/NewsGrid';
import Pagination from '@/components/ui/Pagination';
import { SearchResultsSkeleton } from '@/components/ui/Skeleton';
import { useSearchNewsQuery, useLazySuggestCategoriesQuery } from '@/store/services/newsApi';
import { CATEGORIES, DEFAULT_PAGE_SIZE } from '@/constants';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [triggerSuggestCategories] = useLazySuggestCategoriesQuery();
  
  // Local state to track search parameters without causing re-renders
  const [searchState, setSearchState] = useState(() => ({
    query: searchParams.get('q') || '',
    categoryId: searchParams.get('category') || '',
    categoryUri: '', // Will be fetched from suggestCategoriesFast API
    page: parseInt(searchParams.get('page') || '1', 10),
    isCategoryUriReady: false, // Flag to track if URI has been fetched
  }));
  
  const lastParamsRef = useRef<string>(searchParams.toString());
  const categoryUriCache = useRef<Record<string, string>>({});

  // Function to fetch category URI from suggestCategoriesFast API
  // This MUST be called before any categorized getArticles request
  const fetchCategoryUri = useCallback(async (categoryId: string): Promise<string> => {
    if (!categoryId || categoryId === 'all') {
      return '';
    }

    // Check cache first
    if (categoryUriCache.current[categoryId]) {
      return categoryUriCache.current[categoryId];
    }

    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) {
      return '';
    }

    try {
      // IMPORTANT: Call suggestCategoriesFast API with the category label
      // to get the correct URI before making any getArticles request
      const result = await triggerSuggestCategories({ 
        prefix: category.label, 
        count: 1 
      }).unwrap();
      
      if (result && result.length > 0) {
        const uri = result[0].uri;
        // Cache the result for future use
        categoryUriCache.current[categoryId] = uri;
        return uri;
      }
      
      // Fallback to hardcoded URI if API returns empty
      categoryUriCache.current[categoryId] = category.uri;
      return category.uri;
    } catch {
      // Fallback to hardcoded URI on error
      categoryUriCache.current[categoryId] = category.uri;
      return category.uri;
    }
  }, [triggerSuggestCategories]);

  // Fetch category URI when categoryId changes - BEFORE any search
  useEffect(() => {
    const updateCategoryUri = async () => {
      // Mark as not ready while fetching
      setSearchState(prev => ({ ...prev, isCategoryUriReady: false }));
      
      const uri = await fetchCategoryUri(searchState.categoryId);
      
      setSearchState(prev => ({
        ...prev,
        categoryUri: uri,
        isCategoryUriReady: true, // Now ready to perform search
      }));
    };

    updateCategoryUri();
  }, [searchState.categoryId, fetchCategoryUri]);

  // Sync state with URL on mount and when URL changes externally
  useEffect(() => {
    const currentParams = searchParams.toString();
    if (currentParams !== lastParamsRef.current) {
      const categoryId = searchParams.get('category') || '';
      
      setSearchState(prev => ({
        ...prev,
        query: searchParams.get('q') || '',
        categoryId,
        categoryUri: '', // Reset URI, will be fetched
        isCategoryUriReady: false,
        page: parseInt(searchParams.get('page') || '1', 10),
      }));
      lastParamsRef.current = currentParams;
    }
  }, [searchParams]);

  // Listen for custom category change events (from CategoryFilter using window.history)
  useEffect(() => {
    const handleCategoryChange = (e: CustomEvent<{ categoryId: string }>) => {
      setSearchState(prev => ({
        ...prev,
        categoryId: e.detail.categoryId,
        categoryUri: '', // Reset URI, will be fetched by fetchCategoryUri
        isCategoryUriReady: false,
        page: 1,
      }));
    };

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryId = params.get('category') || '';
      
      setSearchState(prev => ({
        ...prev,
        query: params.get('q') || '',
        categoryId,
        categoryUri: '', // Reset URI
        isCategoryUriReady: false,
        page: parseInt(params.get('page') || '1', 10),
      }));
    };

    window.addEventListener('categoryChange', handleCategoryChange as EventListener);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Listen for query changes from SearchBar
  useEffect(() => {
    const checkForQueryChanges = () => {
      const params = new URLSearchParams(window.location.search);
      const newQuery = params.get('q') || '';
      
      if (newQuery !== searchState.query) {
        setSearchState(prev => ({
          ...prev,
          query: newQuery,
          page: 1,
        }));
      }
    };

    // Check periodically for URL changes made via window.history
    const interval = setInterval(checkForQueryChanges, 100);
    return () => clearInterval(interval);
  }, [searchState.query]);

  // Find category for display
  const category = CATEGORIES.find(c => c.id === searchState.categoryId);

  // CRITICAL: Skip search until category URI is ready
  // This ensures suggestCategoriesFast is called BEFORE getArticles
  const shouldSkipSearch = !searchState.isCategoryUriReady;

  const { data, isLoading, isError, error, isFetching } = useSearchNewsQuery(
    {
      keyword: searchState.query || undefined,
      category: searchState.categoryUri || undefined,
      page: searchState.page,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    {
      skip: shouldSkipSearch,
    }
  );

  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage.toString());
    
    // Use window.history to avoid hard refresh
    window.history.pushState(null, '', `/search?${params.toString()}`);
    
    setSearchState(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Show skeleton while waiting for category URI (suggestCategoriesFast) or during initial load
  if (!searchState.isCategoryUriReady || (isLoading && !data)) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-48 bg-card-border/50 animate-pulse rounded" />
        <SearchResultsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-error">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Error loading results
        </h3>
        <p className="text-secondary">
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
        <div className="w-16 h-16 mx-auto mb-4 text-muted">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No results found
        </h3>
        <p className="text-secondary max-w-md mx-auto">
          {searchState.query
            ? `We couldn't find any news matching "${searchState.query}".`
            : 'No news available for the selected filters.'}
          {' '}Try different keywords or categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-secondary flex items-center gap-2">
        <p>
          {totalResults.toLocaleString('en-US')} {totalResults === 1 ? 'result' : 'results'}
          {searchState.query && (
            <> for <span className="font-medium text-foreground">&ldquo;{searchState.query}&rdquo;</span></>
          )}
          {category && category.id !== 'all' && (
            <> in <span className="font-medium text-foreground">{category.label}</span></>
          )}
        </p>
        {isFetching && (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Results grid */}
      <div className={isFetching ? 'opacity-60 transition-opacity' : ''}>
        <NewsGrid articles={articles} columns={3} priorityCount={3} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={searchState.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  );
}
