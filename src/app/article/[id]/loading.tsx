import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    </div>
  );
}
