'use client';

import React, { useCallback, useSyncExternalStore } from 'react';
import '../StarsRating/StarsRating.css';

interface RatingWidgetProps {
  movieId: string;
  initialRating: number;
}

const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

const getServerSnapshot = () => null;

export const RatingWidget: React.FC<RatingWidgetProps> = ({ movieId, initialRating }) => {
  const storageKey = `movie-rating-${movieId}`;

  const getSnapshot = useCallback(() => localStorage.getItem(storageKey), [storageKey]);
  const savedRating = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rating = savedRating !== null ? parseFloat(savedRating) : initialRating;

  const handleStarClick = useCallback(
    (index: number) => {
      const newRating = ((index + 1) / 5) * 10;
      localStorage.setItem(storageKey, newRating.toString());
      notify();
    },
    [storageKey],
  );

  const displayRating = Math.round((rating / 10) * 5);
  const stars = Array.from({ length: 5 }, (_, i) => i < displayRating);

  return (
    <div className="stars-rating">
      {stars.map((isFilled, index) => (
        <span
          key={index}
          className={`star ${isFilled ? 'filled' : 'empty'} interactive`}
          onClick={() => handleStarClick(index)}
        >
          ★
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)}/10</span>
    </div>
  );
};
