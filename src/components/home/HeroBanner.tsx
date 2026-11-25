import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

interface HeroSlide {
  id: string;
  scriptIntro: string;
  titlePrimary: string;
  titleAccent: string;
  tagline: string;
  supporting: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
  imageAlt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'signature-atelier',
    scriptIntro: 'Welcome to',
    titlePrimary: 'Rohan',
    titleAccent: 'Craft House',
    tagline: 'Craft  •  Create  •  Celebrate',
    supporting: 'Handcrafted with creativity & care',
    ctaLabel: 'Explore Our Collection',
    ctaTo: '/shop',
    image: '/images/showcase/hero-artisan-studio.jpg',
    imageAlt: 'Rohan Craft House handmade floral resin art, jewellery and warm soy candle arrangement',
  },
  {
    id: 'geode-timepieces',
    scriptIntro: 'Signature Artistry',
    titlePrimary: 'Resin &',
    titleAccent: 'Geode Clocks',
    tagline: '72-Hour Cure  •  24K Leaf  •  Original',
    supporting: 'Museum-grade quartz & crystal wall art',
    ctaLabel: 'Shop Resin Art',
    ctaTo: '/shop?category=wall-clocks',
    image: '/images/products/da818ee20766a8244b4a924dd001d4c1.png',
    imageAlt: 'Handcrafted 24K gold crystal geode resin wall clock',
  },
  {
    id: 'botanical-keepsakes',
    scriptIntro: 'Bespoke Keepsakes',
    titlePrimary: 'Botanical',
    titleAccent: 'Jewellery & Gifts',
    tagline: 'Real Blooms  •  Fine Detail  •  Timeless',
    supporting: 'Preserved floral jewellery & custom treasures',
    ctaLabel: 'Browse Jewellery',
    ctaTo: '/shop?category=jewelry-sets',
    image: '/images/products/07892a59117c401b49ffdf42a9986e04.jpg',
    imageAlt: 'Preserved blush floral resin jewelry suite',
  },
];

export const HeroBanner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[activeSlide];

  return (
    <section
      aria-label="Hero Showcase"
      className="relative overflow-hidden bg-[#30231F] text-[#F4EBDD] border-b border-[#B69B7D]/30"
    >
      {/* Desktop right-aligned full-bleed warm studio photograph with seamless left Espresso blend */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[68%] pointer-events-none select-none">
        <img
          key={current.image}
          src={current.image}
          alt={current.imageAlt}
          className="w-full h-full object-cover object-center transition-opacity duration-700"
        />
        {/* Smooth Espresso fade from left text zone into luminous right composition */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #30231F 0%, rgba(48,35,31,0.96) 14%, rgba(48,35,31,0.72) 34%, rgba(48,35,31,0.12) 60%, rgba(48,35,31,0.05) 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#30231F]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#30231F]/65 to-transparent" />
      </div>

      {/* Subtle warm radial lighting glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-[420px] h-[420px] rounded-full bg-[#C87552]/10 blur-3xl"
      />

      {/* Decorative delicate left botanical line-art SVGs */}
      <svg
        aria-hidden="true"
        className="pointer-events-none hidden sm:block absolute top-3 left-0 w-24 h-44 text-[#B69B7D]/35 z-10"
        viewBox="0 0 110 200"
        fill="none"
      >
        <path
          d="M-6 12 C28 32 54 64 56 108 M18 32 C38 28 56 36 62 52 C42 54 28 46 18 32 Z M30 62 C52 56 72 68 74 86 C54 88 38 78 30 62 Z M10 74 C24 88 26 108 14 122 C4 108 4 88 10 74 Z M38 98 C56 96 68 112 62 128 C46 124 38 112 38 98 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <svg
        aria-hidden="true"
        className="pointer-events-none hidden sm:block absolute bottom-2 left-0 w-28 h-36 text-[#B69B7D]/35 z-10"
        viewBox="0 0 120 150"
        fill="none"
      >
        <path
          d="M-6 144 C26 112 42 74 44 28 M24 96 C46 82 68 88 76 106 C54 114 34 108 24 96 Z M10 118 C22 130 20 146 6 150 M34 62 C48 44 70 40 82 54 C66 68 48 68 34 62 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 lg:py-20 min-h-[430px] lg:min-h-[500px] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Editorial Composition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-xl">
            <span className="font-script text-4xl sm:text-5xl text-[#DFC29E] leading-none mb-1 drop-shadow-sm">
              {current.scriptIntro}
            </span>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] mt-1">
              <span className="text-white">{current.titlePrimary} </span>
              <span className="text-[#E8D5BC] font-semibold">{current.titleAccent}</span>
            </h1>

            {/* Ornamental divider with center 4-point sparkle */}
            <div className="flex items-center gap-3 w-full max-w-[340px] my-4">
              <span className="h-px flex-1 bg-gradient-to-r from-[#B69B7D]/20 via-[#B69B7D]/70 to-[#B69B7D]" />
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5 text-[#DFC29E] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <span className="h-px flex-1 bg-gradient-to-l from-[#B69B7D]/20 via-[#B69B7D]/70 to-[#B69B7D]" />
            </div>

            <p className="font-editorial text-xl sm:text-2xl text-[#F4EBDD] tracking-wide mb-2">
              {current.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#F4EBDD]/85 flex items-center gap-2 mb-7 font-light">
              <span>{current.supporting}</span>
              <Heart className="w-3.5 h-3.5 text-[#F4EBDD] fill-[#F4EBDD] shrink-0" />
            </p>

            {/* Primary Terracotta Pill CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={current.ctaTo}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C87552] hover:bg-[#B05E3D] text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-luxury-hover hover:-translate-y-0.5"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile / Tablet Visual Showcase Card */}
          <div className="lg:hidden relative rounded-2xl overflow-hidden border border-[#B69B7D]/45 shadow-xl aspect-[16/10] bg-[#221815]">
            <img
              src={current.image}
              alt={current.imageAlt}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#30231F]/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Bottom-left carousel pagination dots */}
        <div
          className="mt-8 lg:mt-10 flex items-center gap-2"
          role="tablist"
          aria-label="Hero showcase slides"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={idx === activeSlide}
              aria-label={`Show slide ${idx + 1}: ${slide.titlePrimary} ${slide.titleAccent}`}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeSlide
                  ? 'w-2.5 bg-white shadow-sm'
                  : 'w-2.5 border border-white/60 bg-transparent hover:bg-white/35'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
