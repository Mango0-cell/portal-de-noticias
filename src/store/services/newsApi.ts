import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsApiResponse, SearchParams, NewsArticle, TransformedArticle } from '@/types';
import { NEWS_API_KEY, NEWS_API_BASE_URL, DEFAULT_PAGE_SIZE, DEFAULT_LANGUAGE, PLACEHOLDER_IMAGE } from '@/constants';

// Transform API article to UI-friendly format
const transformArticle = (article: NewsArticle): TransformedArticle => ({
  id: article.uri,
  title: article.title,
  description: article.body?.substring(0, 200) + '...' || '',
  content: article.body || '',
  imageUrl: article.image || PLACEHOLDER_IMAGE,
  sourceTitle: article.source?.title || 'Unknown Source',
  sourceUri: article.source?.uri || '',
  publishedAt: article.dateTime,
  url: article.url,
  authors: article.authors?.map(a => a.name) || [],
});

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_API_BASE_URL }),
  tagTypes: ['News', 'Article'],
  endpoints: (builder) => ({
    getLatestNews: builder.query<{ articles: TransformedArticle[]; totalResults: number; totalPages: number }, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = DEFAULT_PAGE_SIZE }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: NEWS_API_KEY,
          lang: DEFAULT_LANGUAGE,
          articlesSortBy: 'date',
          articlesCount: pageSize,
          articlesPage: page,
          includeArticleImage: true,
          includeArticleBody: true,
          includeSourceTitle: true,
        },
      }),
      transformResponse: (response: NewsApiResponse) => ({
        articles: response.articles?.results?.map(transformArticle) || [],
        totalResults: response.articles?.totalResults || 0,
        totalPages: response.articles?.pages || 0,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ id }) => ({ type: 'News' as const, id })),
              { type: 'News', id: 'LIST' },
            ]
          : [{ type: 'News', id: 'LIST' }],
    }),

    getArticleById: builder.query<TransformedArticle | null, string>({
      query: (articleUri) => ({
        url: '/article/getArticle',
        method: 'POST',
        body: {
          apiKey: NEWS_API_KEY,
          articleUri,
          includeArticleImage: true,
          includeArticleBody: true,
          includeSourceTitle: true,
        },
      }),
      transformResponse: (response: { [key: string]: NewsArticle }) => {
        const articleKey = Object.keys(response)[0];
        if (articleKey && response[articleKey]) {
          return transformArticle(response[articleKey]);
        }
        return null;
      },
      providesTags: (result, error, id) => [{ type: 'Article', id }],
    }),

    searchNews: builder.query<{ articles: TransformedArticle[]; totalResults: number; totalPages: number }, SearchParams>({
      query: ({ keyword, category, page = 1, pageSize = DEFAULT_PAGE_SIZE, sortBy = 'date' }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: NEWS_API_KEY,
          lang: DEFAULT_LANGUAGE,
          keyword: keyword || undefined,
          categoryUri: category || undefined,
          articlesSortBy: sortBy,
          articlesCount: pageSize,
          articlesPage: page,
          includeArticleImage: true,
          includeArticleBody: true,
          includeSourceTitle: true,
        },
      }),
      transformResponse: (response: NewsApiResponse) => ({
        articles: response.articles?.results?.map(transformArticle) || [],
        totalResults: response.articles?.totalResults || 0,
        totalPages: response.articles?.pages || 0,
      }),
      providesTags: [{ type: 'News', id: 'SEARCH' }],
    }),

    getNewsByCategory: builder.query<{ articles: TransformedArticle[]; totalResults: number; totalPages: number }, { categoryUri: string; page?: number; pageSize?: number }>({
      query: ({ categoryUri, page = 1, pageSize = DEFAULT_PAGE_SIZE }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: NEWS_API_KEY,
          lang: DEFAULT_LANGUAGE,
          categoryUri,
          articlesSortBy: 'date',
          articlesCount: pageSize,
          articlesPage: page,
          includeArticleImage: true,
          includeArticleBody: true,
          includeSourceTitle: true,
        },
      }),
      transformResponse: (response: NewsApiResponse) => ({
        articles: response.articles?.results?.map(transformArticle) || [],
        totalResults: response.articles?.totalResults || 0,
        totalPages: response.articles?.pages || 0,
      }),
      providesTags: (result, error, { categoryUri }) => [{ type: 'News', id: categoryUri }],
    }),

    getRelatedArticles: builder.query<TransformedArticle[], { sourceUri?: string; excludeId?: string }>({
      query: ({ sourceUri }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: NEWS_API_KEY,
          lang: DEFAULT_LANGUAGE,
          sourceUri: sourceUri || undefined,
          articlesSortBy: 'date',
          articlesCount: 4,
          articlesPage: 1,
          includeArticleImage: true,
          includeArticleBody: true,
          includeSourceTitle: true,
        },
      }),
      transformResponse: (response: NewsApiResponse, meta, { excludeId }) => {
        const articles = response.articles?.results?.map(transformArticle) || [];
        return articles.filter(a => a.id !== excludeId).slice(0, 3);
      },
      providesTags: [{ type: 'News', id: 'RELATED' }],
    }),
  }),
});

export const {
  useGetLatestNewsQuery,
  useGetArticleByIdQuery,
  useSearchNewsQuery,
  useGetNewsByCategoryQuery,
  useGetRelatedArticlesQuery,
} = newsApi;
