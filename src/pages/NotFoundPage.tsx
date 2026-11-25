import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#F4EBDD] min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#30231F] text-[#F4EBDD] border border-[#B69B7D] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Sparkles className="w-8 h-8 text-[#C87552]" />
        </div>
        <span className="font-display text-5xl font-bold text-[#C87552] block mb-2">404</span>
        <h1 className="font-display text-2xl font-bold text-[#30231F] mb-3">
          Gallery Page Not Found
        </h1>
        <p className="font-serif-luxury text-base text-[#56443E] mb-8">
          The curated room or artwork URL you are attempting to reach does not exist in our catalog or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-[0.16em] shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Main Gallery</span>
        </Link>
      </div>
    </div>
  );
};

