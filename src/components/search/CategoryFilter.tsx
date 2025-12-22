'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  className?: string;
}

export default function CategoryFilter({ className }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (categoryId === 'all') {
        params.delete('category');
      } else {
        params.set('category', categoryId);
      }
      
      // Reset to page 1 when changing category
      params.delete('page');
      
      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
            activeCategory === category.id
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
              : 'bg-transparent text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/30'
          )}
          aria-pressed={activeCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
