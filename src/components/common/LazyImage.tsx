'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export function LazyImage({ src, alt, width, height, className, fill }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Placeholder SVG for missing images
  const placeholderSvg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M163 148.5l-37.5 37.5-15-15-45 60h267l-90-120z"/%3E%3Ccircle fill="%239ca3af" cx="127.5" cy="90" r="22.5"/%3E%3C/svg%3E';

  if (hasError || !src) {
    return (
      <div className={cn('flex items-center justify-center bg-gray-200 dark:bg-gray-700', className)}>
        <Image 
          src={placeholderSvg}
          alt={alt}
          width={width || 400}
          height={height || 300}
          className={cn('w-full h-full object-cover', className)}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={cn(
          'transition-opacity duration-300 object-cover', 
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        sizes={fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined}
      />
    </div>
  );
}
