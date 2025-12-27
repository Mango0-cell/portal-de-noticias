'use client';

import NewsGrid from './NewsGrid';
import { NewsCardSkeleton } from '@/components/ui/Skeleton';
import { useGetRelatedArticlesQuery } from '@/store/services/newsApi';

interface RelatedArticlesProps {
  sourceUri?: string;
  excludeId?: string;
}

export default function RelatedArticles({ sourceUri, excludeId }: RelatedArticlesProps) {
  const { data: articles, isLoading, isError } = useGetRelatedArticlesQuery({
    sourceUri,
    excludeId,
  });

  if (isError) return null;

  return (
    <section className="mt-12 pt-8 border-t border-card-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Related Articles
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : articles && articles.length > 0 ? (
        <NewsGrid articles={articles} columns={3} priorityCount={0} />
      ) : (
        <p className="text-muted text-center py-8">
          No related articles available.
        </p>
      )}
    </section>
  );
}
