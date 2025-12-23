import { ArticleDetailSkeleton } from '@/components/ui/Skeleton';

export default function ArticleLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleDetailSkeleton />
    </div>
  );
}
