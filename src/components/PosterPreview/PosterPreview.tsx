import './PosterPreview.css';

interface PosterPreviewProps {
  posterPath: string | null;
  title: string;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ posterPath, title }) => {
  if (!posterPath) {
    return (
      <div className="poster-preview poster-placeholder">
        <div className="poster-placeholder-content">
          <span>No Image</span>
        </div>
      </div>
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="poster-preview">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={title} className="poster-image" />
    </div>
  );
};
