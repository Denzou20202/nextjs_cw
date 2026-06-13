import './StarsRating.css';

interface StarsRatingProps {
  rating: number;
}

export const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
  const displayRating = Math.round((rating / 10) * 5);
  const stars = Array.from({ length: 5 }, (_, i) => i < displayRating);

  return (
    <div className="stars-rating">
      {stars.map((isFilled, index) => (
        <span key={index} className={`star ${isFilled ? 'filled' : 'empty'}`}>
          ★
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)}/10</span>
    </div>
  );
};
