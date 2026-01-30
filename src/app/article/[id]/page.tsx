'use client';

import { useParams } from 'next/navigation';
import { useGetLatestNewsQuery } from '@/store/services/newsApi';
import { ArticleDetail } from '@/components/news/ArticleDetail';
import { RelatedArticles } from '@/components/news/RelatedArticles';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ArticlePage() {
  const params = useParams();
  const articleUrl = decodeURIComponent(params.id as string);
  
  // Fetch more articles to increase chance of finding the requested one
  // In a production app, consider implementing proper article caching or a dedicated article endpoint
  const { data, error, isLoading } = useGetLatestNewsQuery({ page: 1, pageSize: 100 });
  
  const article = data?.articles.find(a => a.url === articleUrl);
  const relatedArticles = data?.articles.filter(a => a.url !== articleUrl).slice(0, 8) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Article not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The article you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Note: Article pages work best with fresh articles from the home page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleDetail article={article} />
        <RelatedArticles articles={relatedArticles} />
      </div>
    </div>
  );
}
