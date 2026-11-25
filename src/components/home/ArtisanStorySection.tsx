import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ArtisanStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-[#30231F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#B69B7D]/50 shadow-luxury">
                <img
                  src="/images/products/07892a59117c401b49ffdf42a9986e04.jpg"
                  alt="Artisan Jewelry Atelier"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Secondary Card */}
              <div className="absolute -bottom-8 -right-6 w-44 sm:w-52 aspect-square rounded-2xl overflow-hidden border-2 border-[#B69B7D] shadow-luxury hidden sm:block bg-white">
                <img
                  src="/images/products/05427a2e05e9d375217863c851519f85.jpg"
                  alt="Ceremonial Resin Art"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating quote badge */}
              <div className="absolute -top-6 -left-6 p-4 rounded-2xl glass-dark border border-[#B69B7D]/50 shadow-xl max-w-[200px]">
                <Sparkles className="w-4 h-4 text-[#C87552] mb-1" />
                <p className="text-[11px] font-serif-luxury italic text-[#F4EBDD]">
                  "Where fleeting blooms become eternal liquid gemstones."
                </p>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8E7356] font-bold">
              The Rohan Craft House Atelier
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30231F] mt-3 mb-6 leading-tight">
              An Alchemical Romance of <br />
              <span className="earthy-gradient-text">Nature and Liquid Glass</span>
            </h2>

            <div className="space-y-4 font-serif-luxury text-base sm:text-lg text-[#56443E] leading-relaxed mb-8">
              <p>
                Founded upon the belief that true luxury is born in patience and reverence, <strong className="text-[#30231F]">Rohan Craft House</strong> transforms natural organic blossoms, raw crystal minerals, and pure gold mica into enduring bespoke treasures.
              </p>
              <p>
                Every wall clock and heirloom pendant undergoes an unhurried casting ritual: hand-foraged botanicals dehydrated in specialized silica for two weeks, cast in optical-grade UV-resistant resin, and cured in temperature-regulated drying chambers for 72 hours.
              </p>
              <p>
                No two pieces ever emerge identical. The natural flow of resin, the natural grain of mineral crystals, and the hand-painted metallic veins ensure that the work in your home remains an irreplaceable original.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md"
              >
                <span>Read Full Atelier Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#30231F] hover:bg-[#221815] text-white font-display text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-sm"
              >
                <span>Book Wedding Flower Preservation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

