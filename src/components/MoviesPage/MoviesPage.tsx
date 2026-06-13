import type { Genre, Movie } from '../../models/movie';
import { MoviesControls } from '../MoviesControls/MoviesControls';
import { MoviesList } from '../MoviesList/MoviesList';
import { Pagination } from '../Pagination/Pagination';
import './MoviesPage.css';

interface Filters {
  genre?: number;
  year?: string;
  sortBy?: string;
}

interface MoviesPageViewProps {
  movies: Movie[];
  genres: Genre[];
  page: number;
  totalPages: number;
  searchQuery: string;
  filters: Filters;
  searchParams: Record<string, string>;
}

export const MoviesPageView: React.FC<MoviesPageViewProps> = ({
  movies,
  genres,
  page,
  totalPages,
  searchQuery,
  filters,
  searchParams,
}) => {
  return (
    <div className="movies-page">
      <MoviesControls genres={genres} searchQuery={searchQuery} filters={filters} />
      <main className="movies-container">
        <MoviesList movies={movies} genres={genres} />
        <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
      </main>
    </div>
  );
};
