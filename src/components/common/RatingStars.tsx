import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating?: number;
  count?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 5.0,
  count,
  showCount = true,
  size = 'sm',
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5 text-xs text-[#56443E]">
      <div className="flex items-center text-[#C87552]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-[#C87552] text-[#C87552]'
                : 'fill-[#F4EBDD] text-[#B69B7D]/60'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="font-medium text-[#56443E] ml-1">
          {rating.toFixed(1)} {count !== undefined && <span className="text-[#8E7356]">({count})</span>}
        </span>
      )}
    </div>
  );
};

