import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Map, Scale, Briefcase, Wallet, ChevronDown, TrendingUp, Landmark } from 'lucide-react';
import { FISCAL_CORE, ECONOMIC_HEALTH_SCORE } from '../data/mockData';
import { formatKSh } from '../components/SharedUI';

export const HomeDashboard = ({ onNavigate }) => {
  const [accruedToday, setAccruedToday] = useState(0);
  const annualInterest = FISCAL_CORE.interestPaid?.val || 0;
  const interestPerSecond = annualInterest / (365 * 24 * 3600);

  useEffect(() => {
    if (annualInterest <= 0) return;
    const update = () => {
      const now = new Date();
      const secondsPassedToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      setAccruedToday(secondsPassedToday * interestPerSecond);
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, [interestPerSecond, annualInterest]);

  const debtRatio = ((FISCAL_CORE.totalDebt?.val / FISCAL_CORE.gdp) * 100).toFixed(1);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-emerald-500/30 w-full overflow-x-hidden">
      {/* HERO SECTION - FULL SCREEN */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none"></div>
        
        <div className="z-10 w-full max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2 animate-bounce">
              <TrendingUp size={14} className="text-emerald-400" /> Version 2.0: Comprehensive Fiscal Intelligence Platform
            </div>
            <h1 className="text-xs md:text-sm font-black text-emerald-500 uppercase tracking-[0.5em] animate-in fade-in slide-in-from-bottom-4 duration-700">Kenya Public Debt Stock</h1>
            <div className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {formatKSh(FISCAL_CORE.totalDebt?.val, true).replace('KSh ', '')}
            </div>
          </div>

          {/* LIVE COUNTER */}
          <div className="p-8 md:p-12 border border-red-500/20 bg-red-500/5 rounded-[3rem] inline-block w-full max-w-4xl mx-auto shadow-[0_0_40px_rgba(239,68,68,0.1)] animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <p className="text-xs font-black text-red-500 uppercase tracking-[0.4em] mb-4">Today's Interest Cost</p>
            <div className="text-4xl sm:text-6xl md:text-8xl font-black font-mono tracking-tighter text-white mb-6">
              KSh {accruedToday.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-[10px] md:text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/10 inline-block px-6 py-3 rounded-full">
              +{formatKSh(interestPerSecond, false)} Accruing Every Second
            </p>
          </div>

          {/* QUICK METRICS INCLUDING ECONOMIC HEALTH SCORE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 md:pt-16 border-t border-slate-900 w-full max-w-5xl mx-auto animate-in fade-in duration-1000 delay-500">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Debt-to-GDP</p>
              <p className="text-2xl md:text-4xl font-black text-white">{debtRatio}%</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Due in 12 Months</p>
              <p className="text-2xl md:text-4xl font-black text-amber-500">{formatKSh(FISCAL_CORE.debtDue12M?.val)}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Annual Interest</p>
              <p className="text-2xl md:text-4xl font-black text-red-400">{formatKSh(annualInterest)}</p>
            </div>
            <div 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('economy');
              }}
              className="cursor-pointer group bg-amber-500/5 p-3 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                Economic Health <TrendingUp size={12} />
              </p>
              <p className="text-xl md:text-2xl font-black text-white font-mono">{ECONOMIC_HEALTH_SCORE.score}/100</p>
              <span className="text-[9px] font-black uppercase text-amber-400 block tracking-wider">{ECONOMIC_HEALTH_SCORE.classification}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* SECOND ROW - BREAKDOWN */}
      <section className="min-h-screen flex flex-col justify-center p-6 md:p-16 max-w-6xl mx-auto">
        <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.4em] mb-16 text-center">The Fiscal Reality</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-3xl text-center hover:border-emerald-500/30 transition-colors">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Revenue Collected</p>
              <p className="text-4xl md:text-5xl font-black text-emerald-400">{formatKSh(FISCAL_CORE.revenueCollected?.val)}</p>
           </div>
           <div className="p-10 bg-red-500/5 border border-red-500/20 rounded-3xl text-center">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">Total Debt Service</p>
              <p className="text-4xl md:text-5xl font-black text-red-500">{formatKSh(FISCAL_CORE.totalDebtService?.val)}</p>
           </div>
           <div className="p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl text-center">
              <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4">Money Remaining</p>
              <p className="text-4xl md:text-5xl font-black text-cyan-400">{formatKSh(FISCAL_CORE.moneyRemaining?.val)}</p>
           </div>
        </div>

        {/* KSH 100 EXPLAINER */}
        <div className="p-10 md:p-16 border border-slate-800 bg-slate-950 rounded-[3rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5"><Scale size={200} /></div>
           <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">If Government Collects KSh 100</h3>
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-16">Where does your tax money actually go?</p>
           
           <div className="space-y-8 relative z-10">
              {[
                { label: 'Debt Service', val: 52, color: 'bg-red-500' },
                { label: 'Education', val: 14, color: 'bg-indigo-500' },
                { label: 'Counties', val: 12, color: 'bg-emerald-500' },
                { label: 'Security', val: 10, color: 'bg-slate-600' },
                { label: 'Health', val: 7, color: 'bg-cyan-500' },
                { label: 'Roads & Other', val: 5, color: 'bg-slate-700' },
              ].map((b, i) => (
                <div key={i}>
                   <div className="flex justify-between items-end mb-3">
                      <span className="text-xs md:text-sm font-black text-white uppercase tracking-widest">{b.label}</span>
                      <span className="text-xl md:text-2xl font-black text-white">KSh {b.val}</span>
                   </div>
                   <div className="h-6 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className={`h-full ${b.color}`} style={{ width: `${b.val}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* NAVIGATION / MODULES */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-slate-900">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Explore The Intelligence Modules</h2>
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Comprehensive Macro, Fiscal, & Legislative Center</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'economy', label: 'Economic Health', desc: '10 Macro Indicators, 0-100 Score, Watchlist & News', icon: TrendingUp, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' },
              { id: 'budget', label: 'FY26/27 Budget & Revenue', desc: 'KSh 4.18T Appropriations, Deficit & KRA Intelligence', icon: Landmark, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5' },
              { id: 'debt', label: 'Public Debt Stock', desc: 'Creditor networks & maturity schedules', icon: Activity, color: 'text-amber-500 border-slate-800 bg-slate-900/40' },
              { id: 'counties', label: '47 Counties Audit', desc: 'Equitable share & KSh 516B pending bills', icon: Map, color: 'text-indigo-500 border-slate-800 bg-slate-900/40' },
              { id: 'projects', label: 'Mega Projects', desc: 'True final taxpayer cost after loan compounding', icon: Briefcase, color: 'text-cyan-500 border-slate-800 bg-slate-900/40' },
              { id: 'risk', label: 'Fiscal Risk Monitor', desc: 'Stress testing & statutory PFM convergence anchors', icon: ShieldAlert, color: 'text-red-500 border-slate-800 bg-slate-900/40' },
              { id: 'bill', label: 'Finance Bill Watch', desc: 'Legislative changes & Gen-Z historical aftermath', icon: Scale, color: 'text-slate-300 border-slate-800 bg-slate-900/40' },
              { id: 'revenue', label: 'Revenue Center', desc: 'Direct KRA tax head breakdown & e-TIMS tracker', icon: Wallet, color: 'text-emerald-500 border-slate-800 bg-slate-900/40' },
            ].map(nav => (
              <button 
                key={nav.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onNavigate(nav.id);
                }}
                className={`group p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] duration-300 ${nav.color}`}
              >
                <nav.icon size={28} className="mb-5" />
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-emerald-300 transition-colors">{nav.label}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed">{nav.desc}</p>
              </button>
            ))}
         </div>
         
         <div className="mt-20 text-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
            © 2026 Transparent Kenya Portal • Live Audit Engine Active
         </div>
      </section>
    </div>
  );
};
