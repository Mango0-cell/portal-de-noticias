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
  wgt: number;
  relevance: number;
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

export interface NewsApiResponse {
  articles: {
    results: NewsArticle[];
    totalResults: number;
    page: number;
    count: number;
    pages: number;
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

// Transformed article for UI consumption
export interface TransformedArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  sourceTitle: string;
  sourceUri: string;
  publishedAt: string;
  url: string;
  authors: string[];
  category?: string;
}
