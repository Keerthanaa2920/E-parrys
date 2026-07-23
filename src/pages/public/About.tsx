import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTruck, FiDollarSign, FiAward, FiMapPin, 
  FiArrowRight, FiCheckCircle, FiArrowUpRight,
  FiCrosshair
} from 'react-icons/fi';

const CHENNAI_DISTRICTS = [
  "Anna Nagar", "T. Nagar", "Velachery", "Tambaram", "Chromepet", 
  "Ambattur", "Porur", "Guindy", "Adyar", "Mylapore", 
  "Teynampet", "Kodambakkam", "Avadi", "Sholinganallur", "Medavakkam", 
  "Pallavaram", "Madhavaram", "Tondiarpet", "OMR", "ECR"
];

const NAMED_BRANDS = [
  { name: "Ramco Cement", desc: "OPC 53 & Supercrete PPC" },
  { name: "JSW Steel", desc: "Fe 550D TMT Rebars" },
  { name: "Polycab Wires", desc: "Single & Multi-Core Copper" },
  { name: "Asian Paints", desc: "Apex Ultima & Weathercoat" }
];

export const About: React.FC = () => {
  const [activeMarker, setActiveMarker] = useState<'delivery' | 'pricing' | 'quality'>('delivery');
  return (
    <div className="bg-parrys-cream min-h-screen text-parrys-charcoal font-sans">
      {/* 1. Hero Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden border-b border-parrys-terracotta/20">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800')` }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-parrys-terracotta opacity-15 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase bg-parrys-terracotta/10 px-3 py-1 rounded-full border border-parrys-terracotta/20 inline-block">
            About Us
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif leading-tight max-w-3xl mx-auto text-white">
            Chennai's Wholesale <span className="text-parrys-terracotta">Construction Platform</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Bridging historic merchant tradition with enterprise digital logistics across every Chennai site development sector.
          </p>
        </div>
      </section>

      {/* 2. Main Story Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="bg-white rounded-3xl border border-parrys-surface-dim p-8 md:p-12 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-parrys-terracotta" />
          
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Heritage & Vision</span>
            <h2 className="text-2xl lg:text-3xl font-serif text-parrys-charcoal leading-snug">
              Carrying Parry's Corner Merchant Instinct into the Digital Era
            </h2>
          </div>

          <div className="space-y-6 text-sm text-parrys-muted leading-relaxed font-semibold">
            <p>
              E-Parrys is named after Parry's Corner — Chennai's historic trading district where merchants have moved goods across South India for over a century. We carry that same trader's instinct into the digital era: clean inventory, fair wholesale prices, and a phone call you can actually rely on.
            </p>
            <p>
              We connect builders, contractors and developers directly with distributors of cement, steel, sand, plumbing, electrical and finishing materials. No middlemen, no retail markup. Order online, get a confirmation call within two hours, and we deliver to your site the same day across every Chennai district.
            </p>
          </div>

          <div className="pt-6 border-t border-parrys-surface-dim/60 grid sm:grid-cols-3 gap-4 text-xs font-bold text-parrys-charcoal">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-emerald-600 h-4 w-4 shrink-0" />
              <span>Zero Middlemen Markups</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-emerald-600 h-4 w-4 shrink-0" />
              <span>2-Hour Confirmation Desk</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-emerald-600 h-4 w-4 shrink-0" />
              <span>Direct Site Offloading</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Group & Partner Companies Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Group Ecosystem</span>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Associated Group Companies</h2>
          <p className="text-xs text-parrys-muted font-semibold">Delivering end-to-end architectural design, civil engineering, and material supply.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Company 1: Shan Architects */}
          <div className="bg-white rounded-3xl border border-parrys-surface-dim p-8 shadow-lg hover:shadow-xl hover:border-parrys-terracotta/50 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-6">
              {/* Top Accent Line */}
              <div className="w-10 h-1 bg-parrys-terracotta rounded-full" />
              
              <div className="space-y-2">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-parrys-terracotta/80 block">
                  ARCHITECTURE & INTERIOR DESIGN
                </span>
                <h3 className="text-3xl font-extrabold text-parrys-terracotta tracking-tight font-sans">
                  Shan Architects
                </h3>
              </div>

              <p className="text-sm text-slate-700 font-extrabold leading-relaxed">
                Architecture shaped with restraint, clarity, and warmth.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-[9px] font-bold text-parrys-terracotta/80 uppercase tracking-wider">
                <span>RESTRAINED ELEGANCE</span> • <span>SPATIAL CLARITY</span> • <span>INTERIOR DESIGN</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-parrys-terracotta text-white flex items-center justify-center group-hover:scale-110 transition duration-300 shrink-0 shadow-md">
                <FiArrowUpRight className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>

          {/* Company 2: Shree Shan Constructions */}
          <div className="bg-white rounded-3xl border border-parrys-surface-dim p-8 shadow-lg hover:shadow-xl hover:border-parrys-terracotta/50 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-6">
              {/* Top Accent Line */}
              <div className="w-10 h-1 bg-parrys-terracotta rounded-full" />
              
              <div className="space-y-2">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-parrys-terracotta/80 block">
                  CONSTRUCTION & INFRASTRUCTURE
                </span>
                <h3 className="text-3xl font-extrabold text-parrys-terracotta tracking-tight font-sans">
                  Shree Shan Constructions
                </h3>
              </div>

              <p className="text-sm text-slate-700 font-extrabold leading-relaxed">
                Reliable civil execution for durable modern spaces.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-[9px] font-bold text-parrys-terracotta/80 uppercase tracking-wider">
                <span>STRUCTURED PROJECT DELIVERY</span> • <span>CIVIL ENGINEERING DEPTH</span> • <span>MODERN CONSTRUCTION METHODS</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-parrys-terracotta text-white flex items-center justify-center group-hover:scale-110 transition duration-300 shrink-0 shadow-md">
                <FiArrowUpRight className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Pillars - Visual Cutaway Blueprint */}
      <section className="bg-slate-900 text-white border-t border-b border-parrys-surface-dim py-20 relative overflow-hidden">
        {/* Technical Blueprint Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-parrys-terracotta/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase bg-parrys-terracotta/10 px-3 py-1 rounded-full border border-parrys-terracotta/20 inline-block">
              Civil Engineering Blueprint
            </span>
            <h2 className="text-3xl text-white font-serif">Core Guarantees Cross-Section</h2>
            <p className="text-xs text-slate-300 font-semibold">Hover over any data block to anchor its technical specification onto our active delivery vehicle.</p>
          </div>

          {/* Blueprint Telemetry Deck Container */}
          <div className="bg-slate-950/90 rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden backdrop-blur">
            {/* Top CAD Header Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-3">
              <div className="flex items-center gap-2">
                <FiCrosshair className="text-parrys-terracotta h-4 w-4 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-parrys-terracotta font-mono">
                  DWG #EP-2026-LOGISTICS-SPEC
                </span>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 font-mono">
                <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded">SCALE 1:50</span>
                <span className="text-emerald-400">STATUS: VERIFIED DIRECT DISPATCH</span>
              </div>
            </div>

            {/* Central Cutaway Image with Architectural Extension Points */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group max-w-4xl mx-auto bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200" 
                alt="E-Parrys Direct Sourcing Cargo Truck Cutaway" 
                className="w-full h-[320px] md:h-[420px] object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500"
              />
              
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Laser Target Reticle Box over Active Anchor */}
              <div className={`absolute pointer-events-none z-20 transition-all duration-500 border border-parrys-terracotta/60 rounded-lg p-2 ${
                activeMarker === 'delivery' ? 'top-[68%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-16 h-16' :
                activeMarker === 'pricing' ? 'top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16' :
                'top-[42%] right-[22%] translate-x-1/2 -translate-y-1/2 w-16 h-16'
              }`}>
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-parrys-terracotta" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-parrys-terracotta" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-parrys-terracotta" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-parrys-terracotta" />
              </div>

              {/* ANCHOR 1: Same-Day Delivery (Wheels/Axle - Bottom Left) */}
              <div 
                onClick={() => setActiveMarker('delivery')}
                onMouseEnter={() => setActiveMarker('delivery')}
                className={`absolute top-[68%] left-[28%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/anchor transition-all duration-300 ${
                  activeMarker === 'delivery' ? 'scale-110' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-parrys-terracotta opacity-75" />
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeMarker === 'delivery' 
                      ? 'bg-parrys-terracotta border-white text-white ring-4 ring-parrys-terracotta/30' 
                      : 'bg-slate-900 border-parrys-terracotta text-parrys-terracotta'
                  }`}>
                    <FiTruck className="h-4 w-4" />
                  </div>
                </div>
                {/* Architectural Line & Label */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-900/90 border rounded text-[8px] font-mono font-bold tracking-widest whitespace-nowrap backdrop-blur transition-all duration-300 ${
                  activeMarker === 'delivery' ? 'border-parrys-terracotta text-parrys-terracotta' : 'border-white/20 text-slate-300'
                }`}>
                  REF #01: FLEET AXLE
                </div>
              </div>

              {/* ANCHOR 2: Wholesale Pricing (Cargo/Rebar/Cement Bed - Center Top) */}
              <div 
                onClick={() => setActiveMarker('pricing')}
                onMouseEnter={() => setActiveMarker('pricing')}
                className={`absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/anchor transition-all duration-300 ${
                  activeMarker === 'pricing' ? 'scale-110' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-parrys-terracotta opacity-75" />
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeMarker === 'pricing' 
                      ? 'bg-parrys-terracotta border-white text-white ring-4 ring-parrys-terracotta/30' 
                      : 'bg-slate-900 border-parrys-terracotta text-parrys-terracotta'
                  }`}>
                    <FiDollarSign className="h-4 w-4" />
                  </div>
                </div>
                {/* Architectural Line & Label */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900/90 border rounded text-[8px] font-mono font-bold tracking-widest whitespace-nowrap backdrop-blur transition-all duration-300 ${
                  activeMarker === 'pricing' ? 'border-parrys-terracotta text-parrys-terracotta' : 'border-white/20 text-slate-300'
                }`}>
                  REF #02: BULK CARGO BED
                </div>
              </div>

              {/* ANCHOR 3: Quality Assured (Inspection Stamp - Right Top) */}
              <div 
                onClick={() => setActiveMarker('quality')}
                onMouseEnter={() => setActiveMarker('quality')}
                className={`absolute top-[42%] right-[22%] translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group/anchor transition-all duration-300 ${
                  activeMarker === 'quality' ? 'scale-110' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-parrys-terracotta opacity-75" />
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeMarker === 'quality' 
                      ? 'bg-parrys-terracotta border-white text-white ring-4 ring-parrys-terracotta/30' 
                      : 'bg-slate-900 border-parrys-terracotta text-parrys-terracotta'
                  }`}>
                    <FiAward className="h-4 w-4" />
                  </div>
                </div>
                {/* Architectural Line & Label */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-900/90 border rounded text-[8px] font-mono font-bold tracking-widest whitespace-nowrap backdrop-blur transition-all duration-300 ${
                  activeMarker === 'quality' ? 'border-parrys-terracotta text-parrys-terracotta' : 'border-white/20 text-slate-300'
                }`}>
                  REF #03: BIS QUALITY STAMP
                </div>
              </div>

              {/* Floating Live Telemetry CAD Reader Overlay (Top Left) */}
              <div className="absolute top-4 left-4 max-w-[240px] bg-slate-950/90 border border-parrys-terracotta/40 rounded-xl p-3 backdrop-blur shadow-2xl z-20 text-[9px] font-mono space-y-1.5 hidden sm:block">
                <div className="flex justify-between items-center border-b border-white/10 pb-1 text-[8px] text-parrys-terracotta font-extrabold uppercase">
                  <span>TELEMETRY READER</span>
                  <span className="animate-pulse text-emerald-400">LIVE</span>
                </div>
                {activeMarker === 'delivery' && (
                  <div className="space-y-1 text-slate-300">
                    <p><strong className="text-white">ROUTE:</strong> Chennai Metro Radial Loop</p>
                    <p><strong className="text-white">MAX TRANSIT:</strong> &lt; 24 Hours (Same-Day)</p>
                    <p><strong className="text-white">AXLE LOAD:</strong> 16-Tonne Fleet Truck</p>
                    <p className="text-emerald-400 font-bold border-t border-white/5 pt-1">&gt; GATE-TO-SITE SUPPORT OK</p>
                  </div>
                )}
                {activeMarker === 'pricing' && (
                  <div className="space-y-1 text-slate-300">
                    <p><strong className="text-white">DEPOT LINK:</strong> Birla / JSW / Ramco Yard</p>
                    <p><strong className="text-white">RETAIL MARKUP:</strong> 0% Direct Wholesaling</p>
                    <p><strong className="text-white">CONFIRMATION:</strong> &lt; 2 Hours Phone Desk</p>
                    <p className="text-emerald-400 font-bold border-t border-white/5 pt-1">&gt; 100% GST E-WAY INVOICE</p>
                  </div>
                )}
                {activeMarker === 'quality' && (
                  <div className="space-y-1 text-slate-300">
                    <p><strong className="text-white">IS CODE:</strong> IS 12269:2013 / IS 1786</p>
                    <p><strong className="text-white">LAB AUDIT:</strong> Origin Plant Certified</p>
                    <p><strong className="text-white">BRANDS:</strong> Ramco, JSW, Polycab, Asian</p>
                    <p className="text-emerald-400 font-bold border-t border-white/5 pt-1">&gt; PHYSICAL TEST SLIP INCLUDED</p>
                  </div>
                )}
              </div>

              {/* Overlay Spec Info Tag (Bottom Bar) */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-white/10 rounded-xl p-3 backdrop-blur flex justify-between items-center text-xs z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest">
                    ACTIVE ANCHOR: <strong className="text-parrys-terracotta">{activeMarker.toUpperCase()} SPECS</strong>
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase hidden sm:inline">
                  {activeMarker === 'delivery' ? 'AXLE & ROUTE CHECK OK' : activeMarker === 'pricing' ? 'DIRECT FACTORY RATE LOADED' : 'BIS LAB TEST CERTIFIED'}
                </span>
              </div>
            </div>

            {/* 3 Interactive Extension Data Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Block 1: Same-Day Delivery */}
              <div 
                onMouseEnter={() => setActiveMarker('delivery')}
                onClick={() => setActiveMarker('delivery')}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left space-y-3 relative overflow-hidden ${
                  activeMarker === 'delivery'
                    ? 'bg-slate-900 border-parrys-terracotta ring-1 ring-parrys-terracotta/40 shadow-xl'
                    : 'bg-slate-900/40 border-white/10 hover:border-parrys-terracotta/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${activeMarker === 'delivery' ? 'bg-parrys-terracotta text-white' : 'bg-white/5 text-slate-400'}`}>
                    <FiTruck className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-parrys-terracotta uppercase">REF #01</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white">Same-Day Delivery</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  Across all Chennai districts including OMR, ECR, Tambaram and Avadi.
                </p>
                <div className="pt-2 border-t border-white/10 text-[9px] font-mono text-slate-400 flex justify-between">
                  <span>DISPATCH: SAME-DAY</span>
                  <span className="text-emerald-400">GPS MONITORED</span>
                </div>
              </div>

              {/* Block 2: Wholesale Pricing */}
              <div 
                onMouseEnter={() => setActiveMarker('pricing')}
                onClick={() => setActiveMarker('pricing')}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left space-y-3 relative overflow-hidden ${
                  activeMarker === 'pricing'
                    ? 'bg-slate-900 border-parrys-terracotta ring-1 ring-parrys-terracotta/40 shadow-xl'
                    : 'bg-slate-900/40 border-white/10 hover:border-parrys-terracotta/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${activeMarker === 'pricing' ? 'bg-parrys-terracotta text-white' : 'bg-white/5 text-slate-400'}`}>
                    <FiDollarSign className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-parrys-terracotta uppercase">REF #02</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white">Wholesale Pricing</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  Direct distributor rates with transparent quotes confirmed on call.
                </p>
                <div className="pt-2 border-t border-white/10 text-[9px] font-mono text-slate-400 flex justify-between">
                  <span>MARKUP: 0%</span>
                  <span className="text-emerald-400">FACTORY DIRECT</span>
                </div>
              </div>

              {/* Block 3: Quality Assured */}
              <div 
                onMouseEnter={() => setActiveMarker('quality')}
                onClick={() => setActiveMarker('quality')}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left space-y-3 relative overflow-hidden ${
                  activeMarker === 'quality'
                    ? 'bg-slate-900 border-parrys-terracotta ring-1 ring-parrys-terracotta/40 shadow-xl'
                    : 'bg-slate-900/40 border-white/10 hover:border-parrys-terracotta/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${activeMarker === 'quality' ? 'bg-parrys-terracotta text-white' : 'bg-white/5 text-slate-400'}`}>
                    <FiAward className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-parrys-terracotta uppercase">REF #03</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white">Quality Assured</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  Materials sourced from named brands — Ramco, JSW, Polycab, Asian Paints.
                </p>
                <div className="pt-2 border-t border-white/10 text-[9px] font-mono text-slate-400 flex justify-between">
                  <span>AUDIT: BIS / ISI</span>
                  <span className="text-emerald-400">LAB CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Named Brands Showcase */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-6">Certified Primary Brand Partners</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {NAMED_BRANDS.map((b) => (
                <div key={b.name} className="p-4 bg-slate-950 border border-white/10 rounded-xl text-center space-y-1">
                  <p className="text-xs font-bold text-white font-serif">{b.name}</p>
                  <p className="text-[9px] text-slate-400 font-semibold">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Chennai Coverage Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase bg-parrys-terracotta/10 px-3 py-1 rounded-full border border-parrys-terracotta/20 mb-2">
            <FiMapPin className="h-3.5 w-3.5" />
            Metropolitan Fleet
          </div>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Chennai Coverage</h2>
          <p className="text-xs text-parrys-muted font-semibold">Same-day direct cargo dispatches operating across all major Chennai zones.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {CHENNAI_DISTRICTS.map((district) => (
            <span 
              key={district}
              className="px-4 py-2 bg-white border border-parrys-surface-dim rounded-full text-xs font-bold text-parrys-charcoal shadow-sm hover:border-parrys-terracotta hover:text-parrys-terracotta transition-colors duration-200"
            >
              {district}
            </span>
          ))}
          <span className="px-4 py-2 bg-parrys-terracotta/10 border border-parrys-terracotta/30 rounded-full text-xs font-extrabold text-parrys-terracotta shadow-sm">
            + and more
          </span>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl border border-parrys-surface-dim bg-slate-900 p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[100px] bg-parrys-terracotta opacity-15 blur-[100px] rounded-full pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Commercial Orders</span>
          <h2 className="text-3xl lg:text-4xl text-white font-serif max-w-2xl mx-auto leading-snug">
            Need Materials Dispatched to Your Site Today?
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed font-semibold">
            Browse our commercial catalog, select your required quantity, and receive your confirmation call within two hours.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/products"
              className="bg-parrys-terracotta text-white px-8 py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-parrys-terracotta-dark hover:scale-[1.03] transition duration-300"
            >
              <span>Explore Products</span>
              <FiArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
