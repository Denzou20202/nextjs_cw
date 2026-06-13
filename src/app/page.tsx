import { MoviesPageView } from "../components/MoviesPage/MoviesPage";
import { getGenres, getMovies, searchMovies } from "../services/api.service";

interface HomeProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const getParam = (
  params: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = Math.max(1, parseInt(getParam(params, 'page') ?? '1', 10) || 1);
  const query = getParam(params, 'q') ?? '';
  const genre = getParam(params, 'genre');
  const filters = {
    genre: genre ? parseInt(genre, 10) : undefined,
    year: getParam(params, 'year'),
    sortBy: getParam(params, 'sortBy'),
  };

  const flatSearchParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    const v = Array.isArray(value) ? value[0] : value;
    if (v !== undefined) flatSearchParams[key] = v;
  }

  let movies: Awaited<ReturnType<typeof getMovies>>['results'] = [];
  let genres: Awaited<ReturnType<typeof getGenres>>['genres'] = [];
  let totalPages = 0;
  let error: string | null = null;

  try {
    const [moviesData, genresData] = await Promise.all([
      query ? searchMovies(query, page) : getMovies(page, filters),
      getGenres(),
    ]);
    movies = moviesData.results;
    totalPages = moviesData.total_pages;
    genres = genresData.genres;
  } catch {
    error = 'Failed to load movies';
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <MoviesPageView
      movies={movies}
      genres={genres}
      page={page}
      totalPages={totalPages}
      searchQuery={query}
      filters={filters}
      searchParams={flatSearchParams}
    />
  );
}
