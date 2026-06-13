export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailsResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
  budget: number;
  revenue: number;
  genres: Genre[];
  videos?: {
    results: Video[];
  };
}
