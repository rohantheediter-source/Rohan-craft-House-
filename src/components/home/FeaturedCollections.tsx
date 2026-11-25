import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CuratedCard {
  id: string;
  name: string;
  image: string;
  alt: string;
  href: string;
}

const CURATED_COLLECTIONS: CuratedCard[] = [
  {
    id: 'resin-art',
    name: 'Resin Art',
    image: '/images/products/da818ee20766a8244b4a924dd001d4c1.png',
    alt: 'Handcrafted crystal geode and pressed floral resin art pieces',
    href: '/shop?category=wall-clocks',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    image: '/images/products/07892a59117c401b49ffdf42a9986e04.jpg',
    alt: 'Artisanal floral resin earrings, necklaces and keepsake suites',
    href: '/shop?category=jewelry-sets',
  },
  {
    id: 'gifts',
    name: 'Gifts',
    image: '/images/showcase/collection-gifts.jpg',
    alt: 'Curated handcrafted gift boxes and personalized keepsakes',
    href: '/shop?collection=gifts',
  },
  {
    id: 'cups',
    name: 'Cups',
    image: '/images/showcase/collection-cups.jpg',
    alt: 'Handcrafted ceramic cups, tabletop drinkware and resin coasters',
    href: '/shop?collection=cups',
  },
  {
    id: 'home-decor',
    name: 'Home Décor',
    image: '/images/showcase/collection-home-decor.jpg',
    alt: 'Warm ambient table decor, lamps and ceremonial platters',
    href: '/shop?category=ceremonial-decor',
  },
];

export const FeaturedCollections: React.FC = () => {
  return (
    <section
      id="collections"
      className="relative py-12 sm:py-16 bg-[#FAF6F0] border-b border-[#B69B7D]/25 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header matching reference with symmetrical flanking lines & diamonds */}
        <div className="text-center mb-9 sm:mb-11">
          <div className="flex items-center justify-center gap-3 sm:gap-5 max-w-2xl mx-auto">
            <div className="hidden sm:flex items-center flex-1">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B69B7D]/70" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#B69B7D] shrink-0" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#30231F]">
              Our Collections
            </h2>
            <div className="hidden sm:flex items-center flex-1">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#B69B7D] shrink-0" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B69B7D]/70" />
            </div>
          </div>
          <p className="text-sm text-[#56443E] mt-1.5">
            Discover handcrafted treasures for every occasion
          </p>
        </div>

        {/* Responsive 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CURATED_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={col.href}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#B69B7D]/40 shadow-sm hover:shadow-luxury-hover transition-all duration-500"
            >
              <img
                src={col.image}
                alt={col.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#30231F]/45 via-[#30231F]/10 to-transparent pointer-events-none" />

              {/* Frosted Champagne Pill Button */}
              <div className="absolute bottom-3 inset-x-3 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4EBDD]/92 backdrop-blur-md border border-white/75 text-xs font-semibold text-[#30231F] shadow-md group-hover:bg-[#C87552] group-hover:text-white group-hover:border-[#C87552] transition-all duration-300">
                  <span>{col.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
