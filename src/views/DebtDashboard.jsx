import { Clock, ShieldQuestion, Briefcase } from 'lucide-react';
import { SectionHeader, DataBadge, Explanation, formatKSh } from '../components/SharedUI';
import { LENDERS, HISTORY_LOG } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';

export const DebtDashboard = () => (
  <div className="p-4 md:p-8 space-y-16 animate-slide-up pb-32">
    {/* Lender Network */}
    <div>
      <SectionHeader q="WHO OWNS KENYA'S DEBT?" title="The Creditor Network" sub="A detailed audit of exactly who we borrowed money from." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="financial-card p-8">
               <h3 className="text-sm font-black text-white uppercase tracking-widest mb-10">Lender Distribution</h3>
               <div className="space-y-10">
                  {([...(LENDERS ?? [])].sort((a,b) => (b.amount || 0) - (a.amount || 0))).map((l, i) => (
                    <div key={i} className="group">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h5 className="text-sm font-black uppercase text-slate-200">{l.name ?? "Data Not Available"}</h5>
                             <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{l.category ?? "Data Not Available"}</p>
                          </div>
                          <span className="text-lg font-black text-white">{l.share ?? "N/A"}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className={`h-full bg-cyan-500 transition-all duration-1000 shadow-lg`} style={{ width: `${(l.share || 0)*3}%` }}></div>
                       </div>
                    </div>
                  ))}
                  {(!LENDERS || LENDERS.length === 0) && <p className="text-xs text-slate-500 uppercase font-black text-center py-10">No Lender Data Available</p>}
               </div>
            </div>
         </div>
         <div className="space-y-8">
            <div className="financial-card p-8 border-indigo-500/20 bg-indigo-500/5">
               <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Domestic vs External</h3>
               <div className="space-y-8">
                  <div className="space-y-2">
                     <div className="flex justify-between items-end"><span className="text-[9px] font-black text-slate-500 uppercase">Local Holders</span><span className="text-sm font-black text-indigo-400">55.7%</span></div>
                     <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: '55.7%' }}></div></div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between items-end"><span className="text-[9px] font-black text-slate-500 uppercase">Foreign Holders</span><span className="text-sm font-black text-cyan-400">44.3%</span></div>
                     <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-cyan-500" style={{ width: '44.3%' }}></div></div>
                  </div>
               </div>
            </div>
            <Explanation body="Most of Kenya's debt is owed to local banks, pension funds, and insurance companies inside the country." />
         </div>
      </div>
    </div>

    {/* Bills Due Soon */}
    <div className="border-t border-slate-900 pt-16">
       <SectionHeader q="BILLS DUE SOON" title="The National Debt Calendar" sub="High-priority payments that consume your tax money first." />
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { name: 'FXD1/2016 Bond', days: 12, amount: 85e9, risk: 'Critical', lender: 'Commercial Banks' },
            { name: 'Eurobond 2026', days: 34, amount: 15.5e9, risk: 'Mandatory', lender: 'Foreign Investors' },
            { name: 'IMF Tranche', days: 52, amount: 42e9, risk: 'Standard', lender: 'IMF' },
          ].map((b, i) => (
            <div key={i} className="financial-card p-6">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-red-500"><Clock size={20} /></div>
                  <span className="status-badge border-red-500/20 text-red-500 bg-red-500/5">{b.risk ?? "Unknown Risk"}</span>
               </div>
               <h5 className="text-sm font-black text-white uppercase mb-1">{b.name ?? "Data Not Available"}</h5>
               <p className="text-[10px] text-slate-500 uppercase font-bold mb-6">Lender: {b.lender ?? "Data Not Available"}</p>
               <p className="text-2xl font-black text-white mb-6">{formatKSh(b.amount)}</p>
               <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Due In</span>
                  <span className="text-sm font-black text-red-500">{b.days ?? "N/A"} Days</span>
               </div>
            </div>
          ))}
       </div>
    </div>

    {/* History */}
    <div className="border-t border-slate-900 pt-16">
       <SectionHeader q="KENYA THROUGH TIME" title="The Growth of Debt" sub="Tracking how national debt and tax collections have changed over two decades." />
       <div className="space-y-12 relative pb-20">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
          {(HISTORY_LOG ?? []).map((h, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
               <div className="flex-1 w-full">
                  <div className="financial-card p-10 group">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-5xl font-black text-white group-hover:text-cyan-500 transition-colors">{h.year ?? "N/A"}</span>
                        <DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} />
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-end"><span className="text-[10px] font-black text-slate-500 uppercase">Total Debt</span><span className="text-lg font-black text-white">{formatKSh(h.debt)}</span></div>
                        <div className="flex justify-between items-end"><span className="text-[10px] font-black text-slate-500 uppercase">Total Tax Revenue</span><span className="text-lg font-black text-cyan-500">{formatKSh(h.revenue)}</span></div>
                     </div>
                  </div>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-500 z-10 flex items-center justify-center text-xs font-black text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]">{i+1}</div>
               <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
          {(!HISTORY_LOG || HISTORY_LOG.length === 0) && <p className="text-xs text-slate-500 uppercase font-black text-center py-10">No Historical Data Available</p>}
       </div>
    </div>
  </div>
);
