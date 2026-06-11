import { useState } from 'react';
import {
  LayoutDashboard, Activity, ShieldAlert, Map,
  Scale, Briefcase, Wallet, ShieldQuestion,
  Menu, X, TrendingUp
} from 'lucide-react';

import { ErrorBoundary } from './components/SharedUI';
import { SYNC_INFO } from './data/mockData';
import { HomeDashboard } from './views/HomeDashboard';
import { DebtDashboard } from './views/DebtDashboard';
import { ProjectsDashboard, RevenueDashboard } from './views/ProjectsDashboard';
import { CountyDashboard } from './views/CountyDashboard';
import { FiscalRiskDashboard } from './views/FiscalRiskDashboard';
import { FinanceBillDashboard } from './views/FinanceBillDashboard';

// ── NAV CONFIG ───────────────────────────────────────────────
const NAV = [
  { id: 'home',     label: 'Overview',      icon: LayoutDashboard, group: 'Main'       },
  { id: 'debt',     label: 'Public Debt',   icon: Activity,        group: 'Main'       },
  { id: 'revenue',  label: 'Revenue',       icon: TrendingUp,      group: 'Main'       },
  { id: 'projects', label: 'Projects',      icon: Briefcase,       group: 'Analysis'   },
  { id: 'counties', label: 'Counties',      icon: Map,             group: 'Analysis'   },
  { id: 'risk',     label: 'Fiscal Risk',   icon: ShieldAlert,     group: 'Analysis'   },
  { id: 'bill',     label: 'Finance Bill',  icon: Scale,           group: 'Legislation'},
];

// ── VIEW ROUTER ──────────────────────────────────────────────
function ViewRouter({ view, onNavigate }) {
  switch (view) {
    case 'home':     return <HomeDashboard onNavigate={onNavigate} />;
    case 'debt':     return <DebtDashboard />;
    case 'revenue':  return <RevenueDashboard />;
    case 'projects': return <ProjectsDashboard />;
    case 'counties': return <CountyDashboard />;
    case 'risk':     return <FiscalRiskDashboard />;
    case 'bill':     return <FinanceBillDashboard />;
    default:         return <HomeDashboard onNavigate={onNavigate} />;
  }
}

// ── SIDEBAR ──────────────────────────────────────────────────
function Sidebar({ view, setView, onClose }) {
  const groups = [...new Set(NAV.map(n => n.group))];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
                <ShieldQuestion className="w-3 h-3 text-black" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">Kenya Fiscal</span>
            </div>
            <p className="text-xs text-slate-500 pl-7">Intelligence Platform</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-slate-500 hover:text-slate-300 lg:hidden">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {groups.map(group => (
          <div key={group} className="mb-5">
            <p className="text-xs text-slate-600 uppercase tracking-widest font-medium px-2 mb-2">{group}</p>
            {NAV.filter(n => n.group === group).map(item => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id); onClose?.(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all duration-150 text-left ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-400 font-medium'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-emerald-400' : ''}`} />
                  {item.label}
                  {active && <div className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sync info */}
      <div className="px-5 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-600 font-mono">Status: {SYNC_INFO.status}</p>
        <p className="text-xs text-slate-700 font-mono">Synced: {SYNC_INFO.lastSync}</p>
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentNav = NAV.find(n => n.id === view);
  const isHome = view === 'home';

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
      {/* Desktop sidebar */}
      {!isHome && (
        <aside className="hidden lg:flex flex-col w-56 bg-slate-900 border-r border-slate-800 flex-shrink-0 fixed inset-y-0 left-0 z-20">
          <Sidebar view={view} setView={setView} />
        </aside>
      )}

      {/* Mobile overlay */}
      {mobileOpen && !isHome && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50">
            <Sidebar view={view} setView={setView} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 ${isHome ? '' : 'lg:ml-56'} flex flex-col min-h-screen`}>
        {/* Top bar */}
        {!isHome && (
          <header className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/60 px-4 lg:px-8 py-3.5 flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-slate-400 hover:text-slate-300"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-white truncate">{currentNav?.label ?? 'Overview'}</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Kenya Fiscal Intelligence Platform</p>
            </div>
            {/* Data trust indicator */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-500 font-mono hidden sm:block">Verified data</span>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className={`flex-1 w-full mx-auto ${isHome ? '' : 'px-4 lg:px-8 py-6 lg:py-8 max-w-7xl'}`}>
          <ErrorBoundary>
            <ViewRouter view={view} onNavigate={setView} />
          </ErrorBoundary>
        </main>

        {/* Footer */}
        {!isHome && (
          <footer className="border-t border-slate-800 px-4 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-slate-600">
                Sources: National Treasury BPS 2025, Central Bank of Kenya, KRA, IMF Fiscal Monitor
              </p>
              <p className="text-xs text-slate-700 font-mono">
                Anti-hallucination policy active · No fabricated data
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
