'use client';

import Link from 'next/link';
import LazyImage from '@/components/common/LazyImage';
import { TransformedArticle } from '@/types';
import { formatRelativeTime, getArticleUrl } from '@/lib/utils';

interface NewsCardProps {
  article: TransformedArticle;
  priority?: boolean;
}

// Category badge colors
const getCategoryColor = (category?: string): string => {
  const colors: Record<string, string> = {
    sports: 'bg-green-600',
    technology: 'bg-purple-600',
    politics: 'bg-red-600',
    business: 'bg-blue-600',
    health: 'bg-emerald-600',
    science: 'bg-cyan-600',
    entertainment: 'bg-pink-600',
  };
  return colors[category?.toLowerCase() || ''] || 'bg-blue-600';
};

export default function NewsCard({ article, priority = false }: NewsCardProps) {
  // Estimate read time (rough: 200 words per minute)
  const wordCount = article.content?.split(/\s+/).length || 100;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link href={getArticleUrl(article.id)} className="block group">
      <article className="h-full flex flex-col bg-white dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-white/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <LazyImage
            src={article.imageUrl}
            alt={article.title}
            fill
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          
          {/* Category Badge */}
          <span className={`absolute top-3 left-3 z-10 px-3 py-1.5 ${getCategoryColor(article.category)} text-white text-xs font-semibold rounded-full`}>
            {article.category || 'News'}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          {/* Source */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>{article.sourceTitle}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 flex-grow leading-relaxed">
            {article.description}
          </p>

          {/* Footer - Time info */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <time dateTime={article.publishedAt}>
                {formatRelativeTime(article.publishedAt)}
              </time>
            </div>
            <span>{readTime} min read</span>
          </div>

          {/* Read Full Story Link */}
          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            <span>Read full story</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
