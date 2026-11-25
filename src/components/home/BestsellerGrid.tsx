import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';

interface BestsellerGridProps {
  products: Product[];
}

export const BestsellerGrid: React.FC<BestsellerGridProps> = ({ products }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { label: 'All Curations', value: 'all' },
    { label: 'Wall Clocks', value: 'wall-clocks' },
    { label: 'Jewelry & Sets', value: 'jewelry-sets' },
    { label: 'Ceremonial Platters', value: 'ceremonial-decor' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'all') return p.is_featured || p.is_bestseller;
    return p.category_slug === selectedFilter;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-[#F4EBDD] border-y border-[#B69B7D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8E7356] font-bold">
              Artisan Signature
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#30231F] mt-2">
              Bespoke Masterpieces
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedFilter === tab.value
                    ? 'bg-[#C87552] text-white shadow-sm'
                    : 'bg-white text-[#30231F] hover:text-[#C87552] border border-[#B69B7D]/40 hover:border-[#C87552]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#30231F] hover:bg-[#221815] text-white font-display text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View All {products.length} Handcrafted Works</span>
            <ArrowRight className="w-4 h-4 text-[#F4EBDD]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

