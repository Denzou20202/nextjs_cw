import Link from 'next/link';
import type { Genre, Movie } from '../../models/movie';
import { MovieInfo } from '../MovieInfo/MovieInfo';
import { PosterPreview } from '../PosterPreview/PosterPreview';
import './MoviesListCard.css';

interface MoviesListCardProps {
  movie: Movie;
  genres: Genre[];
}

export const MoviesListCard: React.FC<MoviesListCardProps> = ({ movie, genres }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="movie-card">
      <PosterPreview posterPath={movie.poster_path} title={movie.title} />
      <MovieInfo
        title={movie.title}
        description={movie.overview}
        rating={movie.vote_average}
        releaseDate={movie.release_date}
        genreIds={movie.genre_ids}
        genres={genres}
      />
    </Link>
  );
};
