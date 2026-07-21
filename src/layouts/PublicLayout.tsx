import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiArrowRight } from 'react-icons/fi';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Home Hub', path: '/' },
    { name: 'Browse Materials', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Brands', path: '/brands' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-parrys-cream text-parrys-charcoal font-sans">
      {/* Sticky Premium Navbar */}
      <nav className="sticky top-0 z-50 bg-parrys-cream/90 backdrop-blur-sm border-b border-parrys-surface-dim/30" data-purpose="main-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 bg-parrys-terracotta rounded-custom flex items-center justify-center shadow-lg shadow-parrys-terracotta/10 transition-transform group-hover:scale-[1.05] btn-transition">
                  <div className="w-4 h-4 bg-parrys-cream rounded-full"></div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold tracking-tighter text-parrys-charcoal font-serif uppercase">
                    E-Parrys
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-parrys-muted font-semibold">
                    WHOLESALE SUPPLY
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`pb-1 font-semibold transition-colors btn-transition
                      ${isActive 
                        ? 'text-parrys-terracotta border-b-2 border-parrys-terracotta' 
                        : 'text-parrys-muted hover:text-parrys-terracotta'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-parrys-muted hover:text-parrys-terracotta transition-colors btn-transition
                  ${currentPath === '/login' ? 'text-parrys-terracotta font-bold' : ''}
                `}
              >
                <FiUser className="h-4 w-4" />
                <span>Portal Login</span>
              </Link>
              
              <Link
                to="/vendor-registration"
                className="bg-parrys-terracotta text-white px-6 py-2.5 rounded-custom text-sm font-semibold hover:bg-parrys-terracotta-dark btn-transition shadow-sm hover:shadow-md hover:shadow-parrys-terracotta/10"
              >
                Let's Partner
              </Link>
            </div>

            {/* Mobile hamburger menu */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-custom border border-parrys-surface-dim text-parrys-muted hover:bg-white focus:outline-none"
              >
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-parrys-surface-dim/40 bg-parrys-cream px-4 py-4 space-y-4 shadow-xl absolute w-full left-0 z-50">
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-custom px-3 py-2 text-sm font-semibold transition-colors
                      ${isActive 
                        ? 'bg-parrys-surface-dim/20 text-parrys-terracotta' 
                        : 'text-parrys-muted hover:bg-white hover:text-parrys-terracotta'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="h-px bg-parrys-surface-dim/30 my-2" />
            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs font-semibold text-parrys-muted"
              >
                Portal Login
              </Link>
              <Link
                to="/vendor-registration"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-custom bg-parrys-terracotta px-3 py-2 text-xs font-semibold text-white hover:bg-parrys-terracotta-dark"
              >
                Let's Partner
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-parrys-cream pt-20 pb-10 border-t border-parrys-surface-dim/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-parrys-terracotta rounded-custom flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-parrys-cream rounded-full"></div>
              </div>
              <span className="text-lg font-bold tracking-tighter text-parrys-charcoal font-serif uppercase">
                E-Parrys
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-parrys-muted">
              <Link to="/about" className="hover:text-parrys-terracotta transition-colors btn-transition">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-parrys-terracotta transition-colors btn-transition">Terms of Service</Link>
              <Link to="/contact" className="hover:text-parrys-terracotta transition-colors btn-transition">Cookie Settings</Link>
            </div>
            
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} E-Parrys Building Materials Marketplace Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default PublicLayout;
