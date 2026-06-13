import type { Genre } from '../../models/movie';
import { GenreBadge } from '../GenreBadge/GenreBadge';
import { StarsRating } from '../StarsRating/StarsRating';
import './MovieInfo.css';

interface MovieInfoProps {
  title: string;
  description: string;
  rating: number;
  releaseDate: string;
  genreIds: number[];
  genres: Genre[];
}

export const MovieInfo: React.FC<MovieInfoProps> = ({
  title,
  description,
  rating,
  releaseDate,
  genreIds,
  genres,
}) => {
  const movieGenres = genres.filter((g) => genreIds.includes(g.id)).map((g) => g.name);
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';

  return (
    <div className="movie-info">
      <h3 className="movie-title">{title}</h3>
      <div className="movie-meta">
        <span className="release-date">{year}</span>
        <StarsRating rating={rating} />
      </div>
      <div className="genres">
        {movieGenres.map((genre) => (
          <GenreBadge key={genre} genre={genre} />
        ))}
      </div>
      <p className="movie-description">{description}</p>
    </div>
  );
};
