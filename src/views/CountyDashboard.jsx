import { useState } from 'react';
import { Map, Search } from 'lucide-react';
import { SectionHeader, DataBadge, formatKSh } from '../components/SharedUI';
import { COUNTIES } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';

export const CountyDashboard = () => {
  const [q, setQ] = useState('');
  const filtered = (COUNTIES ?? []).filter(c => c?.name?.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-4 md:p-8 space-y-8 animate-slide-up pb-32">
       <div className="financial-card p-6 md:p-8 bg-slate-900 border-emerald-500/20 flex flex-col lg:flex-row justify-between items-center gap-6">
          <SectionHeader q="47 COUNTIES" title="Money Sent To Counties" sub="Tracking official resource sharing across all devolved units." />
          <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
             <input type="text" placeholder="Find Your County..." className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold uppercase text-white focus:outline-none" value={q} onChange={e => setQ(e.target.value)} />
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(filtered ?? []).map((c, i) => (
             <div key={i} className="financial-card p-6 group hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-500"><Map size={18} /></div>
                   <DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} />
                </div>
                <h5 className="text-base font-black text-white uppercase truncate">{c.name ?? "Data Not Available"}</h5>
                <p className="text-[10px] font-bold text-slate-600 mt-1">{c.pop?.toLocaleString() ?? "Data Not Available"} Population</p>
                <div className="mt-8 space-y-4">
                   <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Money</span>
                      <span className="text-sm font-black text-white">{formatKSh(c.allocation)}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Per Citizen</span>
                      <span className="text-xs font-black text-emerald-500">{c.pop && c.allocation ? `KSh ${(c.allocation/c.pop).toFixed(0).toLocaleString()}` : "Data Not Available"}</span>
                   </div>
                </div>
             </div>
          ))}
          {filtered.length === 0 && <div className="col-span-full py-20 text-center text-slate-500 font-black uppercase tracking-widest text-xs">No Counties Found Matching "{q}"</div>}
       </div>
    </div>
  );
};
