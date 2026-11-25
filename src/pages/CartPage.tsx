import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatters';
import { EmptyState } from '../components/common/EmptyState';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    totalItems,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    finalTotal,
    isFreeShipping,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-[#F4EBDD] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <EmptyState
          icon={ShoppingBag}
          title="Your Artisan Cart is Empty"
          description="Explore our gallery of luxury resin clocks, floral jewelry suites, and auspicious pooja platters to begin your bespoke collection."
          actionLabel="Explore Gallery"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="bg-[#F4EBDD] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8E7356] font-bold">
              Shopping Consignment
            </span>
            <h1 className="font-display text-3xl font-bold text-[#30231F] mt-1">
              Your Curated Bag ({totalItems} {totalItems === 1 ? 'Piece' : 'Pieces'})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#8E7356] hover:text-[#C87552] transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Progress Notification */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-[#B69B7D]/50 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center gap-2 text-[#30231F]">
              <Truck className="w-4 h-4 text-[#C87552]" />
              {isFreeShipping ? (
                <span>Unlocked Complimentary Express Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-[#C87552]">{formatCurrency(amountNeededForFreeShipping)}</strong> more to unlock Free Express Delivery
                </span>
              )}
            </span>
            <span className="text-[#8E7356]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#F4EBDD] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#C87552] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white rounded-2xl border border-[#B69B7D]/40 shadow-sm gap-4 transition-all hover:border-[#B69B7D]"
              >
                {/* Image & Basic Details */}
                <div className="flex items-center gap-4 flex-1">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F9F5EE] shrink-0 border border-[#B69B7D]/30"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8E7356] font-bold">
                      {item.product.category_name}
                    </span>
                    <Link to={`/product/${item.product.slug}`}>
                      <h3 className="font-serif-luxury text-base font-semibold text-[#30231F] hover:text-[#C87552] line-clamp-1 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.selectedVariant && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#F4EBDD] text-[11px] text-[#56443E] border border-[#B69B7D]/40 mt-1">
                        {item.selectedVariant}
                      </span>
                    )}
                    <div className="text-xs font-bold text-[#30231F] mt-1.5 sm:hidden">
                      {formatCurrency(item.product.price)} each
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#B69B7D]/25">
                  <div className="flex items-center border border-[#B69B7D]/60 rounded-xl bg-[#F9F5EE] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1.5 text-[#56443E] hover:text-[#30231F] font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-[#30231F] min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1.5 text-[#56443E] hover:text-[#30231F] font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[5rem]">
                    <span className="font-display text-base font-bold text-[#30231F]">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 text-[#8E7356] hover:text-[#C87552] rounded-lg hover:bg-[#F4EBDD] transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-between items-center text-xs text-[#56443E]">
              <Link to="/shop" className="hover:text-[#C87552] font-semibold flex items-center gap-1 transition-colors">
                &larr; Continue Exploring Gallery
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#B69B7D]/45 shadow-sm sticky top-28">
            <h3 className="font-display text-lg font-bold text-[#30231F] pb-4 mb-4 border-b border-[#B69B7D]/25">
              Summary of Investment
            </h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-[#56443E]">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-[#30231F]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#56443E]">
                <span>Artisan Wooden Crate & Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-[#C87552] font-bold uppercase tracking-wider">Free</span>
                  ) : (
                    <span className="font-semibold text-[#30231F]">{formatCurrency(shippingFee)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[#56443E]">
                <span>Transit Insurance</span>
                <span className="text-[#C87552] font-bold uppercase tracking-wider">Included</span>
              </div>
              <div className="flex justify-between text-[#56443E]">
                <span>Applicable Taxes (GST)</span>
                <span className="text-[#8E7356]">Inclusive</span>
              </div>

              <div className="pt-4 mt-2 border-t border-[#B69B7D]/30 flex justify-between items-baseline">
                <div>
                  <span className="font-display text-sm font-bold text-[#30231F]">Total Investment</span>
                  <p className="text-[10px] text-[#8E7356]">Final checkout price</p>
                </div>
                <span className="font-display text-2xl font-bold text-[#30231F]">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="mt-6 pt-4 border-t border-[#B69B7D]/25 space-y-2 text-[11px] text-[#56443E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C87552]" />
                <span>Encrypted 256-bit Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C87552]" />
                <span>Certificate of Authenticity with each order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

