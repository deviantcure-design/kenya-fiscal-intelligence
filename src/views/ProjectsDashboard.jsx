import { Briefcase, ShieldQuestion, Activity } from 'lucide-react';
import { SectionHeader, Explanation } from '../components/SharedUI';
import { PROJECTS } from '../data/mockData';

export const ProjectsDashboard = () => (
  <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32">
     <SectionHeader q="THE REAL COST OF MEGA PROJECTS" title="What Will We Pay In The End?" sub="Exposing the true final price tag of major infrastructure after loan interest & currency compounding." />
     
     {/* PENDING BILLS AUDITOR GENERAL ALERT BANNER */}
     <div className="p-8 md:p-10 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-slate-900 border border-amber-500/30 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
           <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                 <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase rounded-full tracking-widest flex items-center gap-1.5">
                    <Activity size={12} className="animate-pulse text-amber-400" /> Auditor General Flag
                 </span>
                 <span className="text-xs text-slate-400 font-mono">May 2026 Audit Report</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">KSh 516.3 Billion in Accumulated Pending Bills</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                 Beyond formal public debt, national ministries and counties owe over KSh 516.3 Billion to private contractors, road builders, and suppliers. This shadow debt directly stalls infrastructure completion across the country.
              </p>
           </div>
           <div className="p-6 bg-slate-950/90 border border-slate-800 rounded-2xl flex flex-col items-end flex-shrink-0 min-w-[200px]">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Unpaid Invoices</span>
              <span className="text-3xl font-black text-amber-400 font-mono mt-1">KSh 516.3B</span>
              <span className="text-[10px] text-red-400 font-bold uppercase mt-1">Affecting 4,200+ SMEs</span>
           </div>
        </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((p, idx) => (
          <div key={idx} className="financial-card p-6 md:p-8 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
             <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                   <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                      <Briefcase size={22} />
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Status & Audit</span>
                      <span className="status-badge border-slate-700 text-slate-300 bg-slate-900 font-bold uppercase mt-1 inline-block">{p.status}</span>
                   </div>
                </div>

                <div>
                   <span className="text-[10px] font-black font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">{p.lender}</span>
                   <h3 className="text-lg md:text-xl font-black text-white uppercase mt-2.5 leading-tight group-hover:text-emerald-300 transition-colors">{p.name}</h3>
                   <p className="text-xs text-slate-400 leading-relaxed font-medium mt-2">{p.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                   <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Original Loan Principal</span>
                      <span className="text-base md:text-lg font-black text-white font-mono mt-0.5 block">{p.original}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Final Projected Cost</span>
                      <span className="text-base md:text-lg font-black text-red-400 font-mono mt-0.5 block">{p.finalCost}</span>
                   </div>
                </div>
             </div>

             {p.hasAudit ? (
               <div className="space-y-3 mt-6 pt-6 border-t border-slate-900">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-ping"></div>
                     <p className="text-[11px] text-emerald-300 font-medium">
                        <span className="font-bold uppercase text-[10px]">Value Equivalent:</span> {p.equivalent}
                     </p>
                  </div>
                  
                  <Explanation body={`Impact & Reality: ${p.impact ?? "Data Not Available"}`} />
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center py-12 text-center opacity-50 grayscale">
                  <ShieldQuestion size={48} className="text-slate-800 mb-4" />
                  <p className="text-[10px] font-black text-slate-500 uppercase max-w-[200px]">Insufficient Audit Data To Calculate Final Bill</p>
               </div>
             )}
          </div>
        ))}
     </div>
  </div>
);
