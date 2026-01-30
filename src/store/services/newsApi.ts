import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsArticle, SearchParams } from '@/types';
import { API_CONFIG } from '@/constants';

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_CONFIG.baseUrl,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', API_CONFIG.apiKey);
      return headers;
    },
  }),
  tagTypes: ['News', 'Article'],
  endpoints: (builder) => ({
    getLatestNews: builder.query<NewsApiResponse, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 12 }) => 
        `/top-headlines?country=us&page=${page}&pageSize=${pageSize}`,
      providesTags: ['News'],
    }),
    getArticleById: builder.query<NewsArticle, string>({
      query: (id) => `/everything?q=${id}`,
      providesTags: (result, error, id) => [{ type: 'Article', id }],
      transformResponse: (response: NewsApiResponse) => response.articles[0],
    }),
    searchNews: builder.query<NewsApiResponse, SearchParams>({
      query: ({ q = '', category, page = 1, pageSize = 12 }) => {
        const params = new URLSearchParams({
          q,
          page: page.toString(),
          pageSize: pageSize.toString(),
        });
        
        if (category && category !== 'general') {
          params.append('category', category);
        }
        
        return `/top-headlines?${params.toString()}&country=us`;
      },
      providesTags: ['News'],
    }),
    getNewsByCategory: builder.query<NewsApiResponse, { category: string; page?: number; pageSize?: number }>({
      query: ({ category, page = 1, pageSize = 12 }) => 
        `/top-headlines?category=${category}&country=us&page=${page}&pageSize=${pageSize}`,
      providesTags: ['News'],
    }),
  }),
});

export const {
  useGetLatestNewsQuery,
  useGetArticleByIdQuery,
  useSearchNewsQuery,
  useGetNewsByCategoryQuery,
} = newsApi;
