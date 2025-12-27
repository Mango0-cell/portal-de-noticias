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
    <div className="min-h-screen bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Discover News
          </h1>
          <p className="text-secondary text-base">
            Search through millions of articles from trusted sources worldwide
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-14 bg-card-border/50 rounded-xl animate-pulse" />}>
            <SearchBar autoFocus />
          </Suspense>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <Suspense fallback={
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-card-border/50 rounded-full animate-pulse flex-shrink-0" />
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
