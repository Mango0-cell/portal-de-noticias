import { SearchResultsSkeleton } from '@/components/ui/Skeleton';

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="h-10 w-64 mx-auto bg-card-border/50 animate-pulse rounded mb-4" />
        <div className="h-6 w-96 mx-auto bg-card-border/50 animate-pulse rounded" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="h-12 bg-card-border/50 animate-pulse rounded-xl" />
      </div>

      {/* Category Filter Skeleton */}
      <div className="flex gap-2 justify-center mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-card-border/50 animate-pulse rounded-full" />
        ))}
      </div>

      {/* Results Skeleton */}
      <SearchResultsSkeleton />
    </div>
  );
}
