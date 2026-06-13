import { BackButton } from '../../../components/BackButton/BackButton';
import { GenreBadge } from '../../../components/GenreBadge/GenreBadge';
import { PosterPreview } from '../../../components/PosterPreview/PosterPreview';
import { RatingWidget } from '../../../components/RatingWidget/RatingWidget';
import { getGenres, getMovieDetails, getTrailer } from '../../../services/api.service';
import './MovieDetail.css';

interface MovieDetailProps {
  params: Promise<{ movieId: string }>;
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const { movieId } = await params;
  const id = parseInt(movieId, 10);

  if (isNaN(id)) {
    return <div className="error">Invalid movie ID</div>;
  }

  let movie;
  let genres;
  try {
    [movie, { genres }] = await Promise.all([getMovieDetails(id), getGenres()]);
  } catch {
    return <div className="error">Failed to load movie details</div>;
  }

  const movieGenres = genres.filter((g) => movie.genres?.some((mg) => mg.id === g.id));
  const trailer = getTrailer(movie.videos);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
      : null;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="movie-detail-page">
      <BackButton />
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: backdropUrl
            ? `url(${backdropUrl})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      <div className="movie-detail-content">
        <div className="movie-detail-header">
          <div className="movie-detail-wrapper">
            <div className="movie-poster-section">
              <PosterPreview posterPath={movie.poster_path} title={movie.title} />
            </div>
            <div className="movie-header-section">
              <h1 className="detail-title">{movie.title}</h1>
              <div className="detail-meta">
                <span className="release-year">{year}</span>
                <span className="runtime">{movie.runtime} min</span>
                <RatingWidget movieId={movieId} initialRating={movie.vote_average} />
              </div>
              <section className="overview-section">
                <h2>Overview</h2>
                <p>{movie.overview}</p>
              </section>
            </div>
          </div>
        </div>

        <div className="detail-genres">
          {movieGenres.map((genre) => (
            <GenreBadge key={genre.id} genre={genre.name} />
          ))}
        </div>

        {trailer && (
          <section className="trailer-section">
            <h2>Trailer</h2>
            <div className="trailer-frame">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <div className="detail-sections">
          {movie.budget > 0 && (
            <section className="detail-section">
              <h2>Budget</h2>
              <p>${movie.budget.toLocaleString()}</p>
            </section>
          )}

          {movie.revenue > 0 && (
            <section className="detail-section">
              <h2>Revenue</h2>
              <p>${movie.revenue.toLocaleString()}</p>
            </section>
          )}

          <section className="detail-section">
            <h2>Popularity</h2>
            <p>{movie.popularity.toFixed(2)}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
