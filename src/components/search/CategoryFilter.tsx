'use client';

import { useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  className?: string;
}

export default function CategoryFilter({ className }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const lastPushedParams = useRef<string>(searchParams.toString());

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
      
      const newParamsString = params.toString();
      
      // Deep comparison: avoid update if params haven't changed
      if (newParamsString === lastPushedParams.current) {
        return;
      }
      
      // Use window.history to avoid hard refresh/rerender
      window.history.pushState(null, '', `/search?${newParamsString}`);
      lastPushedParams.current = newParamsString;
      
      // Dispatch a custom event to notify SearchResults of the change
      window.dispatchEvent(new CustomEvent('categoryChange', { detail: { categoryId } }));
    },
    [searchParams]
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
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
              : 'bg-transparent text-secondary border-card-border hover:bg-card-bg hover:text-foreground hover:border-secondary/50'
          )}
          aria-pressed={activeCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
