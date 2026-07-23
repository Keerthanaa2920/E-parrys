import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu, FiX, FiUser, FiShoppingCart, FiSearch,
  FiTrash2, FiPlus, FiMinus, FiMapPin, FiMail, FiPhone, FiClock, FiCheckCircle
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { mockDbService } from '../services/mockDbService';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../components/common/Logo';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; companyName?: string } | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    const token = localStorage.getItem('eparrys_auth_token');
    const userStr = localStorage.getItem('eparrys_user');
    if (token && userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('eparrys_auth_token');
    localStorage.removeItem('eparrys_user');
    setCurrentUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const chennaiAreas = [
    'Adyar', 'Ambattur', 'Anna Nagar', 'Chromepet', 'Guindy', 'Kanchipuram',
    'Madhavaram', 'Mylapore', 'Nungambakkam', 'Ponniammanmedu', 'Porur',
    'Red Hills', 'Royapettah', 'Saidapet', 'Sriperumbudur', 'T. Nagar',
    'Tambaram', 'Thiruvanmiyur', 'Vandalur', 'Velachery'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        // Delay to allow page to load then scroll
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-parrys-cream text-parrys-charcoal font-sans relative">

      {/* Sticky Premium Navbar */}
      <nav className="sticky top-0 z-40 bg-parrys-cream/95 backdrop-blur-md border-b border-parrys-surface-dim/20 shadow-[0_2px_20px_-10px_rgba(169,68,29,0.04)]" data-purpose="main-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">

            {/* Logo */}
            <div className="shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 text-parrys-terracotta transition-all duration-300 group-hover:scale-[1.08] group-hover:rotate-3 btn-transition">
                  <Logo size={36} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-extrabold tracking-tight text-parrys-charcoal font-serif uppercase tracking-widest">
                    E-Parrys
                  </span>
                  <span className="text-[7.5px] tracking-[0.25em] text-parrys-muted font-bold font-sans uppercase">
                    Chennai's Wholesale Hub
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-8 text-xs uppercase tracking-wider font-bold">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path)}
                    className={`pb-1 font-bold transition-all duration-300 btn-transition cursor-pointer relative group/item
                      ${isActive
                        ? 'text-parrys-terracotta'
                        : 'text-parrys-muted hover:text-parrys-terracotta'
                      }
                    `}
                  >
                    <span>{link.name}</span>
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-parrys-terracotta transition-transform duration-300 origin-left
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100'}
                    `} />
                  </button>
                );
              })}
            </nav>

            {/* Search Input and Cart Badge */}
            <div className="flex-1 max-w-md hidden md:block">
              <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-custom border border-parrys-surface-dim/40 px-3.5 py-2.5 shadow-[0_2px_8px_-4px_rgba(169,68,29,0.06)] focus-within:border-parrys-terracotta/50 focus-within:ring-2 focus-within:ring-parrys-terracotta/5 transition-all duration-300">
                <FiSearch className="text-slate-400 mr-2.5 shrink-0 h-4.5 w-4.5" />
                <input
                  type="text"
                  placeholder="Search materials, cement, steel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xs font-semibold text-parrys-charcoal placeholder-slate-400"
                />
              </form>
            </div>

            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative flex h-11 w-11 items-center justify-center rounded-custom border border-parrys-surface-dim/50 bg-white text-parrys-charcoal hover:bg-parrys-cream hover:border-parrys-terracotta hover:scale-105 transition-all duration-300 btn-transition cursor-pointer shadow-[0_2px_8px_-4px_rgba(169,68,29,0.08)]"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-parrys-terracotta text-[9px] font-extrabold text-white shadow-md font-mono animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="hidden lg:flex items-center gap-2 px-3 py-2.5 rounded-custom border border-parrys-surface-dim/40 bg-white hover:border-parrys-terracotta hover:bg-parrys-cream text-xs font-bold uppercase tracking-wider text-parrys-muted hover:text-parrys-terracotta transition-all duration-305 shadow-sm cursor-pointer"
                  >
                    <FiUser className="h-4 w-4 text-parrys-terracotta" />
                    <span>{currentUser.name}</span>
                  </button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-custom border border-parrys-surface-dim/40 bg-white p-2 shadow-xl z-50">
                      <div className="px-3 py-2 border-b border-parrys-cream text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Logged in as</p>
                        <p className="text-xs font-bold text-parrys-charcoal truncate">{currentUser.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-parrys-cream hover:text-parrys-terracotta transition text-left"
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-custom border border-parrys-surface-dim/40 bg-white hover:border-parrys-terracotta hover:bg-parrys-cream text-xs font-bold uppercase tracking-wider text-parrys-muted hover:text-parrys-terracotta transition-all duration-305 shadow-sm"
                >
                  <FiUser className="h-4 w-4" />
                  <span>Login & Signup</span>
                </Link>
              )}

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex xl:hidden h-11 w-11 items-center justify-center rounded-custom border border-parrys-surface-dim text-parrys-muted hover:bg-white focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <FiX className="h-5.5 w-5.5" /> : <FiMenu className="h-5.5 w-5.5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-parrys-surface-dim/40 bg-parrys-cream px-4 py-4 space-y-4 shadow-xl absolute w-full left-0 z-50">
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path)}
                    className={`rounded-custom px-3 py-2 text-left text-sm font-semibold transition-colors w-full cursor-pointer
                      ${isActive
                        ? 'bg-parrys-surface-dim/20 text-parrys-terracotta'
                        : 'text-parrys-muted hover:bg-white hover:text-parrys-terracotta'
                      }
                    `}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-custom border border-parrys-surface-dim/70 px-3 py-2 shadow-sm">
              <FiSearch className="text-slate-400 mr-2 shrink-0 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xs text-parrys-charcoal placeholder-slate-400"
              />
            </form>

            <div className="h-px bg-parrys-surface-dim/30 my-2" />
             <div className="flex items-center gap-3 pt-2">
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs font-bold text-parrys-muted uppercase tracking-wider"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex-1 text-center rounded-custom bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 uppercase tracking-wider cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs font-bold text-parrys-muted uppercase tracking-wider"
                  >
                    Login & Signup
                  </Link>
                  <Link
                    to="/vendor-registration"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-custom bg-parrys-terracotta px-3 py-2 text-xs font-bold text-white hover:bg-parrys-terracotta-dark uppercase tracking-wider"
                  >
                    Sell Materials
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Wholesale Footer */}
      <footer className="bg-white border-t border-parrys-surface-dim/30 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-parrys-surface-dim/30">

            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 text-parrys-terracotta">
                  <Logo size={28} />
                </div>
                <span className="text-lg font-bold tracking-tighter text-parrys-charcoal font-serif uppercase">
                  E-Parrys
                </span>
              </div>
              <p className="text-xs text-parrys-muted leading-relaxed font-sans">
                E-Parrys is Chennai's wholesale construction materials platform. Sourced direct from distributors, delivered same-day directly to your site.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif">Quick Links</h4>
              <ul className="space-y-2 text-xs text-parrys-muted font-sans font-semibold">
                <li><Link to="/products" className="hover:text-parrys-terracotta transition-colors">All Products</Link></li>
                <li><button onClick={() => handleNavClick('/how-it-works')} className="hover:text-parrys-terracotta transition-colors text-left cursor-pointer">How It Works</button></li>
                <li><Link to="/vendor-registration" className="hover:text-parrys-terracotta transition-colors">Become a Seller</Link></li>
                <li><Link to="/about" className="hover:text-parrys-terracotta transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-parrys-terracotta transition-colors">Contact Support</Link></li>
                 {currentUser ? (
                  <>
                    <li><Link to="/profile" className="hover:text-parrys-terracotta transition-colors font-bold uppercase tracking-wider text-[10px]">My Profile</Link></li>
                    <li><button onClick={handleLogout} className="hover:text-red-600 transition-colors text-left cursor-pointer font-bold text-red-500 uppercase tracking-wider text-[10px]">Sign Out</button></li>
                  </>
                ) : (
                  <li><Link to="/login" className="hover:text-parrys-terracotta transition-colors">Login & Signup</Link></li>
                )}
              </ul>
            </div>

            {/* Categories Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif">Categories</h4>
              <ul className="space-y-2 text-xs text-parrys-muted font-sans font-semibold">
                <li><Link to="/products?category=Cement%20%26%20Aggregates" className="hover:text-parrys-terracotta transition-colors">Cement</Link></li>
                <li><Link to="/products?category=Steel%20%26%20TMT%20Bars" className="hover:text-parrys-terracotta transition-colors">Steel & TMT</Link></li>
                <li><Link to="/products?category=Bricks%20%26%20Blocks" className="hover:text-parrys-terracotta transition-colors">Bricks & Blocks</Link></li>
                <li><Link to="/products?category=Sand%20%26%20Gravel" className="hover:text-parrys-terracotta transition-colors">Sand & Gravel</Link></li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-parrys-charcoal font-serif">Contact Details</h4>
              <ul className="space-y-3 text-xs text-parrys-muted font-sans leading-normal">
                <li className="flex items-center gap-2">
                  <FiPhone className="text-parrys-terracotta shrink-0 h-4 w-4" />
                  <a href="tel:+919176264711" className="hover:underline font-bold text-parrys-charcoal">+91 9176264711</a>
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="text-parrys-terracotta shrink-0 h-4 w-4" />
                  <a href="mailto:shreeshanconstruction31@gmail.com" className="hover:underline font-semibold">shreeshanconstruction31@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <FiClock className="text-parrys-terracotta shrink-0 h-4 w-4" />
                  <span className="font-semibold">Mon–Sat, 8:00 AM – 8:00 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiMapPin className="text-parrys-terracotta shrink-0 h-4 w-4 mt-0.5" />
                  <span>
                    No.135 A Block, Thanikachalam Nagar,<br />
                    80FT Road, Ponniammanmedu,<br />
                    Chennai-600110
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer copyright */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-slate-400 font-sans font-semibold">
              &copy; {new Date().getFullYear()} E-Parrys. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Serving Chennai's wholesale construction market.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default PublicLayout;
