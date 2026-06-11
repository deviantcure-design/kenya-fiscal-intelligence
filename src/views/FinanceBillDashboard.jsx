import { Activity, ShieldAlert, Scale, Wallet } from 'lucide-react';
import { FINANCE_BILL } from '../data/mockData';
import { SectionHeader, DataBadge, Explanation } from '../components/SharedUI';

export const FinanceBillDashboard = () => (
  <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32">
    <SectionHeader q="POLICY WATCH" title="Finance Bill 2026 Monitor" sub="Real-time tracking of legislative changes and citizen impact." />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        <div className="financial-card p-10 bg-slate-900/20 border-indigo-500/10">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-sm font-black text-white uppercase tracking-widest">Legislative Tracker</h3>
             <span className="text-[9px] font-black text-slate-500 uppercase">Updating Live from Parliament Hansard</span>
          </div>
          <div className="space-y-8">
            {(FINANCE_BILL.changes ?? []).map((change, i) => (
              <div key={i} className="group relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-slate-950/80 border border-slate-800 rounded-[2.5rem] hover:border-indigo-500/30 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-black text-white uppercase leading-tight">{change.item ?? "Proposal Pending"}</h4>
                      <DataBadge status={change.status} />
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6">
                       <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-indigo-400 text-[9px] font-black uppercase rounded-lg">{change.effect}</span>
                       <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-black uppercase rounded-lg">Impact: {change.affected}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500">
                       <Wallet size={14} />
                       <p className="text-[10px] font-black uppercase tracking-widest">Est. Revenue Impact: {change.impact}</p>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-4 items-center md:items-end">
                     <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors">
                        <Activity size={20} />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="financial-card p-8 border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full"></div>
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-10">Bill Status</h3>
          <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
              <span className="text-[10px] font-black text-slate-500 uppercase">Current Stage</span>
              <span className="px-3 py-1 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]">{FINANCE_BILL.status}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
              <span className="text-[10px] font-black text-slate-500 uppercase">Total Revenue Pot.</span>
              <span className="text-xl font-black text-white">{FINANCE_BILL.impact}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase">Final Assent Target</span>
              <span className="text-xs font-black text-slate-300">{FINANCE_BILL.timeline}</span>
            </div>
          </div>
          <div className="mt-10 p-6 bg-red-500/5 border border-red-500/10 rounded-[2rem]">
             <div className="flex items-center gap-2 mb-3">
                <ShieldAlert size={14} className="text-red-500" />
                <p className="text-[9px] font-black text-red-500 uppercase">Fiscal Risk Alert</p>
             </div>
             <p className="text-[11px] text-slate-400 italic leading-relaxed">"{FINANCE_BILL.risk}"</p>
          </div>
        </div>
        <Explanation body="This module tracks the Finance Bill from drafting to Presidential assent. We focus on 'Who Is Affected' to ensure policy changes are understood by every Kenyan citizen." />
      </div>
    </div>
  </div>
);
