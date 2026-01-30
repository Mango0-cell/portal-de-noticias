'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update initial state
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
