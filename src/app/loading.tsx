import { NewsCardSkeleton } from '@/components/ui/Skeleton';

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center space-y-6">
          <div className="h-8 w-32 mx-auto bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded-full" />
          <div className="h-14 w-96 mx-auto bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded" />
          <div className="h-6 w-80 mx-auto bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded" />
          <div className="h-14 w-full max-w-xl mx-auto bg-slate-300 dark:bg-slate-800/50 animate-pulse rounded-xl mt-8" />
        </div>
      </section>

      {/* News Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded" />
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
