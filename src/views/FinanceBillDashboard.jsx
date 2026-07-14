import { ShieldAlert, Scale, Wallet, History } from 'lucide-react';
import { FINANCE_BILL } from '../data/mockData';
import { SectionHeader, DataBadge, Explanation } from '../components/SharedUI';

export const FinanceBillDashboard = () => (
  <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32">
    <SectionHeader q="POLICY & LEGISLATIVE WATCH" title="Finance Bill & Tax Law Monitor" sub="Real-time tracking of legislative changes, Gen-Z protest aftermath, and citizen impact." />
    
    {/* HISTORICAL TURNING POINT BANNER (JUNE 2024 WITHDRAWAL AFTERMATH) */}
    <div className="p-8 md:p-10 bg-gradient-to-r from-red-500/10 via-indigo-500/10 to-slate-900 border border-red-500/30 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-3xl">
             <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase rounded-full tracking-widest flex items-center gap-1.5">
                   <History size={12} /> Watershed Historical Event
                </span>
                <span className="text-xs text-slate-400 font-mono">June 2024 - 2026 Fiscal Shift</span>
             </div>
             <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">The Gen-Z Protests & Finance Bill 2024 Total Withdrawal</h3>
             <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                In June 2024, unprecedented nationwide youth-led protests forced President William Ruto to decline assent and withdraw the entire Finance Bill 2024. This historic intervention scrapped KSh 346 Billion in proposed taxes (including 16% bread VAT and 2.5% motor vehicle tax), forcing immediate government expenditure cutbacks (~KSh 177B+ across national and county budgets) and fundamentally reshaping Kenyan fiscal policy toward administrative e-TIMS enforcement rather than punitive rate hikes.
             </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto flex-shrink-0">
             <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-2xl text-center">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Scrapped Taxes</span>
                <span className="text-2xl font-black text-red-400 font-mono mt-1 block">KSh 346B</span>
                <span className="text-[9px] text-slate-400 font-bold block mt-1">Direct Citizen Relief</span>
             </div>
             <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-2xl text-center">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Budget Cutbacks</span>
                <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">KSh 177B+</span>
                <span className="text-[9px] text-slate-400 font-bold block mt-1">Appropriation Cuts</span>
             </div>
          </div>
       </div>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        <div className="financial-card p-8 md:p-10 bg-slate-900/40 border-indigo-500/10">
          <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
             <div>
                <h3 className="text-base font-black text-white uppercase tracking-widest">Active Legislative & Tax Law Measures (2025–2026)</h3>
                <p className="text-xs text-slate-400 mt-1">How revenue is being mobilized following the 2024 reset</p>
             </div>
             <span className="text-[10px] font-black text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">Verified Parliament Hansard</span>
          </div>
          <div className="space-y-6">
            {(FINANCE_BILL.changes ?? []).map((change, i) => (
              <div key={i} className="group relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 bg-slate-950 border border-slate-800/80 rounded-[2rem] hover:border-indigo-500/40 transition-all shadow-lg">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-base md:text-lg font-black text-white uppercase leading-tight">{change.item ?? "Proposal Pending"}</h4>
                      <DataBadge status={change.status} />
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                       {change.context || change.effect}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                       <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase rounded-lg">Action: {change.effect}</span>
                       <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-black uppercase rounded-lg">Target: {change.affected}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 pt-1">
                       <Wallet size={14} />
                       <p className="text-[11px] font-black uppercase tracking-widest font-mono">Fiscal Impact: {change.impact}</p>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-4 items-center md:items-end flex-shrink-0">
                     <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-md">
                        <Scale size={20} />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="financial-card p-8 border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-xl"></div>
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Legislative Framework Status</h3>
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
              <span className="text-xs font-bold text-slate-400 uppercase">Current Legal Base</span>
              <span className="px-3 py-1 bg-cyan-400 text-slate-950 text-[10px] font-black uppercase rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]">{FINANCE_BILL.status}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
              <span className="text-xs font-bold text-slate-400 uppercase">2024 Protest Gap</span>
              <span className="text-lg font-black text-red-400 font-mono">{FINANCE_BILL.impact}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
              <span className="text-xs font-bold text-slate-400 uppercase">Policy Strategy</span>
              <span className="text-xs font-black text-slate-300 text-right">{FINANCE_BILL.timeline}</span>
            </div>
          </div>
          <div className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-[2rem] space-y-2">
             <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Socio-Political Fiscal Alert</p>
             </div>
             <p className="text-xs text-slate-300 italic leading-relaxed">"{FINANCE_BILL.risk}"</p>
          </div>
        </div>
        <Explanation body="This module provides an immutable audit of Kenya's tax legislation from the watershed Gen-Z youth protests of June 2024 to current tax enforcement measures, ensuring every citizen understands how policy directly impacts household economics." />
      </div>
    </div>
  </div>
);
