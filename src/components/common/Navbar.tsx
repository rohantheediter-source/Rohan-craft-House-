import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LogOut,
  Package,
  Shield,
  Truck,
  Headphones,
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, profile, isAdmin, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'shop' | 'collections' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const shopMenuItems = [
    { name: 'All Handcrafted Works', href: '/shop' },
    { name: 'Resin Wall Clocks', href: '/shop?category=wall-clocks' },
    { name: 'Jewelry & Sets', href: '/shop?category=jewelry-sets' },
    { name: 'Bracelets & Bangles', href: '/shop?category=bracelets-bangles' },
    { name: 'Platters & Home Decor', href: '/shop?category=ceremonial-decor' },
    { name: 'Custom Design Studio', href: '/custom-design', isSpecial: true },
  ];

  const collectionsMenuItems = [
    { name: 'Resin Art', href: '/shop?category=wall-clocks' },
    { name: 'Jewellery', href: '/shop?category=jewelry-sets' },
    { name: 'Gifts', href: '/shop?collection=gifts' },
    { name: 'Cups & Tableware', href: '/shop?collection=cups' },
    { name: 'Home Décor', href: '/shop?category=ceremonial-decor' },
  ];

  const isHomeActive = location.pathname === '/';
  const isShopActive =
    (location.pathname.startsWith('/shop') && !location.search.includes('collection=')) ||
    location.pathname.startsWith('/product');
  const isAboutActive = location.pathname === '/about';
  const isCollectionsActive = location.search.includes('collection=');
  const isBlogActive = location.pathname === '/blog';
  const isContactActive = location.pathname === '/contact';

  const navPillClass = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
      active
        ? 'bg-[#C87552]/25 text-[#30231F] font-semibold border border-[#C87552]/30 shadow-sm'
        : 'text-[#30231F] hover:text-[#C87552] hover:bg-[#C87552]/10'
    }`;

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 w-full bg-[#F4EBDD]/95 backdrop-blur-md border-b border-[#B69B7D]/40 shadow-sm"
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#30231F] text-[#F4EBDD] text-[11px] py-2 border-b border-[#B69B7D]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          {/* Left: Free Shipping */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <Truck className="w-3.5 h-3.5 text-[#F4EBDD]/90 shrink-0" />
            <span>Free Shipping on Orders Above ₹999</span>
          </div>

          <span className="hidden md:inline-block h-3.5 w-px bg-[#B69B7D]/30" aria-hidden="true" />

          {/* Center: Handcrafted with Love */}
          <div className="hidden sm:flex items-center gap-1.5 font-medium tracking-wide">
            <Heart className="w-3.5 h-3.5 text-[#C87552] fill-[#C87552] shrink-0" />
            <span>Handcrafted with Love</span>
          </div>

          <span className="hidden md:inline-block h-3.5 w-px bg-[#B69B7D]/30" aria-hidden="true" />

          {/* Right: 24/7 Support & Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="flex items-center gap-1.5 hover:text-[#C87552] transition-colors font-medium"
            >
              <Headphones className="w-3.5 h-3.5 text-[#F4EBDD]/90 shrink-0" />
              <span>24/7 Support</span>
            </Link>

            <span className="h-3.5 w-px bg-[#B69B7D]/30" aria-hidden="true" />

            <div className="flex items-center gap-2.5 text-[#F4EBDD]/90">
              <Link
                to="/about"
                aria-label="Instagram showcase"
                className="hover:text-[#C87552] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                to="/blog"
                aria-label="YouTube craft stories"
                className="hover:text-[#C87552] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3v6Z" />
                </svg>
              </Link>
              <Link
                to="/shop"
                aria-label="Pinterest inspiration gallery"
                className="hover:text-[#C87552] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.18-5.01 1.18-5.01s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.88 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.75 2.28.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.26-.59-2.05-2.43-2.05-3.91 0-3.18 2.31-6.1 6.67-6.1 3.5 0 6.22 2.5 6.22 5.83 0 3.48-2.19 6.28-5.24 6.28-1.02 0-1.98-.53-2.31-1.16l-.63 2.4c-.23.88-.84 1.98-1.26 2.65.95.29 1.95.45 3 .45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#30231F] hover:text-[#C87552] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.svg"
                alt="Rohan Craft House Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col items-center">
                <span className="font-editorial text-xl sm:text-[26px] font-bold tracking-tight text-[#30231F] group-hover:text-[#C87552] transition-colors leading-none whitespace-nowrap">
                  Rohan
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-3 sm:w-3.5 h-px bg-[#8E7356]/70" />
                  <span className="font-editorial text-[9px] sm:text-[10.5px] tracking-[0.08em] text-[#56443E] whitespace-nowrap">
                    Craft House
                  </span>
                  <span className="w-3 sm:w-3.5 h-px bg-[#8E7356]/70" />
                </div>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link to="/" className={navPillClass(isHomeActive)}>
              Home
            </Link>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('shop')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/shop"
                className={navPillClass(isShopActive)}
                onClick={() => setOpenDropdown(null)}
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#56443E]" />
              </Link>

              {openDropdown === 'shop' && (
                <div className="absolute left-0 top-full pt-1.5 w-60 z-50 animate-fade-in">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-luxury border border-[#B69B7D]/40 py-2">
                    {shopMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors ${
                          item.isSpecial
                            ? 'text-[#C87552] font-bold hover:bg-[#F4EBDD]/70 border-t border-[#B69B7D]/25 mt-1 pt-2.5'
                            : 'text-[#30231F] hover:text-[#C87552] hover:bg-[#F4EBDD]/60'
                        }`}
                      >
                        <span>{item.name}</span>
                        {item.isSpecial && <Sparkles className="w-3.5 h-3.5 text-[#C87552]" />}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className={navPillClass(isAboutActive)}>
              About Us
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('collections')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(openDropdown === 'collections' ? null : 'collections');
                  if (location.pathname === '/') {
                    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={navPillClass(isCollectionsActive)}
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#56443E]" />
              </button>

              {openDropdown === 'collections' && (
                <div className="absolute left-0 top-full pt-1.5 w-52 z-50 animate-fade-in">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-luxury border border-[#B69B7D]/40 py-2">
                    {collectionsMenuItems.map((col) => (
                      <Link
                        key={col.name}
                        to={col.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-xs font-medium text-[#30231F] hover:text-[#C87552] hover:bg-[#F4EBDD]/60 transition-colors"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/blog" className={navPillClass(isBlogActive)}>
              Blog
            </Link>

            <Link to="/contact" className={navPillClass(isContactActive)}>
              Contact
            </Link>
          </nav>

          {/* Right: Action Utility Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors"
              title="Search collection"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1 p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors"
                title="Account"
                aria-label="Account"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="User"
                    className="w-5 h-5 rounded-full object-cover border border-[#B69B7D]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <UserIcon className="w-5 h-5 stroke-[1.75]" />
                )}
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-luxury border border-[#B69B7D]/40 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#B69B7D]/25">
                        <p className="text-xs text-[#8E7356] uppercase tracking-wider font-semibold">Signed in as</p>
                        <p className="text-sm font-medium text-[#30231F] truncate">
                          {profile?.full_name || user.email}
                        </p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#F4EBDD] bg-[#30231F] hover:bg-[#221815] rounded-lg mx-2 my-1 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-[#C87552]" />
                          <span>Admin Console</span>
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#30231F] hover:bg-[#F4EBDD]/60 hover:text-[#C87552] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-[#8E7356]" />
                        My Profile & Addresses
                      </Link>
                      <Link
                        to="/profile#orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#30231F] hover:bg-[#F4EBDD]/60 hover:text-[#C87552] transition-colors"
                      >
                        <Package className="w-4 h-4 text-[#8E7356]" />
                        My Order History
                      </Link>
                      <Link
                        to="/track-order"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#30231F] hover:bg-[#F4EBDD]/60 hover:text-[#C87552] transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-[#8E7356]" />
                        Track an Order
                      </Link>
                      <div className="border-t border-[#B69B7D]/25 my-1" />
                      <button
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await signOut();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-700 hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#30231F] hover:bg-[#F4EBDD]/60 hover:text-[#C87552] transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-[#56443E] hover:bg-[#F4EBDD]/60 hover:text-[#C87552] transition-colors"
                      >
                        Create an Account
                      </Link>
                      <div className="border-t border-[#B69B7D]/25 my-1" />
                      <Link
                        to="/track-order"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-[#56443E] hover:bg-[#F4EBDD]/60 hover:text-[#C87552] transition-colors"
                      >
                        <Package className="w-3.5 h-3.5 text-[#8E7356]" />
                        Track Your Order
                      </Link>
                      <Link
                        to="/admin/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-[#8E7356] hover:text-[#C87552] hover:bg-[#F4EBDD]/60 font-medium transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5 text-[#B69B7D]" />
                        Admin Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-[#C87552] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm">
                {totalWishlist}
              </span>
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors relative"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.75]" />
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-[#C87552] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="border-t border-[#B69B7D]/30 bg-white py-3 px-4 animate-fade-in shadow-inner">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8E7356]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resin clocks, preserved floral jhumkas, thalis, gifts, pendants..."
              className="flex-1 bg-transparent border-none text-sm text-[#30231F] placeholder-[#B69B7D] focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8E7356] hover:text-[#30231F]"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-[#C87552] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B05E3D] transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1 text-[#8E7356] hover:text-[#30231F]"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B69B7D]/30 bg-[#F4EBDD] px-4 pt-3 pb-6 animate-fade-in max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1.5">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isHomeActive ? 'bg-[#C87552]/25 text-[#30231F]' : 'text-[#30231F] hover:text-[#C87552]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isShopActive ? 'bg-[#C87552]/25 text-[#30231F]' : 'text-[#30231F] hover:text-[#C87552]'
              }`}
            >
              Shop
            </Link>

            {/* Quick Collections on Mobile */}
            <div className="pl-4 py-1.5 space-y-1.5 border-l-2 border-[#B69B7D]/40 ml-3">
              {collectionsMenuItems.map((col) => (
                <Link
                  key={col.name}
                  to={col.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-medium text-[#56443E] hover:text-[#C87552] py-1"
                >
                  {col.name}
                </Link>
              ))}
              <Link
                to="/custom-design"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#C87552] py-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Custom Design Studio</span>
              </Link>
            </div>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isAboutActive ? 'bg-[#C87552]/25 text-[#30231F]' : 'text-[#30231F] hover:text-[#C87552]'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isBlogActive ? 'bg-[#C87552]/25 text-[#30231F]' : 'text-[#30231F] hover:text-[#C87552]'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                isContactActive ? 'bg-[#C87552]/25 text-[#30231F]' : 'text-[#30231F] hover:text-[#C87552]'
              }`}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-[#B69B7D]/30 flex flex-col gap-2 px-3">
              <Link
                to="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-wider font-medium text-[#56443E] hover:text-[#C87552] py-1.5"
              >
                Track Your Order
              </Link>
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-wider font-medium text-[#30231F] hover:text-[#C87552] py-1.5"
                >
                  My Account ({profile?.full_name || 'Profile'})
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-wider font-semibold text-[#30231F] hover:text-[#C87552] py-1.5"
                >
                  Sign In / Register
                </Link>
              )}
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8E7356] hover:text-[#C87552] py-2 border-t border-[#B69B7D]/30 mt-1"
              >
                <Shield className="w-3.5 h-3.5 text-[#B69B7D]" />
                <span>Admin Login</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
