import { useState } from 'react';
import { Map, Search, Users, Activity } from 'lucide-react';
import { SectionHeader, DataBadge, formatKSh } from '../components/SharedUI';
import { COUNTIES } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';

export const CountyDashboard = () => {
  const [q, setQ] = useState('');
  const filtered = (COUNTIES ?? []).filter(c => c?.name?.toLowerCase().includes(q.toLowerCase()));

  const totalAllocation = (COUNTIES ?? []).reduce((acc, c) => acc + (c.allocation || 0), 0);
  const totalPendingBills = (COUNTIES ?? []).reduce((acc, c) => acc + (c.pendingBills || 0), 0);

  return (
    <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32">
       <div className="financial-card p-6 md:p-8 bg-slate-900 border-emerald-500/20 flex flex-col lg:flex-row justify-between items-center gap-6">
          <SectionHeader q="47 DEVOLVED UNITS" title="County Resource & Pending Bills Audit" sub="Tracking equitable share allocations alongside accumulated unpaid contractor bills per county." />
          <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
             <input 
               type="text" 
               placeholder="Find Your County..." 
               className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold uppercase text-white focus:outline-none focus:border-emerald-500 transition-colors" 
               value={q} 
               onChange={e => setQ(e.target.value)} 
             />
          </div>
       </div>

       {/* SUMMARY STATS BAR */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="financial-card p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900 flex items-center gap-5">
             <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-400"><Map size={28} /></div>
             <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Equitable Share</span>
                <span className="text-2xl md:text-3xl font-black text-white font-mono mt-0.5 block">{formatKSh(totalAllocation)}</span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">Distributed across 47 Counties</span>
             </div>
          </div>

          <div className="financial-card p-6 border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900 flex items-center gap-5">
             <div className="p-4 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400"><Activity size={28} /></div>
             <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Accumulated County Pending Bills</span>
                <span className="text-2xl md:text-3xl font-black text-amber-400 font-mono mt-0.5 block">{formatKSh(totalPendingBills)}</span>
                <span className="text-[10px] text-amber-400/80 font-bold block mt-0.5">Auditor General Flag (May 2026)</span>
             </div>
          </div>

          <div className="financial-card p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-slate-900 sm:col-span-2 lg:col-span-1 flex items-center gap-5">
             <div className="p-4 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl text-cyan-400"><Users size={28} /></div>
             <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Average Per Citizen Share</span>
                <span className="text-2xl md:text-3xl font-black text-cyan-400 font-mono mt-0.5 block">~KSh 7,350</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">National Devolved Average</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(filtered ?? []).map((c, i) => (
             <div key={i} className="financial-card p-6 group hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-lg">
                <div>
                   <div className="flex justify-between items-start mb-5">
                      <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform"><Map size={18} /></div>
                      <div className="flex flex-col items-end gap-1">
                         <DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} />
                         {c.status && <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${c.status === 'Delayed' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{c.status}</span>}
                      </div>
                   </div>
                   <h5 className="text-lg font-black text-white uppercase truncate mb-1">{c.name ?? "Data Not Available"}</h5>
                   <p className="text-xs font-bold text-slate-400">{c.pop?.toLocaleString() ?? "Data Not Available"} Population</p>
                </div>

                <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/80">
                   <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Equitable Share</span>
                      <span className="text-sm font-black text-white font-mono">{formatKSh(c.allocation)}</span>
                   </div>
                   
                   {c.pendingBills ? (
                     <div className="flex justify-between items-center p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Pending Bills</span>
                        <span className="text-xs font-black text-amber-400 font-mono">{formatKSh(c.pendingBills)}</span>
                     </div>
                   ) : null}

                   <div className="flex justify-between items-center p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Per Citizen</span>
                      <span className="text-xs font-black text-emerald-400 font-mono">{c.pop && c.allocation ? `KSh ${(c.allocation/c.pop).toFixed(0).toLocaleString()}` : "Data Not Available"}</span>
                   </div>
                </div>
             </div>
          ))}
          {filtered.length === 0 && <div className="col-span-full py-20 text-center text-slate-500 font-black uppercase tracking-widest text-xs">No Counties Found Matching "{q}"</div>}
       </div>
    </div>
  );
};
