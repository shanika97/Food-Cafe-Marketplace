import React from 'react';
import { StarIcon } from 'lucide-react';
type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
};
export function StarRating({
  rating,
  reviewCount,
  size = 'md',
  showCount = true
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <StarIcon
          key={i}
          className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />

      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <StarIcon className={`${sizeClasses[size]} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIcon
              className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />

          </div>
        </div>
      );
    } else {
      stars.push(
        <StarIcon key={i} className={`${sizeClasses[size]} text-gray-300`} />
      );
    }
  }
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">{stars}</div>
      {showCount &&
      <span className={`${textSizeClasses[size]} text-stone-600 ml-1`}>
          {rating.toFixed(1)}
          {reviewCount !== undefined &&
        <span className="text-stone-400"> ({reviewCount})</span>
        }
        </span>
      }
    </div>);

}