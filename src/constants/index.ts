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
  // Note: In production, use environment variables
  apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo',
};
