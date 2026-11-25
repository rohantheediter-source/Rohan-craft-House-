import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Palette, Layers, Award } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER } from '../../utils/constants';

export const BespokeCommissionBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#30231F] text-[#F4EBDD] relative overflow-hidden border-y border-[#B69B7D]/30">
      {/* Subtle warm luxury glow backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C87552]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B69B7D]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Story & Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#221815] border border-[#B69B7D]/60 text-[#F4EBDD] text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C87552]" />
              <span>Bespoke Atelier Commissions</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Have a Specific Vision in Mind? <br />
              <span className="text-[#F4EBDD]">We Handcraft It Exclusively For You.</span>
            </h2>

            <p className="font-serif-luxury text-base sm:text-lg text-[#F4EBDD]/85 leading-relaxed max-w-2xl">
              Whether you wish to preserve sacred wedding varmala flowers, customize an oversized geode clock to match your living room walls, or commission a raw crystal river table — our master artisans bring your imagination into permanent, liquid-crystal form.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#F4EBDD]">
                <Palette className="w-4 h-4 text-[#C87552] shrink-0" />
                <span>Custom Color Matching</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4EBDD]">
                <Layers className="w-4 h-4 text-[#C87552] shrink-0" />
                <span>Tailored Sizing & Depth</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F4EBDD]">
                <Award className="w-4 h-4 text-[#C87552] shrink-0" />
                <span>Gold Acrylic Inscriptions</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/custom-design"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:-translate-y-0.5"
              >
                <span>Request a Custom Design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-[#F4EBDD] font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-[#B69B7D]/50"
              >
                <span>Explore Ready Gallery</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-[#221815]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#B69B7D]/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#B69B7D]/25">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#30231F] border border-[#B69B7D] flex items-center justify-center text-[#C87552]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white tracking-wide">
                      Two Ways to Personalize
                    </h4>
                    <span className="text-[10px] text-[#B69B7D] uppercase tracking-wider">
                      Rohan Craft House Concierge
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-[#30231F] px-2.5 py-1 rounded-full text-[#F4EBDD] border border-[#B69B7D]/40">
                  Direct WhatsApp
                </span>
              </div>

              {/* Option Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#30231F] border border-[#B69B7D]/30 hover:border-[#C87552]/60 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#F4EBDD] uppercase tracking-wider">
                      Option A: Customize Any Product
                    </span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#221815] text-[#B69B7D]">
                      On Product Pages
                    </span>
                  </div>
                  <p className="text-xs text-[#F4EBDD]/80 leading-relaxed">
                    Pick any clock, jewelry, or platter and customize colorway, diameters, silent quartz hands, and gilded names.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#30231F] border border-[#B69B7D]/30 hover:border-[#C87552]/60 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#F4EBDD] uppercase tracking-wider">
                      Option B: New Bespoke Artwork
                    </span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#221815] text-[#B69B7D]">
                      Dedicated Page
                    </span>
                  </div>
                  <p className="text-xs text-[#F4EBDD]/80 leading-relaxed">
                    Commission an entirely new creation from scratch: send reference images, describe your dream concept, and receive manual pricing.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#F4EBDD]/75">
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Concierge: <strong className="text-white">{WHATSAPP_DISPLAY_NUMBER}</strong></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

