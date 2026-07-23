import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, FiClipboard, FiPhoneCall, FiTruck, 
  FiArrowRight, FiCheckCircle, FiChevronDown, FiShield,
  FiInfo, FiDollarSign, FiMapPin 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS_DATA = [
  {
    id: "01",
    title: "Browse & Add",
    short: "Search aggregates, select grade codes, and build your quote cart.",
    icon: FiSearch,
    details: {
      headline: "Comprehensive Catalog Sourcing",
      description: "Access a live commercial catalog containing verified construction raw materials. Each listing details chemical compliance tags, origin depots, and available shipping tonnage.",
      bullets: [
        "Filter by regional grade standards (e.g. OPC 53 Grade, Fe 550D TMT).",
        "Configure custom dispatch weights or volume counts.",
        "Add multiple products to a single inquiry ledger.",
        "Strict minimum limit of 10 units per material item to support direct depot wholesaling."
      ],
      tip: "We source directly from manufacturer yards, bypassing third-party retail markups completely."
    }
  },
  {
    id: "02",
    title: "Submit Details",
    short: "Provide delivery yard location and preferred date. No signup required.",
    icon: FiClipboard,
    details: {
      headline: "Frictionless Inquiry Submission",
      description: "Submit details without creating a profile. Simply specify the physical offloading yard coordinates, Chennai district boundary, and your target schedule window.",
      bullets: [
        "Specify metropolitan Chennai unloading yard location coordinates.",
        "Select preferred target dispatch date (including emergency same-day options).",
        "Submit GST billing ledger details for transparent corporate accounting.",
        "Zero payment details or upfront deposits are required to submit an inquiry."
      ],
      tip: "Our platform validates regional Chennai delivery zones automatically to select the nearest manufacturer warehouse."
    }
  },
  {
    id: "03",
    title: "Confirmation Call",
    short: "Team call within 2 hours to confirm pricing, freight costs, and logistics.",
    icon: FiPhoneCall,
    details: {
      headline: "Real-time Verification Call",
      description: "Our cargo loop desk calls you within 2 hours of inquiry submission to negotiate bulk freight variables, confirm inventory allocation, and coordinate unloading access.",
      bullets: [
        "Live freight cost quoting based on target site logistics.",
        "Adjust unit volume levels dynamically if bulk discounts apply.",
        "Verify truck size access restrictions for your narrow lanes.",
        "Confirm payment schedule parameters (credit cycles or direct bank transfers)."
      ],
      tip: "Emergency inquiries submitted after 6:00 PM are verified by the logistics deck by 8:00 AM the following morning."
    }
  },
  {
    id: "04",
    title: "Same-Day Delivery",
    short: "Direct manufacturer cargo dispatch and site offloading in Chennai.",
    icon: FiTruck,
    details: {
      headline: "Secured Direct Depot Logistics",
      description: "Materials are dispatched directly from regional manufacturing plants straight to your construction site, maintaining strict laboratory transit safety logs.",
      bullets: [
        "Same-day dispatches for standard cement bags and steel rebars in Chennai.",
        "Full digital weight-bridge slips delivered with cargo drivers.",
        "Assured unloading support by site logistics teams.",
        "GST-compliant e-way bill receipts provided at the unloading gate."
      ],
      tip: "All dispatches undergo third-party laboratory verification checks at origin plants to assure physical specs."
    }
  }
];

const FAQS_DATA = [
  {
    q: "Why is there a minimum limit of 10 units per material item?",
    a: "E-Parrys coordinates direct commercial shipments from manufacturer yards to construction sites. To guarantee wholesale rates and offset primary cargo truck logistics, a small order bound of 10 bags or tonnes is maintained."
  },
  {
    q: "How are freight and shipping charges calculated?",
    a: "Freight is computed during the step 3 verification call. It is determined by the physical mileage between the nearest manufacturer depot and your site, lane width restrictions, and vehicle sizes. We offer direct-to-site routes without middleman distribution hubs."
  },
  {
    q: "Do I need to sign up to place an inquiry?",
    a: "No profile registration is required for commercial inquiry submissions. You can build a cart, add delivery details, and submit. We seed a temporary local checkout session and coordinate details over the phone."
  },
  {
    q: "What payment structures do you support?",
    a: "We support direct RTGS bank transfers, corporate debit cards, and standard commercial credit structures for verified construction entities (coordinated with the logistics deck during the call)."
  }
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Sourcing Simulator States
  const [bagsCount, setBagsCount] = useState(12);
  const [selectedYard, setSelectedYard] = useState('Guindy Metro Yard');
  const [callLogs, setCallLogs] = useState<string[]>(['Dialer standby. Ready to verify.']);
  const [isDialing, setIsDialing] = useState(false);
  const [activePillar, setActivePillar] = useState<'depot' | 'index' | 'chennai'>('depot');

  const StepIcon = STEPS_DATA[activeStep].icon;

  const startDialingSimulation = () => {
    if (isDialing) return;
    setIsDialing(true);
    setCallLogs(['Initiating direct connection...', 'Querying regional Birla depot logs...']);
    setTimeout(() => {
      setCallLogs(prev => [...prev, 'Depot capacity allocated: 100% OK.']);
    }, 1000);
    setTimeout(() => {
      setCallLogs(prev => [...prev, 'GST bulk pricing applied: -15% wholesale.']);
    }, 2000);
    setTimeout(() => {
      setCallLogs(prev => [...prev, 'Logistics schedule locked. Verified.']);
      setIsDialing(false);
    }, 3000);
  };

  const renderSimulator = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-white/10 font-mono text-[10px] text-slate-300">
            <p className="text-[9px] font-bold text-parrys-terracotta tracking-wider uppercase">Live Sourcing Cart</p>
            <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-white/5">
              <div>
                <p className="font-bold text-white">OPC 53 Cement</p>
                <p className="text-[8px] text-slate-400">Direct Birla Depot</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setBagsCount(prev => Math.max(0, prev - 1))}
                  className="w-5 h-5 rounded bg-slate-800 text-white font-bold flex items-center justify-center border border-white/10 hover:bg-slate-700 hover:border-parrys-terracotta/40 transition duration-150"
                >
                  -
                </button>
                <span className={`font-bold text-xs ${bagsCount < 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {bagsCount}
                </span>
                <button 
                  onClick={() => setBagsCount(prev => prev + 1)}
                  className="w-5 h-5 rounded bg-slate-800 text-white font-bold flex items-center justify-center border border-white/10 hover:bg-slate-700 hover:border-parrys-terracotta/40 transition duration-150"
                >
                  +
                </button>
              </div>
            </div>
            {bagsCount < 10 ? (
              <div className="p-2 bg-red-950/40 border border-red-500/30 rounded text-red-400 leading-tight">
                ⚠️ Order limit warning: Minimum 10 units required.
              </div>
            ) : (
              <div className="p-2 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400 leading-tight">
                ✓ Commercial shipment parameters met. Direct dispatch allowed.
              </div>
            )}
            <div className="flex justify-between items-center text-white border-t border-white/5 pt-2 font-sans font-bold">
              <span>Wholesale Cost</span>
              <span className="font-mono text-parrys-terracotta text-xs font-bold">
                ₹{(bagsCount * 450).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-white/10 font-mono text-[10px] text-slate-300">
            <p className="text-[9px] font-bold text-parrys-terracotta tracking-wider uppercase">Chennai Sourcing Yard</p>
            <div className="space-y-3">
              <div>
                <label className="text-[8px] text-slate-400 block mb-1">Target Metro Area</label>
                <select 
                  value={selectedYard}
                  onChange={(e) => setSelectedYard(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-white text-[10px] font-mono focus:outline-none"
                >
                  <option value="Guindy Metro Yard">Guindy Yard</option>
                  <option value="Tambaram Bypass Area">Tambaram Yard</option>
                  <option value="Adyar Construction Hub">Adyar Yard</option>
                </select>
              </div>
              <div className="p-2.5 bg-slate-900 border border-white/5 rounded space-y-1">
                <p className="font-bold text-white uppercase text-[8px] tracking-wider text-parrys-terracotta">Estimated Logistics</p>
                <div className="flex justify-between">
                  <span>Lead Time:</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedYard.includes('Guindy') ? '2 Hours' : selectedYard.includes('Tambaram') ? '3 Hours' : 'Same-Day'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cargo Route:</span>
                  <span className="text-slate-200">Verified Direct Loop</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-white/10 font-mono text-[9px] text-slate-300 flex flex-col justify-between h-full">
            <div>
              <p className="text-[9px] font-bold text-parrys-terracotta tracking-wider uppercase mb-2">Logistics Control Deck</p>
              <div className="bg-slate-900 border border-white/5 rounded p-2.5 max-h-[110px] overflow-y-auto space-y-1.5 scrollbar-thin">
                {callLogs.map((log, idx) => (
                  <p key={idx} className="text-slate-300 border-l border-parrys-terracotta/40 pl-1.5 leading-snug">
                    &gt; {log}
                  </p>
                ))}
              </div>
            </div>
            <button
              onClick={startDialingSimulation}
              disabled={isDialing}
              className={`w-full py-2 bg-parrys-terracotta text-white rounded font-bold uppercase tracking-wider text-[9px] hover:bg-parrys-terracotta-dark transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                isDialing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FiPhoneCall className="h-3 w-3" />
              {isDialing ? 'Connecting...' : 'Verify Sourcing Logs'}
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-white/10 font-mono text-[9px] text-slate-300 h-full flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-[9px] font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Dispatch Stamped
              </p>
              <div className="bg-white text-slate-950 p-3 rounded border border-white/20 space-y-2 font-sans">
                <div className="flex justify-between items-start text-[8px] text-slate-400 border-b border-slate-100 pb-1.5">
                  <span className="font-extrabold uppercase font-mono tracking-wider">Direct Depot Dispatch Receipt</span>
                  <span className="font-bold font-mono text-slate-900 text-[8px]">#EP-902148</span>
                </div>
                <div className="space-y-1 text-[9px]">
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-400">GST Registration:</span>
                    <span className="font-bold">Verified Direct Sourcing</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-400">Offloading Yard:</span>
                    <span className="font-bold truncate max-w-[120px]">{selectedYard}</span>
                  </div>
                  <div className="flex justify-between text-parrys-terracotta font-extrabold pt-1.5 border-t border-slate-100">
                    <span>E-Way Bill Status:</span>
                    <span className="uppercase">Gate Out Stamped</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-2 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400 leading-none gap-1 font-semibold text-[8px] uppercase tracking-wider">
              <FiTruck className="h-3.5 w-3.5 shrink-0" />
              <span>Same-day Offloading Active</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-parrys-cream min-h-screen text-parrys-charcoal font-sans">
      {/* 1. Header Hero Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden border-b border-parrys-terracotta/20">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800')` }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-parrys-terracotta opacity-15 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase bg-parrys-terracotta/10 px-3 py-1 rounded-full border border-parrys-terracotta/20 inline-block">
            Procurement Guide
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif leading-tight max-w-3xl mx-auto text-white">
            Direct Commercial <span className="text-parrys-terracotta">Material Sourcing Pipeline</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            From regional manufacturer yards straight to your building site. How E-Parrys removes middlemen markup and logistical friction in Chennai.
          </p>
        </div>
      </section>

      {/* 2. Interactive Steps Playground */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Interactive Workflow</span>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Four Steps to Sourcing Success</h2>
          <p className="text-xs text-parrys-muted font-semibold">Click a step below to inspect its detailed parameters and logistical requirements.</p>
        </div>

        {/* Steps Selector grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STEPS_DATA.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white border-parrys-terracotta shadow-lg' 
                    : 'bg-white text-parrys-charcoal border-parrys-surface-dim hover:border-parrys-terracotta/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-mono font-extrabold ${isActive ? 'text-parrys-terracotta' : 'text-parrys-terracotta/25'}`}>
                    {step.id}
                  </span>
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-parrys-terracotta/10 text-parrys-terracotta' : 'bg-parrys-cream text-parrys-muted group-hover:text-parrys-terracotta group-hover:bg-parrys-cream/85'} transition-all duration-300`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
                <h3 className={`text-sm font-bold font-serif mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-parrys-charcoal'}`}>
                  {step.title}
                </h3>
                <p className={`text-[11px] leading-relaxed font-medium ${isActive ? 'text-slate-300' : 'text-parrys-muted'}`}>
                  {step.short}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed step visual card */}
        <div className="bg-white rounded-3xl border border-parrys-surface-dim shadow-xl overflow-hidden min-h-[380px] flex flex-col md:flex-row">
          {/* Left panel (Interactive Sourcing Simulator Console) */}
          <div className="md:w-2/5 bg-slate-900 text-white p-6 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-white/5">
            <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800')` }} />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-parrys-terracotta/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="space-y-3 relative z-10 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-mono font-extrabold text-parrys-terracotta">
                  {STEPS_DATA[activeStep].id}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                  Logistics Simulator
                </span>
              </div>
              <h4 className="text-xl font-serif leading-tight">
                {STEPS_DATA[activeStep].title} Stage
              </h4>
            </div>

            {/* Simulated Live Console */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              {renderSimulator()}
            </div>

            <div className="flex items-center gap-2 relative z-10 pt-4 border-t border-white/10 mt-6 text-left">
              <div className="p-2 bg-parrys-terracotta/10 text-parrys-terracotta rounded-lg">
                <StepIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Simulating</p>
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">{STEPS_DATA[activeStep].title}</p>
              </div>
            </div>
          </div>

          {/* Right panel (Content matrix) */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-between space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Logistics Specification</span>
                  <h4 className="text-2xl font-serif text-parrys-charcoal">{STEPS_DATA[activeStep].details.headline}</h4>
                  <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
                    {STEPS_DATA[activeStep].details.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-parrys-surface-dim">
                  <span className="text-[9px] font-bold text-parrys-muted uppercase tracking-wider block">Standard Parameters Checked:</span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {STEPS_DATA[activeStep].details.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-parrys-charcoal font-semibold">
                        <FiCheckCircle className="text-emerald-600 h-4 w-4 shrink-0 mt-0.5" />
                        <span className="leading-tight">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Micro-tip info box */}
            <div className="bg-parrys-cream border border-parrys-surface-dim rounded-2xl p-4 flex gap-3 items-center">
              <FiInfo className="text-parrys-terracotta h-5 w-5 shrink-0" />
              <p className="text-[11px] text-parrys-muted leading-relaxed font-semibold">
                <span className="font-extrabold text-parrys-charcoal block md:inline uppercase mr-1">Pro Tip:</span>
                {STEPS_DATA[activeStep].details.tip}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Procurement Safety Standards / Value Proposition (Radar Verification Hub) */}
      <section className="bg-white border-t border-b border-parrys-surface-dim py-20 relative overflow-hidden">
        {/* Decorative background grid elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-parrys-cream/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left Column: Intro Text */}
            <div className="md:col-span-5 space-y-5 text-left">
              <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Verification Standards</span>
              <h3 className="text-3xl font-serif text-parrys-charcoal leading-tight">Secured Sourcing Guardrails</h3>
              <p className="text-xs text-parrys-muted leading-relaxed font-semibold">
                We eliminate operational risks and third-party markup. Hover over the radar coordinates on the right to examine direct tracking stats.
              </p>
              <div className="space-y-3 pt-3 border-t border-parrys-surface-dim/60 text-xs font-semibold text-parrys-charcoal">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-600 h-4.5 w-4.5 shrink-0" />
                  <span>Lab verified certificates loaded at checkout.</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-600 h-4.5 w-4.5 shrink-0" />
                  <span>Direct truck dispatches logged on Chennai highways.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Radar Telemetry Circle */}
            <div className="md:col-span-7 flex justify-center py-8">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full border border-parrys-surface-dim flex items-center justify-center bg-slate-900/[0.02]">
                {/* 3 Concentric radar guide lines */}
                <div className="absolute inset-4 rounded-full border border-dashed border-parrys-surface-dim/40" />
                <div className="absolute inset-12 rounded-full border border-parrys-surface-dim/30" />
                <div className="absolute inset-[80px] rounded-full border border-dashed border-parrys-surface-dim/20" />

                {/* Indefinitely rotating radar sweep slice */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none animate-spin" style={{ animationDuration: '7s' }}>
                  <div 
                    className="w-full h-full bg-gradient-to-tr from-transparent via-transparent to-parrys-terracotta/15"
                    style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}
                  />
                </div>

                {/* Focal Center Screen */}
                <div className="absolute inset-[64px] md:inset-[72px] rounded-full bg-slate-900 border border-parrys-terracotta/30 flex flex-col items-center justify-center text-center p-4 shadow-xl z-20 text-white select-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-1"
                    >
                      <p className="text-2xl md:text-3xl font-extrabold font-mono text-parrys-terracotta tracking-tight leading-none">
                        {activePillar === 'depot' ? '99.8%' : activePillar === 'index' ? '₹0' : '35 km'}
                      </p>
                      <p className="text-[7.5px] font-extrabold uppercase tracking-widest text-slate-400 leading-none">
                        {activePillar === 'depot' ? 'Compliance index' : activePillar === 'index' ? 'Middleman markups' : 'Shipping radius'}
                      </p>
                      <p className="text-[8px] text-slate-300 font-semibold leading-tight max-w-[125px] mx-auto pt-1 border-t border-white/5 mt-1">
                        {activePillar === 'depot' ? 'Origin plant test logs checked.' : activePillar === 'index' ? 'No added distributor margins.' : 'Metropolitan cargo dispatches.'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 1. Depot Direct (12 o'clock) */}
                <div 
                  onMouseEnter={() => setActivePillar('depot')}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-30
                    ${activePillar === 'depot' ? 'scale-105' : 'opacity-85 scale-95'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    activePillar === 'depot' 
                      ? 'bg-parrys-terracotta text-white ring-4 ring-parrys-terracotta/20 border-parrys-terracotta' 
                      : 'bg-white text-parrys-terracotta border border-parrys-surface-dim group-hover:border-parrys-terracotta'
                  }`}>
                    <FiShield className="h-5 w-5" />
                  </div>
                  <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/95 backdrop-blur shadow-sm ${
                    activePillar === 'depot' ? 'border-parrys-terracotta text-parrys-terracotta font-extrabold' : 'border-parrys-surface-dim text-parrys-muted'
                  }`}>
                    Depot Direct
                  </span>
                </div>

                {/* 2. Transparent Index (3 o'clock) */}
                <div 
                  onMouseEnter={() => setActivePillar('index')}
                  className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-30
                    ${activePillar === 'index' ? 'scale-105' : 'opacity-85 scale-95'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    activePillar === 'index' 
                      ? 'bg-parrys-terracotta text-white ring-4 ring-parrys-terracotta/20 border-parrys-terracotta' 
                      : 'bg-white text-parrys-terracotta border border-parrys-surface-dim group-hover:border-parrys-terracotta'
                  }`}>
                    <FiDollarSign className="h-5 w-5" />
                  </div>
                  <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/95 backdrop-blur shadow-sm ${
                    activePillar === 'index' ? 'border-parrys-terracotta text-parrys-terracotta font-extrabold' : 'border-parrys-surface-dim text-parrys-muted'
                  }`}>
                    Transparent Index
                  </span>
                </div>

                {/* 3. Chennai Wide (6 o'clock) */}
                <div 
                  onMouseEnter={() => setActivePillar('chennai')}
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-30
                    ${activePillar === 'chennai' ? 'scale-105' : 'opacity-85 scale-95'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    activePillar === 'chennai' 
                      ? 'bg-parrys-terracotta text-white ring-4 ring-parrys-terracotta/20 border-parrys-terracotta' 
                      : 'bg-white text-parrys-terracotta border border-parrys-surface-dim group-hover:border-parrys-terracotta'
                  }`}>
                    <FiMapPin className="h-5 w-5" />
                  </div>
                  <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/95 backdrop-blur shadow-sm ${
                    activePillar === 'chennai' ? 'border-parrys-terracotta text-parrys-terracotta font-extrabold' : 'border-parrys-surface-dim text-parrys-muted'
                  }`}>
                    Chennai Wide
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sourcing FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Procurement FAQs</span>
          <h2 className="text-3xl text-parrys-charcoal font-serif">Logistical Sourcing FAQs</h2>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="rounded-2xl border border-parrys-surface-dim bg-white overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-xs font-bold text-parrys-charcoal focus:outline-none cursor-pointer"
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
                      <p className="p-5 text-xs text-parrys-muted leading-relaxed bg-parrys-cream/15 font-semibold">
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

      {/* 5. Big CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl border border-parrys-surface-dim bg-slate-900 p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[100px] bg-parrys-terracotta opacity-15 blur-[100px] rounded-full pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-widest text-parrys-terracotta uppercase block">Start Procurement</span>
          <h2 className="text-3xl lg:text-4xl text-white font-serif max-w-2xl mx-auto leading-snug">
            Ready to source directly from verified depots?
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed font-semibold">
            Search aggregates, evaluate structural steel grids, and submit quotes. Our cargo loop coordinates the logistics for direct unloading at your Chennai metro site yard.
          </p>
          
          <div className="flex justify-center pt-4">
            <Link
              to="/products"
              className="bg-parrys-terracotta text-white px-8 py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-parrys-terracotta-dark hover:scale-[1.03] transition duration-300"
            >
              <span>Explore Catalogue</span>
              <FiArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
