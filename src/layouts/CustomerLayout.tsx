import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const CustomerLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Rohan Craft House | Handcrafted Luxury Resin Art & Decor';
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EBDD] text-[#30231F]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

