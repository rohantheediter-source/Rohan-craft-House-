import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LogOut,
  Package,
  Shield,
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Wall Clocks', href: '/shop?category=wall-clocks' },
    { name: 'Jewelry & Sets', href: '/shop?category=jewelry-sets' },
    { name: 'Platters & Decor', href: '/shop?category=ceremonial-decor' },
    { name: 'Custom Design', href: '/custom-design', isSpecial: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];


  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4EBDD]/95 backdrop-blur-md border-b border-[#B69B7D]/40 shadow-sm">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#30231F] text-[#F4EBDD] text-[11px] py-1.5 px-4 font-medium tracking-widest uppercase border-b border-[#B69B7D]/25 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#C87552]" />
        <span>Bespoke Luxury Resin Art • Free Express Shipping on orders over ₹1,999</span>
        <Sparkles className="w-3 h-3 text-[#C87552] hidden sm:inline" />
      </div>

      {/* Main Navbar */}
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

          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <img
                src="/logo.svg"
                alt="Rohan Craft House Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display text-sm sm:text-lg xl:text-xl font-bold tracking-[0.06em] sm:tracking-[0.12em] text-[#30231F] group-hover:text-[#C87552] transition-colors whitespace-nowrap">
                  Rohan Craft House
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8E7356] font-semibold -mt-0.5 whitespace-nowrap">
                  Artisan Luxury
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[11px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-semibold transition-all duration-200 py-1 border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'border-[#C87552] text-[#C87552]'
                      : 'border-transparent text-[#30231F] hover:text-[#C87552] hover:border-[#C87552]/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {(link as any).isSpecial && (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-[#C87552] text-white font-bold">
                      Bespoke
                    </span>
                  )}
                </Link>

              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors"
              title="Search collection"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C87552] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="p-2 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors relative"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#30231F] text-[#F4EBDD] border border-[#B69B7D] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 text-[#30231F] hover:text-[#C87552] hover:bg-white/60 rounded-full transition-colors"
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
                  <UserIcon className="w-5 h-5" />
                )}
                <ChevronDown className="w-3 h-3 text-[#8E7356]" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-luxury border border-[#B69B7D]/40 py-2 z-50 animate-fade-in"
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
              placeholder="Search resin clocks, preserved floral jhumkas, thalis, pendants..."
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
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B69B7D]/30 bg-[#F4EBDD] px-4 pt-3 pb-6 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold uppercase tracking-wider py-2 border-b border-[#B69B7D]/25 transition-colors ${
                    isActive
                      ? 'text-[#C87552]'
                      : 'text-[#30231F] hover:text-[#C87552]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
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

