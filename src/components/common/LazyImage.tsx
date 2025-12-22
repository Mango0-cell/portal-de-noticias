'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PLACEHOLDER_IMAGE } from '@/constants';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const imageSrc = hasError ? PLACEHOLDER_IMAGE : (src || PLACEHOLDER_IMAGE);

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-card-bg',
        fill ? 'w-full h-full' : '',
        className
      )}
    >
      {isInView ? (
        <>
          <Image
            src={imageSrc}
            alt={alt}
            width={fill ? undefined : (width || 400)}
            height={fill ? undefined : (height || 300)}
            fill={fill}
            className={cn(
              'object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            priority={priority}
            sizes={fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined}
          />
          {!isLoaded && (
            <div className="absolute inset-0 skeleton" aria-hidden="true" />
          )}
        </>
      ) : (
        <div 
          className="skeleton w-full h-full min-h-[200px]" 
          aria-hidden="true" 
        />
      )}
    </div>
  );
}
