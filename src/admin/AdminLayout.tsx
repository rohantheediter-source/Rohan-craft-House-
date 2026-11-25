import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Tag,
  ShoppingBag,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = 'Rohan Craft House | Admin Portal';
  }, []);

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Product Catalog', path: '/admin/products', icon: Package },
    { name: 'Add Product', path: '/admin/products/new', icon: PlusCircle },
    { name: 'Artisan Categories', path: '/admin/categories', icon: Tag },
    { name: 'Orders Management', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Custom Requests', path: '/admin/custom-requests', icon: Sparkles },
    { name: 'Customer Registry', path: '/admin/customers', icon: Users },

  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#30231F] border-r border-[#B69B7D]/30 text-[#F4EBDD]">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#B69B7D]/25">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#221815] border border-[#B69B7D] flex items-center justify-center text-[#F4EBDD] font-display font-bold text-sm tracking-wider shadow-sm shrink-0">
            RCH
          </div>
          <div>
            <h2 className="font-display text-sm font-bold tracking-wider text-[#F4EBDD] leading-tight">
              Rohan Craft House
            </h2>
            <span className="text-[10px] uppercase tracking-wider text-[#B69B7D] font-mono">
              Administrative Suite
            </span>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? 'bg-[#C87552] text-white font-bold shadow-md'
                  : 'text-[#F4EBDD]/80 hover:bg-[#3D2E29] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Links */}
      <div className="p-4 border-t border-[#B69B7D]/25 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#221815]/80 hover:bg-[#3D2E29] text-[11px] text-[#F4EBDD] border border-[#B69B7D]/35 transition-colors"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <ExternalLink className="w-3.5 h-3.5 text-[#C87552]" />
            <span>Storefront Live</span>
          </span>
          <span className="text-[9px] uppercase tracking-wider bg-[#C87552] px-1.5 py-0.5 rounded text-white font-bold">
            Preview
          </span>
        </a>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#221815] border border-[#B69B7D]/50 flex items-center justify-center text-xs font-bold text-[#F4EBDD] shrink-0">
              <Shield className="w-4 h-4 text-[#C87552]" />
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-bold truncate text-[#F4EBDD]">
                {profile?.full_name || 'Administrator'}
              </p>
              <p className="text-[10px] text-[#B69B7D] truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="p-2 text-[#B69B7D] hover:text-red-300 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4EBDD] flex flex-col lg:flex-row text-[#30231F] font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Header & Drawer */}
      <div className="lg:hidden bg-[#30231F] border-b border-[#B69B7D]/30 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-[#F4EBDD]/80 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#F4EBDD] truncate">
            Rohan Craft House Admin
          </span>
        </div>

        <button
          onClick={handleSignOut}
          className="text-xs text-[#B69B7D] hover:text-red-300"
        >
          Sign Out
        </button>
      </div>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-xs h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Admin Content Body */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

