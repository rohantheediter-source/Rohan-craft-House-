import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Truck, RefreshCw, Award, Shield } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useToast } from '../../contexts/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await supabase.from('newsletter_subscribers').insert({ email: email.trim().toLowerCase() });
      setIsSubscribed(true);
      success('Thank you for joining the Rohan Craft House inner circle');
      setEmail('');
    } catch (_) {
      setIsSubscribed(true);
      success('Thank you for joining the Rohan Craft House inner circle');
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#30231F] text-[#F4EBDD] border-t border-[#B69B7D]/30">
      {/* Brand Value Pillars */}
      <div className="border-b border-[#B69B7D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#221815] text-[#C87552] border border-[#B69B7D]/35 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-[#F4EBDD] uppercase tracking-wider">Artisan Craftsmanship</h4>
                <p className="text-xs text-[#F4EBDD]/75 mt-1 leading-relaxed">Each creation is hand-poured, cured for 72+ hours, and meticulously gilded.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#221815] text-[#C87552] border border-[#B69B7D]/35 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-[#F4EBDD] uppercase tracking-wider">Complimentary Express</h4>
                <p className="text-xs text-[#F4EBDD]/75 mt-1 leading-relaxed">Free transit insurance and premium wooden crate packaging over ₹1,999.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#221815] text-[#C87552] border border-[#B69B7D]/35 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-[#F4EBDD] uppercase tracking-wider">Authentic Non-Yellowing</h4>
                <p className="text-xs text-[#F4EBDD]/75 mt-1 leading-relaxed">Museum-grade UV stabilizers ensure liquid clarity and crystal longevity.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#221815] text-[#C87552] border border-[#B69B7D]/35 shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-[#F4EBDD] uppercase tracking-wider">Bespoke Customization</h4>
                <p className="text-xs text-[#F4EBDD]/75 mt-1 leading-relaxed">Preserve wedding floral bouquets, customized names, and bespoke dimensions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img src="/logo.svg" alt="Rohan Craft House" className="w-10 h-10 shrink-0" />
              <div>
                <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#F4EBDD] group-hover:text-[#C87552] transition-colors">
                  Rohan Craft House
                </span>
                <span className="block text-[9px] uppercase tracking-[0.26em] text-[#B69B7D]">
                  Timeless Liquid Glass Artistry
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#F4EBDD]/80 leading-relaxed max-w-sm mb-6">
              Rohan Craft House elevates spaces and personal aesthetics through handcrafted luxury geode wall clocks, preserved botanical jewelry, and auspicious ceremonial platters. Every piece is an original reflection of pure devotion and artistic mastery.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-4">
              <h5 className="font-display text-xs uppercase tracking-widest text-[#F4EBDD] mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C87552]" />
                Join the Private Collector Circle
              </h5>
              <p className="text-[11px] text-[#B69B7D] mb-3">
                Receive private collection previews, custom commission windows, and artisanal insights.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#F4EBDD] bg-[#221815] p-3 rounded-xl border border-[#B69B7D]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#C87552]" />
                  <span>You are subscribed to the Rohan Craft House collector updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#221815] border border-[#B69B7D]/40 text-xs text-[#F4EBDD] placeholder-[#B69B7D]/70 focus:outline-none focus:border-[#C87552]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#C87552] text-white hover:bg-[#B05E3D] text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-[#F4EBDD] font-bold mb-4">
              Artisan Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4EBDD]/85">
              <li>
                <Link to="/shop?category=wall-clocks" className="hover:text-[#C87552] transition-colors">
                  Geode Wall Clocks
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jewelry-sets" className="hover:text-[#C87552] transition-colors">
                  Preserved Floral Jewelry
                </Link>
              </li>
              <li>
                <Link to="/shop?category=ceremonial-decor" className="hover:text-[#C87552] transition-colors">
                  Ceremonial & Pooja Platters
                </Link>
              </li>
              <li>
                <Link to="/shop?category=pendants-necklaces" className="hover:text-[#C87552] transition-colors">
                  Pendants & Keepsakes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bracelets-bangles" className="hover:text-[#C87552] transition-colors">
                  Botanical Bangles & Cuffs
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#C87552] transition-colors font-medium text-[#B69B7D]">
                  Explore Complete Gallery &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-[#F4EBDD] font-bold mb-4">
              Rohan Craft House
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4EBDD]/85">
              <li>
                <Link to="/custom-design" className="hover:text-[#C87552] transition-colors flex items-center gap-1.5 font-semibold text-[#F4EBDD]">
                  <Sparkles className="w-3 h-3 text-[#C87552]" />
                  <span>Request Custom Design (Bespoke)</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C87552] transition-colors">
                  Our Atelier Story
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-[#C87552] transition-colors">
                  Custom Commissions & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-[#C87552] transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C87552] transition-colors">
                  Care Guide & FAQs
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-[#C87552] transition-colors">
                  Shipping & Packaging Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="hover:text-[#C87552] transition-colors">
                  Return & Refund Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-[#F4EBDD] font-bold mb-4">
              Artisan Atelier
            </h4>
            <div className="space-y-3 text-xs text-[#F4EBDD]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B69B7D] shrink-0 mt-0.5" />
                <span>Rohan Craft House Studio & Foundry, Luxury Artisan Corridor, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B69B7D] shrink-0" />
                <a href="mailto:concierge@rohancrafthouse.com" className="hover:text-[#C87552] transition-colors">
                  concierge@rohancrafthouse.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B69B7D] shrink-0" />
                <a href="tel:+918337983439" className="hover:text-[#C87552] transition-colors">
                  +91 83379 83439
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#B69B7D]/25">
              <span className="block text-[10px] uppercase tracking-wider text-[#B69B7D] mb-2">Accepted Payment Modes</span>
              <p className="text-[11px] text-[#F4EBDD] font-medium">
                UPI • NetBanking • Credit / Debit Cards • Cash on Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 pt-8 border-t border-[#B69B7D]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#B69B7D] gap-4">
          <p>© {new Date().getFullYear()} Rohan Craft House. Handcrafted with reverence. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/policies/privacy" className="text-[#F4EBDD]/85 hover:text-[#C87552] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/policies/terms" className="text-[#F4EBDD]/85 hover:text-[#C87552] transition-colors">
              Terms of Service
            </Link>
            <Link to="/policies/shipping" className="text-[#F4EBDD]/85 hover:text-[#C87552] transition-colors">
              Shipping Terms
            </Link>
            <Link to="/policies/returns" className="text-[#F4EBDD]/85 hover:text-[#C87552] transition-colors">
              Returns & Cancellations
            </Link>
            <Link to="/admin/login" className="text-[#B69B7D] hover:text-[#C87552] transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

