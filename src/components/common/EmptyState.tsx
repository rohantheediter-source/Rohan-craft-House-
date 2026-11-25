import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  actionHref = '/shop',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#C87552] mb-4 border border-[#B69B7D]/50 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-display text-xl font-semibold text-[#30231F] mb-2">{title}</h3>
      <p className="text-sm text-[#56443E] max-w-md mb-6">{description}</p>
      {actionLabel && (
        actionHref ? (
          <Link
            to={actionHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#C87552] text-white hover:bg-[#B05E3D] text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#C87552] text-white hover:bg-[#B05E3D] text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
};

