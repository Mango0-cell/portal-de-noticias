'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({ className, variant = 'rectangular', width, height }: SkeletonProps) {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : variant === 'circular' ? '40px' : '100px'),
  };

  return (
    <div
      className={cn('bg-card-border/50 animate-pulse', variants[variant], className)}
      style={style}
      aria-hidden="true"
    />
  );
}

// Pre-built skeleton components for common use cases
export function NewsCardSkeleton() {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      <Skeleton height={200} className="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" height={12} width="30%" />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={24} width="80%" />
        <div className="space-y-2">
          <Skeleton variant="text" height={14} />
          <Skeleton variant="text" height={14} />
          <Skeleton variant="text" height={14} width="60%" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" height={12} width="40%" />
          <Skeleton variant="text" height={12} width="20%" />
        </div>
      </div>
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton variant="text" height={16} width="30%" />
      <Skeleton variant="text" height={48} />
      <Skeleton variant="text" height={48} width="80%" />
      <div className="flex gap-4">
        <Skeleton variant="text" height={14} width="20%" />
        <Skeleton variant="text" height={14} width="30%" />
      </div>
      <Skeleton height={400} />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="text" height={20} width={i === 4 ? '70%' : '100%'} />
        ))}
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
