// News API Response Types
export interface NewsArticle {
  uri: string;
  lang: string;
  isDuplicate: boolean;
  date: string;
  time: string;
  dateTime: string;
  dateTimePub: string;
  dataType: string;
  sim: number;
  url: string;
  title: string;
  body: string;
  source: NewsSource;
  authors: Author[];
  image: string;
  eventUri: string | null;
  sentiment: number | null;
  wgt?: number;
  relevance?: number;
}

export interface NewsSource {
  uri: string;
  dataType: string;
  title: string;
}

export interface Author {
  uri: string;
  name: string;
  type: string;
  isAgency: boolean;
}

// Response for getArticles endpoint
export interface GetArticlesResponse {
  articles: {
    results: NewsArticle[];
    totalResults: number;
    page: number;
    count: number;
    pages: number;
  };
}

// Response for getArticle endpoint (single article)
// Structure: { "articleUri": { "info": NewsArticle } }
export interface GetArticleResponse {
  [key: string]: {
    info: NewsArticle;
  };
}

export interface SearchParams {
  keyword?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  lang?: string;
  sortBy?: 'date' | 'rel' | 'sourceImportance';
}

export interface Category {
  id: string;
  label: string;
  uri: string;
}

// Suggested category from Event Registry API
export interface SuggestedCategory {
  uri: string;
  label: string;
  parentUri?: string;
}

// Paginated response for UI
export interface PaginatedArticles {
  articles: NewsArticle[];
  totalResults: number;
  totalPages: number;
}
