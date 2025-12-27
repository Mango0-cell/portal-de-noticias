'use client';

import { use } from 'react';
import ArticleDetail from '@/components/news/ArticleDetail';
import RelatedArticles from '@/components/news/RelatedArticles';
import { ArticleDetailSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import { useGetArticleByIdQuery } from '@/store/services/newsApi';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = use(params);
  const articleId = decodeURIComponent(resolvedParams.id);
  
  const { data: article, isLoading, isError, error } = useGetArticleByIdQuery(articleId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ArticleDetailSkeleton />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
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
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Article not found
          </h1>
          <p className="text-secondary mb-6">
            {(error as Error)?.message || 'We couldn\'t load the requested article.'}
          </p>
          <Button onClick={() => window.history.back()}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleDetail article={article} />
      <RelatedArticles 
        sourceUri={article.source?.uri} 
        excludeId={article.uri} 
      />
    </div>
  );
}
