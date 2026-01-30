export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  category: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface SearchParams {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}
