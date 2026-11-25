import React from 'react';
import { Gift, Gem, ShieldCheck, Headphones } from 'lucide-react';

const BENEFITS = [
  {
    icon: Gift,
    title: 'Premium Quality',
    subtitle: 'Handmade Products',
  },
  {
    icon: Gem,
    title: 'Unique & Creative',
    subtitle: 'Designs',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    subtitle: '& Safe Shopping',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    subtitle: 'Always Here',
  },
];

export const BenefitsStrip: React.FC = () => {
  return (
    <section
      aria-label="Store Benefits"
      className="relative bg-[#F4EBDD] border-b border-[#B69B7D]/35 overflow-hidden"
    >
      {/* Subtle botanical side accents matching editorial composition */}
      <svg
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute left-0 bottom-0 w-28 h-24 text-[#B69B7D]/45"
        viewBox="0 0 120 100"
        fill="none"
      >
        <path
          d="M-4 92 C24 72 44 52 54 24 M12 82 C20 62 34 52 48 54 M22 66 C10 56 8 42 18 32 C28 42 26 56 22 66 Z M42 46 C34 32 40 16 52 14 C56 28 50 40 42 46 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute right-0 bottom-0 w-28 h-24 text-[#B69B7D]/45 scale-x-[-1]"
        viewBox="0 0 120 100"
        fill="none"
      >
        <path
          d="M-4 92 C24 72 44 52 54 24 M12 82 C20 62 34 52 48 54 M22 66 C10 56 8 42 18 32 C28 42 26 56 22 66 Z M42 46 C34 32 40 16 52 14 C56 28 50 40 42 46 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#B69B7D]/35">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center justify-start sm:justify-center gap-3.5 py-3 sm:py-2 px-4 lg:px-6"
              >
                <div className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-sm border border-[#B69B7D]/40 flex items-center justify-center text-[#30231F] shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div className="leading-snug">
                  <p className="text-xs sm:text-[13px] font-semibold text-[#30231F]">
                    {item.title}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#56443E]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
