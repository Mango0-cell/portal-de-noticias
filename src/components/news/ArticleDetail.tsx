import React from 'react';
import Link from 'next/link';
import { LazyImage } from '@/components/common/LazyImage';
import type { NewsArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import { Calendar, User, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ArticleDetailProps {
  article: NewsArticle;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </nav>

      {/* Category Badge */}
      {article.category && (
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded mb-4">
          {article.category}
        </span>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {article.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="text-sm">{article.author || article.source.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(article.publishedAt)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{article.source.name}</span>
        </div>
      </div>

      {/* Hero Image */}
      {article.image && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <LazyImage
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Description */}
      {article.description && (
        <div className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {article.description}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {article.content}
        </p>
      </div>

      {/* Read Full Article Button */}
      {article.url && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Button variant="primary">
              Read Full Article
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      )}
    </article>
  );
}
