'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearchNewsQuery } from '@/store/services/newsApi';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/search/CategoryFilter';
import { SearchResults } from '@/components/search/SearchResults';
import { Pagination } from '@/components/ui/Pagination';
import { ITEMS_PER_PAGE } from '@/constants';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'general');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useSearchNewsQuery({
    q: searchQuery,
    category,
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  const totalPages = data?.totalResults ? Math.ceil(data.totalResults / ITEMS_PER_PAGE) : 1;

  // Update URL when search params change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (category !== 'general') params.set('category', category);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search';
    router.push(newUrl, { scroll: false });
  }, [searchQuery, category, currentPage, router]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Search & Discover
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find news articles by keyword or browse by category
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Categories
          </h2>
          <CategoryFilter 
            selectedCategory={category} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">
              Failed to search articles. Please try again later.
            </p>
          </div>
        )}

        {/* Search Results */}
        <SearchResults 
          articles={data?.articles || []} 
          searchQuery={searchQuery}
          isLoading={isLoading}
        />

        {/* Pagination */}
        {!isLoading && data?.articles && data.articles.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(totalPages, 10)} // Limit to 10 pages
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
