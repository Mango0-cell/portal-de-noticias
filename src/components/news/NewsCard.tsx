import React from 'react';
import Link from 'next/link';
import { LazyImage } from '@/components/common/LazyImage';
import { Card, CardContent } from '@/components/ui/Card';
import type { NewsArticle } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';
import { Calendar, User } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <Link href={`/article/${encodeURIComponent(article.url)}`} className="flex-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full">
          <LazyImage
            src={article.image || '/placeholder-news.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <CardContent className="flex-1 flex flex-col">
          {/* Category Badge */}
          {article.category && (
            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded mb-2 w-fit">
              {article.category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
            {article.description || truncateText(article.content || '', 150)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{article.source.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
