export * from './news';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}
