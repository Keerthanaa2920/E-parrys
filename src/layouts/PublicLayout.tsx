import React, { useState } from 'react';
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

  // Checkout Form State
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('Ponniammanmedu');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Success Modal State
  const [orderRef, setOrderRef] = useState('');
  const [confirmedPhone, setConfirmedPhone] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const { cartItems, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Sell', path: '/vendor-registration' },
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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!buyerName || !buyerPhone || !deliveryAddress) return;

    // Generate simulated order reference number
    const randomRef = `EP-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save orders to mock DB for each item in the cart
    cartItems.forEach(item => {
      mockDbService.addOrder({
        productId: item.product.id,
        productName: item.product.productName,
        vendorName: item.product.vendorName,
        buyerName: buyerName,
        quantity: item.quantity,
        amount: item.product.amount * item.quantity
      });
    });

    setConfirmedPhone(buyerPhone);
    setOrderRef(randomRef);
    setSuccessModalOpen(true);
    setCartOpen(false);

    // Clear form and cart
    clearCart();
    setBuyerName('');
    setBuyerPhone('');
    setDeliveryAddress('');
  };

  // Calculate cart subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.amount * item.quantity, 0);

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
                onClick={() => setCartOpen(true)}
                className="relative flex h-11 w-11 items-center justify-center rounded-custom border border-parrys-surface-dim/50 bg-white text-parrys-charcoal hover:bg-parrys-cream hover:border-parrys-terracotta hover:scale-105 transition-all duration-300 btn-transition cursor-pointer shadow-[0_2px_8px_-4px_rgba(169,68,29,0.08)]"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-parrys-terracotta text-[9px] font-extrabold text-white shadow-md font-mono animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                to="/login"
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-custom border border-parrys-surface-dim/40 bg-white hover:border-parrys-terracotta hover:bg-parrys-cream text-xs font-bold uppercase tracking-wider text-parrys-muted hover:text-parrys-terracotta transition-all duration-305 shadow-sm"
              >
                <FiUser className="h-4 w-4" />
                <span>Customer Login</span>
              </Link>

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
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs font-bold text-parrys-muted uppercase tracking-wider"
              >
                Customer Login
              </Link>
              <Link
                to="/vendor-registration"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-custom bg-parrys-terracotta px-3 py-2 text-xs font-bold text-white hover:bg-parrys-terracotta-dark uppercase tracking-wider"
              >
                Sell Materials
              </Link>
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
                <li><button onClick={() => handleNavClick('/#how-it-works')} className="hover:text-parrys-terracotta transition-colors text-left cursor-pointer">How It Works</button></li>
                <li><Link to="/vendor-registration" className="hover:text-parrys-terracotta transition-colors">Become a Seller</Link></li>
                <li><Link to="/about" className="hover:text-parrys-terracotta transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-parrys-terracotta transition-colors">Contact Support</Link></li>
                <li><Link to="/login" className="hover:text-parrys-terracotta transition-colors">Customer Login</Link></li>
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

      {/* Cart Checkout Slide-Out Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black cursor-pointer"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[480px] bg-parrys-cream border-l border-parrys-surface-dim/40 shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-parrys-surface-dim/40 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiShoppingCart className="text-parrys-terracotta h-5 w-5" />
                  <h2 className="text-lg font-bold text-parrys-charcoal font-serif">Wholesale Cart Sourcing</h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full border border-parrys-surface-dim/50 hover:bg-parrys-cream text-parrys-muted hover:text-parrys-charcoal cursor-pointer"
                >
                  <FiX className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-parrys-cream border border-parrys-surface-dim flex items-center justify-center text-parrys-muted">
                      <FiShoppingCart className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-parrys-charcoal">Your Cart is Empty</h3>
                      <p className="text-xs text-parrys-muted max-w-xs mt-1">
                        Find premium construction materials in our catalogue and add them to build your order proposal.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        navigate('/products');
                      }}
                      className="bg-parrys-terracotta text-white px-6 py-2.5 rounded-custom text-xs font-bold uppercase hover:bg-parrys-terracotta-dark btn-transition cursor-pointer"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item list */}
                    <div className="space-y-3.5">
                      <h3 className="text-xs font-bold text-parrys-muted uppercase tracking-wider">Sourcing Materials</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => {
                          const unit = (item.product as any).unit || 'units';
                          const minQty = (item.product as any).minQty || 10;
                          return (
                            <div
                              key={item.product.id}
                              className="bg-white rounded-custom border border-parrys-surface-dim/40 p-4 flex gap-4 justify-between items-start shadow-sm"
                            >
                              <div className="space-y-1 flex-1">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-parrys-muted font-mono">
                                  {item.product.vendorName}
                                </span>
                                <h4 className="text-xs font-bold text-parrys-charcoal leading-snug font-serif">
                                  {item.product.productName}
                                </h4>
                                <div className="text-[10px] text-parrys-muted font-mono">
                                  ₹{item.product.amount} / {unit} • Min. {minQty} {unit}s
                                </div>
                                <div className="text-xs font-bold text-parrys-terracotta font-mono pt-1">
                                  Line Total: ₹{(item.product.amount * item.quantity).toLocaleString('en-IN')}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-3 shrink-0">
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                                >
                                  <FiTrash2 className="h-4 w-4" />
                                </button>

                                {/* Quantity controls */}
                                <div className="flex items-center rounded-custom border border-parrys-surface-dim/60 bg-parrys-cream p-0.5">
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    className="p-1 text-slate-500 hover:text-parrys-charcoal disabled:opacity-40 cursor-pointer"
                                    disabled={item.quantity <= minQty}
                                  >
                                    <FiMinus className="h-3 w-3" />
                                  </button>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || minQty)}
                                    className="w-10 text-center bg-transparent border-0 text-xs font-bold font-mono focus:ring-0 p-0"
                                  />
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="p-1 text-slate-500 hover:text-parrys-charcoal cursor-pointer"
                                  >
                                    <FiPlus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Cost Summary */}
                    <div className="border-t border-parrys-surface-dim/40 pt-4 space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-parrys-muted">
                        <span>Items Count:</span>
                        <span className="font-mono">{cartItems.length} categories</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-serif font-bold text-parrys-charcoal">
                        <span>Total Proposal Amount:</span>
                        <span className="text-base font-mono text-parrys-terracotta">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[10px] text-parrys-muted italic leading-normal bg-parrys-cream border border-parrys-surface-dim/30 p-2.5 rounded-custom">
                        * Note: This is an estimated price proposal. Our distributor team will contact you to finalize logistics discounts, tax inputs, and site unloading specs.
                      </p>
                    </div>

                    {/* Sourcing Checkout Details Form */}
                    <form onSubmit={handleCheckoutSubmit} className="border-t border-parrys-surface-dim/40 pt-6 space-y-4">
                      <h3 className="text-xs font-bold text-parrys-muted uppercase tracking-wider">Site Sourcing Details</h3>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Buyer Name</label>
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="e.g. Arun Kumar"
                          className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          placeholder="e.g. +91 91762 64711"
                          className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2.5 text-xs text-parrys-charcoal placeholder-slate-400 focus:border-parrys-terracotta focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Chennai Area</label>
                          <select
                            value={deliveryArea}
                            onChange={(e) => setDeliveryArea(e.target.value)}
                            className="w-full rounded-custom border border-parrys-surface-dim bg-white px-2.5 py-2.5 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none font-semibold"
                          >
                            {chennaiAreas.map(area => (
                              <option key={area} value={area}>{area}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Delivery Date</label>
                          <input
                            type="date"
                            required
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            className="w-full rounded-custom border border-parrys-surface-dim bg-white px-2.5 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-parrys-muted">Site Delivery Address</label>
                        <textarea
                          required
                          rows={3}
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Please provide full site landmark or building block details in Chennai..."
                          className="w-full rounded-custom border border-parrys-surface-dim bg-white px-3 py-2 text-xs text-parrys-charcoal focus:border-parrys-terracotta focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-parrys-terracotta text-white py-3 rounded-custom text-xs font-bold uppercase hover:bg-parrys-terracotta-dark btn-transition shadow-lg shadow-parrys-terracotta/10 cursor-pointer"
                      >
                        Confirm & Place Order
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2-Hour Sourcing Call Confirmation Modal */}
      <AnimatePresence>
        {successModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border border-parrys-surface-dim p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <FiCheckCircle className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-parrys-terracotta uppercase tracking-widest font-mono">
                  Enquiry Submitted
                </span>
                <h3 className="text-xl font-bold font-serif text-parrys-charcoal">
                  Direct Sourcing Initialized!
                </h3>
                <p className="text-xs text-parrys-muted font-mono font-bold">
                  Order Proposal Ref: {orderRef}
                </p>
              </div>

              <div className="bg-parrys-cream border border-parrys-surface-dim/40 rounded-custom p-4 text-xs text-parrys-charcoal leading-relaxed text-left space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-parrys-terracotta">
                  <FiClock className="shrink-0" />
                  <span>2-Hour Call Sourcing Commitment</span>
                </p>
                <p>
                  Our operations team has received your materials proposal. We will call you at <strong className="font-mono text-slate-800">{confirmedPhone}</strong> within <strong>2 hours</strong> to finalize wholesale depot discounts, verify delivery access, and dispatch same-day.
                </p>
              </div>

              <button
                onClick={() => setSuccessModalOpen(false)}
                className="w-full bg-parrys-charcoal text-white hover:bg-parrys-terracotta py-2.5 rounded-custom text-xs font-bold uppercase transition-colors duration-300 cursor-pointer"
              >
                Return to Storefront
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default PublicLayout;
