import { Category } from '@/types';

export const NEWS_API_KEY = '152dd3e0-8934-4eed-8e28-73e4ec3b2af2';
export const NEWS_API_BASE_URL = 'https://eventregistry.org/api/v1';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', uri: '' },
  { id: 'business', label: 'Business', uri: 'dmoz/Business' },
  { id: 'technology', label: 'Technology', uri: 'dmoz/Computers' },
  { id: 'science', label: 'Science', uri: 'dmoz/Science' },
  { id: 'health', label: 'Health', uri: 'dmoz/Health' },
  { id: 'sports', label: 'Sports', uri: 'dmoz/Sports' },
  { id: 'entertainment', label: 'Entertainment', uri: 'dmoz/Arts' },
  { id: 'politics', label: 'Politics', uri: 'dmoz/Society/Politics' },
];

export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_LANGUAGE = 'spa';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Discover' },
];

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';

export const HERO_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1920&q=80';
