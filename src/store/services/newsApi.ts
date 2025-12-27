import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetArticlesResponse, GetArticleResponse, SearchParams, NewsArticle, PaginatedArticles, SuggestedCategory } from '@/types';
import { NEWS_API_KEY, NEWS_API_BASE_URL, DEFAULT_PAGE_SIZE, DEFAULT_LANGUAGE } from '@/constants';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_API_BASE_URL }),
  tagTypes: ['News', 'Article'],
  endpoints: (builder) => ({
    getLatestNews: builder.query<PaginatedArticles, { page?: number; pageSize?: number }>({
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
      transformResponse: (response: GetArticlesResponse) => ({
        articles: response.articles?.results || [],
        totalResults: response.articles?.totalResults || 0,
        totalPages: response.articles?.pages || 0,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ uri }) => ({ type: 'News' as const, id: uri })),
              { type: 'News', id: 'LIST' },
            ]
          : [{ type: 'News', id: 'LIST' }],
    }),

    getArticleById: builder.query<NewsArticle | null, string>({
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
      transformResponse: (response: GetArticleResponse) => {
        const articleKey = Object.keys(response)[0];
        if (articleKey && response[articleKey]?.info) {
          return response[articleKey].info;
        }
        return null;
      },
      providesTags: (result, error, uri) => [{ type: 'Article', id: uri }],
    }),

    searchNews: builder.query<PaginatedArticles, SearchParams>({
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
      transformResponse: (response: GetArticlesResponse) => ({
        articles: response.articles?.results || [],
        totalResults: response.articles?.totalResults || 0,
        totalPages: response.articles?.pages || 0,
      }),
      providesTags: [{ type: 'News', id: 'SEARCH' }],
    }),

    getNewsByCategory: builder.query<PaginatedArticles, { categoryUri: string; page?: number; pageSize?: number }>({
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
      transformResponse: (response: GetArticlesResponse) => ({
        articles: response.articles?.results || [],
        totalResults: response.articles?.totalResults || 0,
        totalPages: response.articles?.pages || 0,
      }),
      providesTags: (result, error, { categoryUri }) => [{ type: 'News', id: categoryUri }],
    }),

    getRelatedArticles: builder.query<NewsArticle[], { sourceUri?: string; excludeId?: string }>({
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
      transformResponse: (response: GetArticlesResponse, meta, { excludeId }) => {
        const articles = response.articles?.results || [];
        return articles.filter(a => a.uri !== excludeId).slice(0, 3);
      },
      providesTags: [{ type: 'News', id: 'RELATED' }],
    }),

    suggestCategories: builder.query<SuggestedCategory[], { prefix: string; count?: number }>({
      query: ({ prefix, count = 5 }) => ({
        url: '/suggestCategoriesFast',
        method: 'POST',
        body: {
          apiKey: NEWS_API_KEY,
          prefix,
          page: 1,
          count,
          articleBodyLen: -1,
        },
      }),
      transformResponse: (response: SuggestedCategory[]) => response || [],
    }),
  }),
});

export const {
  useGetLatestNewsQuery,
  useGetArticleByIdQuery,
  useSearchNewsQuery,
  useGetNewsByCategoryQuery,
  useGetRelatedArticlesQuery,
  useSuggestCategoriesQuery,
  useLazySuggestCategoriesQuery,
} = newsApi;
