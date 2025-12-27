'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsGrid from '@/components/news/NewsGrid';
import Pagination from '@/components/ui/Pagination';
import { NewsCardSkeleton } from '@/components/ui/Skeleton';
import { useGetLatestNewsQuery } from '@/store/services/newsApi';
import { DEFAULT_PAGE_SIZE, CATEGORIES, HERO_BACKGROUND_IMAGE } from '@/constants';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data, isLoading, isError } = useGetLatestNewsQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  const handleExplore = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] md:min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_BACKGROUND_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900 dark:from-slate-900/70 dark:via-slate-900/80 dark:to-slate-900" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breaking News Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm text-white/90">Breaking News Available</span>
            </span>
          </div>

          {/* Main Title */}
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
              Discover Stories
            </h1>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              That Matter
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-slate-300 text-lg md:text-xl text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Your immersive content discovery engine. Stay informed with curated news from trusted sources worldwide.
          </p>

          {/* Search Box */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 text-center">
              What do you want to read?
            </h3>
            <p className="text-slate-400 text-sm text-center mb-6">
              Search by keyword or select a category to explore
            </p>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for news, topics, or keywords..."
                  className="w-full h-14 pl-12 pr-4 bg-slate-900/80 border-none rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </form>

            {/* Categories */}
            <div className="mb-6">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">
                Categories
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-transparent text-white border border-white/20 hover:bg-white/10'
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Explore Button */}
            <button
              onClick={handleExplore}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
            >
              <span>Explore News</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured Stories
          </h2>
          {data && (
            <span className="text-secondary text-sm">
              {data.totalResults.toLocaleString('en-US')} articles available
            </span>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12 bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl">
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
              Error loading news
            </h3>
            <p className="text-secondary mb-4">
              We couldn&apos;t load the news. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State */}
        {data && !isLoading && (
          <>
            <NewsGrid 
              articles={data.articles} 
              columns={3} 
              priorityCount={3}
            />
            
            {/* Pagination */}
            {data.totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={Math.min(data.totalPages, 50)}
                onPageChange={handlePageChange}
                className="mt-12"
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}
