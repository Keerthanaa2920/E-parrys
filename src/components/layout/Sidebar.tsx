import React from 'react';
import { 
  FiGrid, FiTruck, FiBox, FiTrendingUp, 
  FiFileText, FiHelpCircle, FiChevronLeft, 
  FiSettings, FiShield, FiPercent
} from 'react-icons/fi';
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activePath: string;
  onNavigate: (path: string) => void;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
  badgeType?: 'info' | 'critical';
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  activePath,
  onNavigate
}) => {
  const menuSections: MenuSection[] = [
    {
      title: "Control Panel",
      items: [
        { name: "Live Dashboard", icon: FiGrid, path: "dashboard" },
        { name: "Vendor Listings", icon: FiTruck, path: "logistics", badge: "Live" },
        { name: "Inventory Stock", icon: FiBox, path: "inventory" }
      ]
    },
    {
      title: "Analytics & Reports",
      items: [
        { name: "KPI Metrics", icon: FiTrendingUp, path: "analytics" },
        { name: "Material Ledger", icon: FiFileText, path: "ledger" },
        { name: "Material Audits", icon: FiPercent, path: "sla" }
      ]
    },
    {
      title: "System Admin",
      items: [
        { name: "Security & Keys", icon: FiShield, path: "security" },
        { name: "Settings", icon: FiSettings, path: "settings" },
        { name: "Documentation", icon: FiHelpCircle, path: "docs" }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-[var(--color-brand-border)] bg-[#070a13] transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header Brand Area */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--color-brand-border)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[var(--color-brand-cyan)] to-[var(--color-brand-indigo)] font-bold text-white shadow-lg shadow-cyan-500/10">
              EP
            </div>
            {isOpen && (
              <span className="font-semibold tracking-wider text-slate-100 uppercase truncate">
                E-Parrys <span className="text-[var(--color-brand-cyan)] text-xs">v2.4</span>
              </span>
            )}
          </div>
          
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="hidden lg:flex h-6 w-6 items-center justify-center rounded border border-[var(--color-brand-border)] bg-slate-900 text-slate-400 hover:text-white transition"
              aria-label="Collapse Sidebar"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation Options */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 no-scrollbar space-y-6">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              {isOpen ? (
                <h4 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {section.title}
                </h4>
              ) : (
                <div className="h-px bg-slate-800/60 my-2" />
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activePath === item.path;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        onNavigate(item.path);
                        // On mobile, close sidebar automatically on navigation
                        if (window.innerWidth < 1024) {
                          setIsOpen(false);
                        }
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group focus:outline-none relative
                        ${isActive 
                          ? 'bg-gradient-to-r from-cyan-950/40 to-slate-900/50 text-[var(--color-brand-cyan)] border-l-2 border-[var(--color-brand-cyan)]' 
                          : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-100'
                        }
                      `}
                    >
                      <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[var(--color-brand-cyan)]' : 'text-slate-400 group-hover:text-slate-200 transition'}`} />
                      
                      {isOpen && (
                        <span className="truncate flex-1 text-left">{item.name}</span>
                      )}
                      
                      {isOpen && item.badge && (
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider
                          ${item.badgeType === 'critical' 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                            : 'bg-cyan-500/20 text-[var(--color-brand-cyan)] border border-cyan-500/30'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}

                      {/* Tooltip for collapsed states */}
                      {!isOpen && (
                        <div className="absolute left-16 z-50 scale-0 rounded bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-slate-200 shadow-xl transition-all group-hover:scale-100 pointer-events-none whitespace-nowrap">
                          {item.name}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Storage Health */}
        {isOpen && (
          <div className="p-4 border-t border-[var(--color-brand-border)] bg-slate-950/30">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
              <span>E-PARRYS YARD STOCKS</span>
              <span className="text-[var(--color-brand-cyan)]">84%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-indigo)]"
                style={{ width: '84%' }}
              />
            </div>
            <p className="mt-2 text-[9px] text-slate-500 leading-normal">
              High demand cement and aggregates silos close to storage capacity.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
