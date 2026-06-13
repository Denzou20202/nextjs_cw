import type { Genre, Movie } from '../../models/movie';
import { MoviesListCard } from '../MoviesListCard/MoviesListCard';
import './MoviesList.css';

interface MoviesListProps {
  movies: Movie[];
  genres: Genre[];
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies, genres }) => {
  if (!movies || movies.length === 0) {
    return <div className="movies-empty">No movies found</div>;
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MoviesListCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
};
