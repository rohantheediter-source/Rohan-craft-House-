import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Layers,
  Clock,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Product } from '../types';
import { productsService } from '../services/productsService';
import { formatCurrency } from '../utils/formatters';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/common/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductCustomizeModal } from '../components/product/ProductCustomizeModal';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('Standard Artisan Edition');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const found = await productsService.getProductBySlug(slug);
        if (isMounted && found) {
          setProduct(found);
          setSelectedImage(found.image || (found.images && found.images[0]) || '');
          setQuantity(1);

          // Load related products
          const allInCat = await productsService.getProducts(found.category_slug);
          if (isMounted) {
            setRelatedProducts(allInCat.filter((p) => p.id !== found.id).slice(0, 4));
          }
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-24">
        <LoadingSpinner label="Revealing artisanal details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-display text-2xl font-bold text-neutral-800 mb-4">Masterpiece Not Found</h2>
        <p className="text-neutral-500 mb-6">
          The requested resin artwork may have been retired or moved to the private archive.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#C87552] hover:bg-[#B05E3D] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
        >
          Return to Gallery
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const clockVariants = ['14 Inches (Standard)', '16 Inches (Grand Salon)', '18 Inches (Statement)'];
  const jewelryVariants = ['Gold-Plated Findings', 'Sterling Silver Findings'];
  const isClock = product.category_slug === 'wall-clocks';
  const variants = isClock ? clockVariants : jewelryVariants;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/cart');
  };

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8E7356] uppercase tracking-wider mb-8">
          <Link to="/" className="hover:text-[#C87552]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B69B7D]" />
          <Link to="/shop" className="hover:text-[#C87552]">Gallery</Link>
          {product.category_slug && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#B69B7D]" />
              <Link to={`/shop?category=${product.category_slug}`} className="hover:text-[#C87552]">
                {product.category_name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[#B69B7D]" />
          <span className="text-[#30231F] font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-[#B69B7D]/40 shadow-luxury mb-16">
          {/* Left: Gallery & Zoom Display */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Row/Column */}
            {product.images && product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-[#C87552] shadow-md scale-95' : 'border-[#B69B7D]/40 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F9F5EE] border border-[#B69B7D]/35 shadow-inner group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-[#30231F] text-[#F4EBDD] text-[10px] font-bold uppercase tracking-widest border border-[#B69B7D]/50 shadow-sm">
                    Signature Atelier
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[#C87552] text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {discountPercent}% Savings
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                  inWishlist
                    ? 'bg-[#F4EBDD] text-[#C87552] border border-[#C87552]'
                    : 'bg-white/90 text-[#30231F] hover:text-[#C87552] hover:bg-white border border-[#B69B7D]/40'
                }`}
                title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#C87552]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Product Purchase Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#8E7356] font-bold mb-2">
                <span>{product.category_name}</span>
                <span className="text-[#8E7356] font-mono text-[11px]">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#30231F] mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B69B7D]/30">
                <RatingStars rating={product.rating || 5.0} count={product.review_count || 12} size="md" />
                <span className="text-xs text-[#B69B7D]">•</span>
                <span className="text-xs text-[#30231F] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#C87552]" /> Verified Atelier Original
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-3xl font-bold text-[#30231F]">
                  {formatCurrency(product.price)}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-base text-[#8E7356] line-through">
                    {formatCurrency(product.compare_at_price)}
                  </span>
                )}
                <span className="text-xs text-[#56443E]">Taxes included</span>
              </div>

              {/* Description Snippet */}
              <p className="text-sm text-[#56443E] leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest font-bold text-[#30231F] mb-2">
                  Select Dimension / Finish:
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        selectedVariant === v
                          ? 'bg-[#C87552] text-white shadow-sm'
                          : 'bg-[#F4EBDD] text-[#30231F] border border-[#B69B7D]/45 hover:border-[#C87552]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Stock */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-[#B69B7D]/60 rounded-xl bg-[#F9F5EE] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-[#56443E] hover:text-[#30231F] font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-[#30231F] min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    className="px-3.5 py-2 text-[#56443E] hover:text-[#30231F] font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs">
                  {product.stock > 0 ? (
                    <span className="text-[#30231F] font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C87552] animate-pulse" />
                      In Studio Stock ({product.stock} units available)
                    </span>
                  ) : (
                    <span className="text-[#C87552] font-bold">
                      Made To Order (5-7 days crafting time)
                    </span>
                  )}
                </div>
              </div>

              {/* Option A: Customize This Product Button & Bespoke Banner */}
              <div className="mb-6 p-4 rounded-2xl bg-[#F4EBDD] border border-[#B69B7D]/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C87552]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#30231F]">
                      Need Bespoke Colors or Sizing?
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C87552] bg-white px-2.5 py-0.5 rounded-full border border-[#B69B7D]/40">
                    Bespoke Available
                  </span>
                </div>
                <p className="text-xs text-[#56443E] leading-relaxed">
                  Personalize with custom color palettes, specific wall dimensions, or golden family name inscriptions.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCustomizeModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-[#F9F5EE] text-[#30231F] font-display text-xs font-bold uppercase tracking-[0.16em] transition-all border border-[#B69B7D] hover:border-[#C87552] shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#C87552]" />
                  <span>Customize This Product</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Add To Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#30231F] hover:bg-[#221815] text-white font-display text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md disabled:opacity-50"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Assurance Perks */}
            <div className="pt-6 border-t border-[#B69B7D]/30 grid grid-cols-2 gap-4 text-xs text-[#56443E]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#C87552] shrink-0" />
                <span>Complimentary Wooden Crate Shipping</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C87552] shrink-0" />
                <span>Transit Insurance Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Specifications & Care */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B69B7D]/40 shadow-sm mb-20">
          <div className="flex border-b border-[#B69B7D]/30 gap-8 mb-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'details'
                  ? 'border-[#C87552] text-[#C87552]'
                  : 'border-transparent text-[#8E7356] hover:text-[#30231F]'
              }`}
            >
              Artisanal Story
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#C87552] text-[#C87552]'
                  : 'border-transparent text-[#8E7356] hover:text-[#30231F]'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'care'
                  ? 'border-[#C87552] text-[#C87552]'
                  : 'border-transparent text-[#8E7356] hover:text-[#30231F]'
              }`}
            >
              Care & Longevity
            </button>
          </div>

          <div className="font-sans text-sm text-[#56443E] leading-relaxed">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <p>{product.story || 'Handcrafted in our boutique art studio. Each layer is poured with artist-grade non-yellowing epoxy resin, carefully cured over 72 hours, and polished by hand for a flawless liquid-glass luster.'}</p>
                <p>
                  Every artwork in the Rohan Craft House collection is made with high-clarity optical resin, 24K gold foil minerals, and naturally preserved flora. Because each step is executed by hand, slight natural variations in veining and floral geometry are celebrated hallmarks of authentic art.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F4EBDD] border border-[#B69B7D]/40">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8E7356] font-bold mb-1">Dimensions</span>
                  <p className="font-semibold text-[#30231F]">{product.dimensions || 'Custom Artisan Proportions'}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F4EBDD] border border-[#B69B7D]/40">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8E7356] font-bold mb-1">Core Materials</span>
                  <p className="font-semibold text-[#30231F]">{product.material || 'Optical Grade UV Epoxy, Gold Minerals'}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F4EBDD] border border-[#B69B7D]/40">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8E7356] font-bold mb-1">Curing Chamber Cycle</span>
                  <p className="font-semibold text-[#30231F]">{product.cure_time || '72 Hours Multi-Stage Curing'}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F4EBDD] border border-[#B69B7D]/40">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8E7356] font-bold mb-1">Crafting Origin</span>
                  <p className="font-semibold text-[#30231F]">Rohan Craft House Artisan Atelier, India</p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <p className="font-semibold text-[#30231F]">To maintain the crystal clarity and luster of your resin piece:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#56443E]">
                  <li>Gently dust using a dry, ultra-soft microfiber cloth.</li>
                  <li>Avoid using abrasive sponges, harsh alcohol, ammonia, or chemical window cleaners.</li>
                  <li>Although our formula contains premium UV inhibitors, avoid prolonged direct outdoor desert sunlight to preserve pigments for decades.</li>
                  <li>For wall clocks, handle with clean hands when hanging; the clock mechanism is delicate quartz sweep.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="mb-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#8E7356] font-bold">Harmonious Pairings</span>
                <h3 className="font-display text-2xl font-bold text-[#30231F] mt-1">
                  More From {product.category_name}
                </h3>
              </div>
              <Link
                to={`/shop?category=${product.category_slug}`}
                className="text-xs font-bold uppercase tracking-wider text-[#30231F] hover:text-[#C87552] transition-colors"
              >
                View Category &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {/* Bespoke Product Customization Modal */}
        <ProductCustomizeModal
          product={product}
          selectedVariant={selectedVariant}
          isOpen={isCustomizeModalOpen}
          onClose={() => setIsCustomizeModalOpen(false)}
        />
      </div>
    </div>
  );
};


