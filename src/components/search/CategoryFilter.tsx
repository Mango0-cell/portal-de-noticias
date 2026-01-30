'use client';

import React from 'react';
import { NEWS_CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory = 'general', onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {NEWS_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          )}
          aria-pressed={selectedCategory === category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
