import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchBar from '@/components/search/SearchBar';
import CategoryFilter from '@/components/search/CategoryFilter';
import SearchResults from '@/components/search/SearchResults';
import { SearchResultsSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Discover News - NewsPortal',
  description: 'Search news by keyword or category. Find articles about technology, business, science, sports and more.',
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Discover News
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Search through millions of articles from trusted sources worldwide
          </p>
        </div>

        {/* Search Bar with Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1">
            <Suspense fallback={<div className="h-14 bg-slate-200 dark:bg-slate-800/50 rounded-xl animate-pulse" />}>
              <SearchBar autoFocus />
            </Suspense>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span>Live</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <Suspense fallback={
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-slate-200 dark:bg-slate-800/50 rounded-full animate-pulse flex-shrink-0" />
              ))}
            </div>
          }>
            <CategoryFilter />
          </Suspense>
        </div>

        {/* Results */}
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
