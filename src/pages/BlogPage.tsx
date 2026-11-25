import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, Palette } from 'lucide-react';

const JOURNAL_POSTS = [
  {
    id: 'slow-cure-resin-chemistry',
    category: 'Atelier Craft',
    readTime: '4 min read',
    title: 'Inside Our 72-Hour Slow-Cure Resin Layering Process',
    excerpt:
      'Discover how multi-stage degassing, UV-stabilized museum resin, and raw mineral pigments create bubble-free depth and glass-like brilliance in every timepiece.',
    image: '/images/products/da818ee20766a8244b4a924dd001d4c1.png',
    link: '/shop?category=wall-clocks',
    cta: 'Explore Resin Wall Clocks',
  },
  {
    id: 'preserving-bridal-botanicals',
    category: 'Botanical Preservation',
    readTime: '5 min read',
    title: 'Preserving Wedding Florals & Sentimental Keepsakes',
    excerpt:
      'Learn how our artisans dehydrate and encapsulate rose petals, baby’s breath, and ceremonial blooms without losing natural color or delicate petal texture.',
    image: '/images/products/07892a59117c401b49ffdf42a9986e04.jpg',
    link: '/custom-design',
    cta: 'Commission Floral Keepsake',
  },
  {
    id: 'styling-handcrafted-decor',
    category: 'Home Styling',
    readTime: '3 min read',
    title: 'Styling Earthy Warmth: Geodes, Gold Foil & Ambient Lighting',
    excerpt:
      'Pair warm espresso wood tones, gilded ceremonial platters, and textured resin artwork to bring handcrafted character to modern living spaces.',
    image: '/images/products/3e6d457c07029e2fd6904cf4b7beb11a.png',
    link: '/shop?category=ceremonial-decor',
    cta: 'Browse Home Décor',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="bg-[#F4EBDD] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#B69B7D]/50 text-[#8E7356] text-xs font-semibold uppercase tracking-[0.22em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C87552]" />
            <span>Rohan Craft House Journal</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#30231F]">
            Stories of Craft &amp; Form
          </h1>
          <p className="font-serif-luxury text-lg text-[#56443E] mt-3 leading-relaxed">
            Studio notes, material deep-dives, and styling guides straight from our artisan workbench.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#B69B7D]/45 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F9F5EE] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F4EBDD]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#30231F] border border-white/60">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8E7356] font-medium mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-editorial text-xl font-bold text-[#30231F] leading-snug mb-3 group-hover:text-[#C87552] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#56443E] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  to={post.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C87552] hover:text-[#B05E3D] pt-3 border-t border-[#B69B7D]/25"
                >
                  <span>{post.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Custom Commission Callout */}
        <div className="mt-16 bg-[#30231F] text-[#F4EBDD] rounded-3xl p-8 sm:p-10 border border-[#B69B7D]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div className="flex items-start gap-4 max-w-xl">
            <div className="p-3 rounded-2xl bg-[#221815] border border-[#B69B7D]/50 text-[#C87552] shrink-0">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-white">
                Have a Custom Vision in Mind?
              </h3>
              <p className="text-xs sm:text-sm text-[#F4EBDD]/80 mt-1.5 leading-relaxed">
                Collaborate directly with our studio makers for custom sizes, preserved wedding blooms, engraved gifts, or curated palette pieces.
              </p>
            </div>
          </div>
          <Link
            to="/custom-design"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C87552] hover:bg-[#B05E3D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            <span>Start Custom Brief</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
