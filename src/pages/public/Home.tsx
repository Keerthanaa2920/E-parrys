import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockDbService } from '../../services/mockDbService';
import { 
  FiArrowRight, FiShield, FiTruck, FiBox, FiCheckCircle, 
  FiSearch, FiLayers, FiDollarSign, FiChevronDown, FiUserCheck, FiTrendingUp 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Approved products to showcase
  const products = useMemo(() => {
    return mockDbService.getProducts()
      .filter(p => p.status === 'approved')
      .slice(0, 4);
  }, []);

  // Alternative set of popular items
  const popularProducts = useMemo(() => {
    return mockDbService.getProducts()
      .filter(p => p.status === 'approved')
      .slice(4, 8);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const coreCategories = [
    { name: 'Cement', icon: FiBox, desc: 'OPC 53, PPC bags' },
    { name: 'Steel', icon: FiLayers, desc: 'Structural beams' },
    { name: 'TMT Bars', icon: FiTrendingUp, desc: 'High tensile reinforcement' },
    { name: 'Bricks', icon: FiBox, desc: 'Clay bricks, solid blocks' },
    { name: 'Sand', icon: FiLayers, desc: 'M-Sand, River Sand' },
    { name: 'Paints', icon: FiBox, desc: 'Acrylic emulsions, wall coat' },
    { name: 'Plumbing', icon: FiLayers, desc: 'Pipes, Cpvc fittings' },
    { name: 'Electrical', icon: FiBox, desc: 'Copper wiring, conduits' },
    { name: 'Hardware', icon: FiLayers, desc: 'Modular fixtures' },
    { name: 'Tiles', icon: FiBox, desc: 'Vitrified flooring tiles' },
    { name: 'Construction Chemicals', icon: FiShield, desc: 'Waterproofing agents' },
    { name: 'Roofing', icon: FiLayers, desc: 'Coated metal sheets' },
    { name: 'Tools', icon: FiBox, desc: 'Machinery & concrete mixers' },
    { name: 'Safety Equipment', icon: FiShield, desc: 'Helmets, safety harnesses' }
  ];

  const partners = [
    { name: "Tata Steel", desc: "Wholesale Steel Rebars" },
    { name: "Birla Cement", desc: "Premium Concrete Blends" },
    { name: "Kajaria Ceramics", desc: "Vitrified Tile Gallery" },
    { name: "Finolex Cables", desc: "ISI Copper Electricals" },
    { name: "Asian Paints", desc: "Emulsions & Wall Coats" }
  ];

  const values = [
    { title: "ISI-Certified Verification", desc: "Every batch of cement or steel listed undergoes testing audits before live listing.", icon: FiShield },
    { title: "Direct Wholesaler Dispatch", desc: "Procure directly from manufacturing depots with transparent billing logs.", icon: FiTruck },
    { title: "Real-time RFQ Matching", desc: "Submit volume inquiries and receive automated, verified quotes in minutes.", icon: FiCheckCircle }
  ];

  const faqs = [
    { q: "How does E-Parrys guarantee wholesale prices?", a: "E-Parrys connects commercial builders directly with certified manufacturers and bulk distributors. By bypassing local middlemen, bulk procurement markups are completely eliminated." },
    { q: "What quality check audits are performed on cement and rebars?", a: "All listed suppliers must submit chemical and structural batch testing certificates for checking. Only materials conforming to BIS and ISI compliance guidelines are approved live." },
    { q: "How are site deliveries and logistics managed?", a: "Manufacturers coordinate dispatches directly from their primary yards using partner cargo loops, assuring structured tracking and site unloading schedules." }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 2. Hero Banner */}
      <section className="relative overflow-hidden pt-12 lg:pt-20 bg-parrys-cream" data-purpose="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="z-10 pb-12 lg:pb-24 space-y-8">
              <span className="text-xs font-bold tracking-widest text-parrys-terracotta uppercase block">
                Wholesale B2B Material Hub
              </span>
              <h1 className="text-5xl lg:text-7xl leading-[1.1] text-parrys-charcoal font-serif">
                Procure premium <span className="italic text-parrys-terracotta">materials</span> directly.
              </h1>
              <p className="text-lg text-parrys-muted max-w-lg leading-relaxed font-sans">
                E-Parrys is an enterprise-grade digital B2B marketplace connecting developers directly with certified building material manufacturers.
              </p>

              {/* Hero Search Bar */}
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-custom border border-parrys-surface-dim p-1.5 shadow-sm max-w-md">
                <FiSearch className="h-5 w-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cement, steel rebars, tiles, paints..."
                  className="w-full bg-transparent border-0 px-3 text-xs focus:ring-0 focus:outline-none text-parrys-charcoal placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="bg-parrys-terracotta text-white px-5 py-2.5 rounded-custom text-xs font-bold hover:bg-parrys-terracotta-dark btn-transition shrink-0"
                >
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="bg-parrys-terracotta text-white px-8 py-4 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-parrys-terracotta-dark hover:scale-[1.03] btn-transition shadow-lg shadow-parrys-terracotta/15"
                >
                  <span>Browse Catalogue</span>
                  <FiArrowRight className="h-4.5 w-4.5" />
                </Link>
                <Link
                  to="/vendor-registration"
                  className="border border-parrys-surface-dim bg-white hover:bg-parrys-cream hover:border-parrys-terracotta/60 text-parrys-charcoal px-8 py-4 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] btn-transition shadow-sm"
                >
                  <span>Become a Supplier</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image (Curved hero-mask) */}
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-[90%] z-0 h-96 lg:h-auto">
              <div className="hero-mask overflow-hidden h-full shadow-2xl border-l border-b border-parrys-surface-dim/40">
                <img 
                  alt="Construction structure reinforcement" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800"
                />
              </div>
              <div className="absolute top-12 right-12 bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-custom max-w-[240px] hidden xl:block shadow-lg">
                <p className="text-parrys-charcoal font-serif text-xl leading-snug">
                  Premium works start with <span className="text-parrys-terracotta italic underline font-bold">verified sourcing.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Material Classes</span>
          <h2 className="text-3xl lg:text-4xl text-parrys-charcoal font-serif">Comprehensive Product Categories</h2>
          <p className="text-xs text-parrys-muted">Browse building supplies matching structural and engineering codes.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {coreCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="rounded-custom border border-parrys-surface-dim/40 bg-white p-5 text-center transition-all duration-350 hover:border-parrys-terracotta hover:bg-parrys-cream/40 hover:-translate-y-1 block group shadow-sm hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-parrys-cream text-parrys-muted mx-auto group-hover:text-white group-hover:bg-parrys-terracotta transition-all duration-300 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-3.5 block text-xs font-bold uppercase tracking-wider text-parrys-charcoal truncate">
                  {cat.name}
                </span>
                <span className="text-[9px] text-parrys-muted block truncate mt-1 font-medium">
                  {cat.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="bg-white py-16 border-t border-b border-parrys-surface-dim/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Verified Catalogue</span>
              <h2 className="text-2xl lg:text-3xl text-parrys-charcoal font-serif mt-1">Featured Approved Listings</h2>
            </div>
            <Link to="/products" className="text-xs font-bold uppercase tracking-wider text-parrys-terracotta hover:underline flex items-center gap-1.5">
              <span>View Full Ledger</span>
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((prd) => (
              <Link
                key={prd.id}
                to={`/product/${prd.id}`}
                className="flex flex-col rounded-custom p-6 justify-between luxury-card group shadow-[0_4px_20px_-10px_rgba(169,68,29,0.05)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-bold text-parrys-muted uppercase tracking-widest">
                    <span>{prd.category}</span>
                    <span className="font-mono text-parrys-terracotta bg-parrys-cream px-2 py-0.5 rounded border border-parrys-surface-dim/30">{prd.sku}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-parrys-charcoal group-hover:text-parrys-terracotta transition duration-300 leading-snug font-serif">
                    {prd.productName}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-parrys-muted pt-2.5 border-t border-parrys-surface-dim/20">
                    <span>Vendor:</span>
                    <span className="font-bold text-parrys-charcoal truncate max-w-[130px]">{prd.vendorName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-parrys-surface-dim/20">
                  <span className="text-sm font-extrabold font-mono text-parrys-terracotta">
                    ₹{prd.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-500/10">
                    {prd.warehouse}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="text-[10px] font-bold tracking-widest text-parrys-muted uppercase text-center">Certified Manufacturers</p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60">
          {partners.map((pt) => (
            <div key={pt.name} className="flex flex-col items-center group cursor-pointer hover:opacity-100 transition-opacity">
              <span className="font-bold text-lg font-serif text-parrys-charcoal group-hover:text-parrys-terracotta transition-colors">{pt.name}</span>
              <span className="text-[8px] tracking-[0.1em] font-semibold text-parrys-muted uppercase mt-0.5">{pt.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Choose E-Parrys */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Marketplace Standards</span>
            <h2 className="text-3xl lg:text-4xl text-parrys-charcoal font-serif leading-tight">Securing Wholesale Sourcing Safeguards</h2>
            <p className="text-xs text-parrys-muted leading-relaxed">
              We remove the operational friction of sourcing aggregate materials by implementing digital verification standards on price, supply parameters, and GST logs.
            </p>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 space-y-3.5 shadow-sm hover:border-parrys-terracotta transition-colors">
                  <div className="inline-flex rounded-lg bg-parrys-cream border border-parrys-surface-dim p-2.5 text-parrys-terracotta">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-sm font-bold text-parrys-charcoal font-serif">{v.title}</h3>
                  <p className="text-xs text-parrys-muted leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Vendor Benefits */}
      <section className="bg-white py-16 border-t border-b border-parrys-surface-dim/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">For Wholesalers</span>
            <h2 className="text-3xl lg:text-4xl text-parrys-charcoal font-serif">Expand Sourcing Sales Directly to Top Builders</h2>
            <p className="text-xs text-parrys-muted leading-relaxed">
              Register as a certified partner manufacturer to publish cement lines, rebar specs, and wall coatings. Receive bulk RFQs directly from corporate developers, with integrated cargo dispatches and billing support.
            </p>
            <div className="space-y-2 text-xs font-semibold text-parrys-charcoal">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600 h-4 w-4" />
                <span>Zero onboarding listing fee for the first 30 days.</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600 h-4 w-4" />
                <span>Direct client query matching with no hidden commissions.</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600 h-4 w-4" />
                <span>Automated inventory capacity and stock tracking tools.</span>
              </div>
            </div>
            <Link
              to="/vendor-registration"
              className="inline-flex items-center gap-1.5 bg-parrys-terracotta text-white px-6 py-3 rounded-custom text-xs font-bold uppercase hover:bg-parrys-terracotta-dark btn-transition"
            >
              <span>Onboard Store</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-custom overflow-hidden h-80 shadow-lg border border-parrys-surface-dim">
            <img 
              alt="Cement manufacturing yard cargo loading" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800"
            />
          </div>
        </div>
      </section>

      {/* 8. Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Market Favorites</span>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Popular Structural Inventory</h2>
          <p className="text-xs text-parrys-muted">High turnover listings currently dispatched across regional metro sites.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map((prd) => (
            <Link
              key={prd.id}
              to={`/product/${prd.id}`}
              className="flex flex-col rounded-custom p-6 justify-between luxury-card group shadow-[0_4px_20px_-10px_rgba(169,68,29,0.05)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[9px] font-bold text-parrys-muted uppercase tracking-widest">
                  <span>{prd.category}</span>
                  <span className="font-mono text-parrys-terracotta bg-parrys-cream px-2 py-0.5 rounded border border-parrys-surface-dim/30">{prd.sku}</span>
                </div>
                
                <h3 className="text-sm font-bold text-parrys-charcoal group-hover:text-parrys-terracotta transition duration-300 leading-snug font-serif">
                  {prd.productName}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-parrys-muted pt-2.5 border-t border-parrys-surface-dim/20">
                  <span>Supplier:</span>
                  <span className="font-bold text-parrys-charcoal truncate max-w-[130px]">{prd.vendorName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-parrys-surface-dim/20">
                <span className="text-sm font-extrabold font-mono text-parrys-terracotta">
                  ₹{prd.amount.toLocaleString('en-IN')}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-500/10">
                  {prd.warehouse}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Client Reviews</span>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Trusted by Prominent Infrastructure Developers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-custom border border-parrys-surface-dim/40 bg-white p-8 space-y-5 shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-xs text-parrys-muted italic leading-relaxed">
              "Sourcing OPC 53 cement and TMT steel rebars through E-Parrys has saved our procurement division significant overheads on our Chennai metro sub-contracts. Direct mill invoicing was flawless."
            </p>
            <div className="border-t border-parrys-surface-dim/40 pt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-parrys-cream text-parrys-terracotta font-serif font-extrabold flex items-center justify-center border border-parrys-surface-dim/60">R</div>
              <div>
                <h4 className="text-xs font-bold text-parrys-charcoal font-serif">Ramanathan K.</h4>
                <p className="text-[8px] text-parrys-muted font-bold uppercase tracking-wider mt-0.5">Procurement Director, L&T Infrastructure</p>
              </div>
            </div>
          </div>

          <div className="rounded-custom border border-parrys-surface-dim/40 bg-white p-8 space-y-5 shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-xs text-parrys-muted italic leading-relaxed">
              "Being able to submit bulk sand and concrete aggregates RFQs and matching with verified suppliers instantly resolved our material lags. The laboratory test report checks are highly valuable."
            </p>
            <div className="border-t border-parrys-surface-dim/40 pt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-parrys-cream text-parrys-terracotta font-serif font-extrabold flex items-center justify-center border border-parrys-surface-dim/60">S</div>
              <div>
                <h4 className="text-xs font-bold text-parrys-charcoal font-serif">Suresh Kumar</h4>
                <p className="text-[8px] text-parrys-muted font-bold uppercase tracking-wider mt-0.5">Project Manager, Apex Housing Group</p>
              </div>
            </div>
          </div>

          <div className="rounded-custom border border-parrys-surface-dim/40 bg-white p-8 space-y-5 shadow-sm hover:shadow-md hover:border-parrys-terracotta/40 hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-xs text-parrys-muted italic leading-relaxed">
              "GST invoice validations, direct delivery coordination, and full price transparency. E-Parrys has established the benchmark standards for building material procurement in India."
            </p>
            <div className="border-t border-parrys-surface-dim/40 pt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-parrys-cream text-parrys-terracotta font-serif font-extrabold flex items-center justify-center border border-parrys-surface-dim/60">P</div>
              <div>
                <h4 className="text-xs font-bold text-parrys-charcoal font-serif">Priya Sen</h4>
                <p className="text-[8px] text-parrys-muted font-bold uppercase tracking-wider mt-0.5">Operations Head, GMR Airport Logistics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Statistics Bar */}
      <section className="bg-parrys-terracotta py-12 shadow-xl" data-purpose="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div className="flex items-center gap-4 border-r border-white/20 last:border-0 md:justify-center">
              <div className="w-10 h-10 flex items-center justify-center opacity-80">
                <FiUserCheck className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold opacity-80">Wholesale Vendors</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-r border-white/20 last:border-0 md:justify-center">
              <div className="w-10 h-10 flex items-center justify-center opacity-80">
                <FiBox className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-bold">15+</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold opacity-80">Material Sectors</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-r border-white/20 last:border-0 md:justify-center">
              <div className="w-10 h-10 flex items-center justify-center opacity-80">
                <FiCheckCircle className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,200+</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold opacity-80">Yards & Metros Served</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:justify-center">
              <div className="w-10 h-10 flex items-center justify-center opacity-80">
                <FiDollarSign className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹85L+</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold opacity-80">Platform Trade Value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Frequently Asked Questions</span>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Platform Sourcing FAQs</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="rounded-custom border border-parrys-surface-dim bg-white overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-xs font-bold text-parrys-charcoal focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown className={`h-4.5 w-4.5 text-parrys-terracotta transition-transform duration-305 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-parrys-surface-dim/40"
                    >
                      <p className="p-5 text-xs text-parrys-muted leading-relaxed bg-parrys-cream/15">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. CTA Wholesalers signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-parrys-surface-dim bg-gradient-to-br from-slate-900 to-parrys-charcoal p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[100px] bg-parrys-terracotta opacity-10 blur-[100px] rounded-full pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Register Today</span>
          <h2 className="text-3xl lg:text-5xl text-white font-serif leading-tight max-w-2xl mx-auto">
            Ready to Streamline Your Bulk Material Procurement?
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Onboard as a builder partner or verified manufacturer brand to start requesting quotes and publishing structural listings under transparent marketplace parameters.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/vendor-registration"
              className="bg-parrys-terracotta text-white px-8 py-3.5 rounded-custom font-semibold text-xs uppercase tracking-wider hover:bg-parrys-terracotta-dark btn-transition"
            >
              Supplier Signup
            </Link>
            <Link
              to="/contact"
              className="border border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-200 px-8 py-3.5 rounded-custom font-semibold text-xs uppercase tracking-wider btn-transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};
export default Home;
