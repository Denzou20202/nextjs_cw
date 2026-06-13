import React from 'react';
import './GenreBadge.css';

interface GenreBadgeProps {
  genre: string;
}

const GenreBadgeComponent: React.FC<GenreBadgeProps> = ({ genre }) => {
  return <span className="genre-badge">{genre}</span>;
};

export const GenreBadge = React.memo(GenreBadgeComponent);
