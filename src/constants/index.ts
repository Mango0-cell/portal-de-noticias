export const NEWS_CATEGORIES = [
  { id: 'general', name: 'General' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
] as const;

export const ITEMS_PER_PAGE = 12;

export const API_CONFIG = {
  baseUrl: 'https://newsapi.org/v2',
  // API key must be provided via environment variable
  // Get your free API key at https://newsapi.org/
  apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY || '',
};

// Validate API key at module load
if (typeof window === 'undefined' && !API_CONFIG.apiKey) {
  console.warn('Warning: NEXT_PUBLIC_NEWS_API_KEY is not configured. The app will not fetch live news data.');
}
