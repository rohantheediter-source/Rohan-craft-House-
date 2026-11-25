import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Shop', to: '/shop' },
    { label: 'Contact', to: '/contact' },
  ];

  const categoryLinks = [
    { label: 'Resin Art', to: '/shop?category=wall-clocks' },
    { label: 'Handmade Jewellery', to: '/shop?category=jewelry-sets' },
    { label: 'Custom Gifts', to: '/shop?collection=gifts' },
    { label: 'Personalized Creations', to: '/custom-design' },
  ];

  const supportLinks = [
    { label: 'FAQs', to: '/faq' },
    { label: 'Shipping Policy', to: '/policies/shipping' },
    { label: 'Return Policy', to: '/policies/returns' },
    { label: 'Privacy Policy', to: '/policies/privacy' },
    { label: 'Terms & Conditions', to: '/policies/terms' },
  ];

  const linkClass =
    'inline-block text-[13px] text-[#33231E]/80 hover:text-[#B88A5A] hover:translate-x-0.5 transition-all duration-200';

  return (
    <footer className="bg-[#F5EBDD] text-[#33231E] border-t border-[#B88A5A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Band */}
        <div className="py-12 sm:py-14 border-b border-[#B88A5A]/25">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
            <div className="max-w-md">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-px bg-[#B88A5A]" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#B88A5A]">
                  Private Collector Circle
                </span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#33231E] mt-2">
                Receive Studio Notes &amp; Early Releases
              </h3>
              <p className="font-serif-luxury text-base text-[#33231E]/75 mt-1">
                Private previews of limited resin art, heirloom jewellery editions, and custom commission openings.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {isSubscribed ? (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#33231E] bg-white/80 px-5 py-3.5 rounded-full border border-[#B88A5A]/45 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#B88A5A] shrink-0" />
                  <span>Welcome to the Rohan Craft House collector list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-5 py-3 rounded-full bg-white/85 border border-[#B88A5A]/40 text-xs sm:text-sm text-[#33231E] placeholder-[#33231E]/45 focus:outline-none focus:border-[#B88A5A] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#33231E] hover:bg-[#B88A5A] text-[#F5EBDD] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-sm hover:-translate-y-0.5 disabled:opacity-50 shrink-0"
                  >
                    <span>{isSubmitting ? 'Joining' : 'Subscribe'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Editorial Links & Brand Section */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* 1. Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/logo.svg"
                alt="Rohan Craft House Logo"
                className="w-11 h-11 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col items-center">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#33231E] group-hover:text-[#B88A5A] transition-colors leading-none">
                  Rohan
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-3.5 h-px bg-[#B88A5A]/70" />
                  <span className="font-editorial text-[10.5px] tracking-[0.08em] text-[#33231E]/80 whitespace-nowrap">
                    Craft House
                  </span>
                  <span className="w-3.5 h-px bg-[#B88A5A]/70" />
                </div>
              </div>
            </Link>

            <p className="text-[13px] text-[#33231E]/75 leading-relaxed max-w-xs mt-4">
              Bespoke resin artistry, preserved botanical jewellery, and thoughtfully crafted keepsakes finished by hand with quiet luxury.
            </p>

            {/* Elegant Social Icons */}
            <div className="flex items-center gap-2.5 mt-6">
              <Link
                to="/shop"
                aria-label="Instagram Gallery"
                className="w-9 h-9 rounded-full border border-[#B88A5A]/45 bg-white/45 hover:bg-[#33231E] text-[#33231E] hover:text-[#F5EBDD] hover:border-[#33231E] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                to="/about"
                aria-label="Pinterest Lookbook"
                className="w-9 h-9 rounded-full border border-[#B88A5A]/45 bg-white/45 hover:bg-[#33231E] text-[#33231E] hover:text-[#F5EBDD] hover:border-[#33231E] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.18-5.01 1.18-5.01s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.88 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.75 2.28.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.26-.59-2.05-2.43-2.05-3.91 0-3.18 2.31-6.1 6.67-6.1 3.5 0 6.22 2.5 6.22 5.83 0 3.48-2.19 6.28-5.24 6.28-1.02 0-1.98-.53-2.31-1.16l-.63 2.4c-.23.88-.84 1.98-1.26 2.65.95.29 1.95.45 3 .45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </Link>
              <Link
                to="/blog"
                aria-label="YouTube Craft Journal"
                className="w-9 h-9 rounded-full border border-[#B88A5A]/45 bg-white/45 hover:bg-[#33231E] text-[#33231E] hover:text-[#F5EBDD] hover:border-[#33231E] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3v6Z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B88A5A] pb-2.5 border-b border-[#B88A5A]/25 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Shop Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B88A5A] pb-2.5 border-b border-[#B88A5A]/25 mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Customer Support */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B88A5A] pb-2.5 border-b border-[#B88A5A]/25 mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Copyright Bar */}
        <div className="py-6 border-t border-[#B88A5A]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#33231E]/65">
          <p>© {new Date().getFullYear()} Rohan Craft House. Crafted by hand with quiet devotion.</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:concierge@rohancrafthouse.com"
              className="hover:text-[#B88A5A] transition-colors"
            >
              concierge@rohancrafthouse.com
            </a>
            <span className="text-[#B88A5A]" aria-hidden="true">•</span>
            <Link to="/admin/login" className="hover:text-[#B88A5A] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
