import { NewsCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
        
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
