import React from 'react';
import { Sparkles, Layers, ShieldCheck, Sun } from 'lucide-react';

export const CraftsmanshipProcess: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Botanical & Mineral Curation',
      desc: 'Real rose petals, ferns, and wildflowers are hand-foraged and preserved in moisture-wicking silica beds for 14 days to lock in vibrant natural hues.',
      icon: Sun,
    },
    {
      step: '02',
      title: 'Optical Polymer Blending',
      desc: 'We formulate low-VOC, UV-stabilized artist epoxy resin mixed with pearl mica powders, raw crystals, and metallic leaf gilding.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Multi-Tiered 72-Hour Curing',
      desc: 'Layered pours are cured in pressurized, dust-free chambers over multiple days, preventing bubbles and ensuring optical glass clarity.',
      icon: Sparkles,
    },
    {
      step: '04',
      title: 'Beveling & Archival Finishing',
      desc: 'Each edge is hand-beveled, polished with jeweler’s rouge, fitted with silent quartz sweep movements, and sealed against environmental moisture.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 bg-[#F4EBDD] border-y border-[#B69B7D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8E7356] font-bold">
            The Method
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#30231F] mt-2 mb-4">
            The 4-Stage Alchemical Process
          </h2>
          <p className="font-serif-luxury text-base sm:text-lg text-[#56443E]">
            Resin art is not simply poured; it is sculpted, tempered, and patiently guided into timeless equilibrium.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative bg-white rounded-2xl p-7 border border-[#B69B7D]/40 shadow-sm hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-2xl font-bold text-[#C87552]">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#30231F] border border-[#B69B7D]/40">
                      <Icon className="w-5 h-5 text-[#C87552]" />
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#30231F] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#56443E] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#B69B7D]/25">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E7356] font-semibold">
                    Studio Certified Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

