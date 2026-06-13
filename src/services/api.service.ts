import axios from 'axios';
import type { GenresResponse, MovieDetails, MovieDetailsResponse, Video } from '../models/movie';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

interface MovieFilters {
  genre?: number;
  year?: string;
  sortBy?: string;
}

export const getMovies = async (
  page: number = 1,
  filters: MovieFilters = {},
): Promise<MovieDetailsResponse> => {
  const params: Record<string, string | number> = { page };

  if (filters.sortBy) {
    params.sort_by = filters.sortBy;
  }

  if (filters.year) {
    params['primary_release_year'] = filters.year;
  }

  if (filters.genre) {
    params['with_genres'] = filters.genre;
  }

  const response = await apiClient.get('/discover/movie', { params });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<MovieDetailsResponse> => {
  const response = await apiClient.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getGenres = async (): Promise<GenresResponse> => {
  const response = await apiClient.get('/genre/movie/list');
  return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await apiClient.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos' },
  });
  return response.data;
};

export const getTrailer = (videos?: { results: Video[] }): Video | undefined => {
  const youtubeVideos = videos?.results.filter((video) => video.site === 'YouTube') ?? [];
  return (
    youtubeVideos.find((video) => video.type === 'Trailer' && video.official) ??
    youtubeVideos.find((video) => video.type === 'Trailer') ??
    youtubeVideos.find((video) => video.type === 'Teaser') ??
    youtubeVideos[0]
  );
};
