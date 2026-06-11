import { Briefcase, ShieldQuestion } from 'lucide-react';
import { SectionHeader, DataBadge, Explanation, formatKSh } from '../components/SharedUI';
import { PROJECTS } from '../data/mockData';

export const ProjectsDashboard = () => (
  <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32">
     <SectionHeader q="THE REAL COST" title="What Will We Pay In The End?" sub="Exposing the final price tag of major projects after loan interest." />
     <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {(PROJECTS ?? []).map((p, i) => (
          <div key={i} className="financial-card p-8 flex flex-col">
             <div className="flex justify-between items-start mb-10">
                <div className={`p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-500`}><Briefcase size={24} /></div>
                <DataBadge status={p.v} src={p.src} note={p.note} />
             </div>
             <h4 className="text-xl font-black text-white uppercase mb-10 border-b border-slate-800 pb-4 leading-tight">{p.name ?? "Data Not Available"}</h4>
             {p.total ? (
               <div className="space-y-10 flex-1">
                  <div className="space-y-4">
                     <div className="flex justify-between text-xs font-black uppercase"><span className="text-slate-500">Loan Principal</span><span className="text-white">{formatKSh(p.principal)}</span></div>
                     <div className="flex justify-between text-xs font-black uppercase"><span className="text-red-500/70">Interest Bill</span><span className="text-red-500">+{formatKSh(p.interest)}</span></div>
                  </div>
                  <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl ring-2 ring-cyan-500/20">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">Final Taxpayer Cost</span>
                        <span className="text-3xl font-black text-white font-mono">{formatKSh(p.total)}</span>
                     </div>
                  </div>
                  <Explanation body={`Impact: ${p.impact ?? "Data Not Available"}. Equivalent to building ${p.equivalent ?? "Data Not Available"}.`} />
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center py-12 text-center opacity-50 grayscale">
                  <ShieldQuestion size={48} className="text-slate-800 mb-4" />
                  <p className="text-[10px] font-black text-slate-500 uppercase max-w-[200px]">Insufficient Audit Data To Calculate Final Bill</p>
               </div>
             )}
          </div>
        ))}
        {(!PROJECTS || PROJECTS.length === 0) && <p className="text-xs text-slate-500 uppercase font-black text-center py-10 col-span-full">No Project Data Available</p>}
     </div>
  </div>
);

export const RevenueDashboard = () => (
  <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32 flex flex-col items-center justify-center min-h-[50vh]">
      <SectionHeader q="REVENUE CENTER" title="Revenue Intelligence" sub="Module in development. Expanding tracking of KRA collections." />
      <div className="p-10 border border-slate-800 rounded-3xl bg-slate-900/50 text-center w-full max-w-lg">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Under Active Construction</p>
          <p className="text-[10px] text-slate-500">The Revenue Dashboard is currently pulling real-time KRA metrics to replace static components.</p>
      </div>
  </div>
);
