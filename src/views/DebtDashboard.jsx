import { Clock, TrendingUp } from 'lucide-react';
import { SectionHeader, DataBadge, Explanation, formatKSh } from '../components/SharedUI';
import { LENDERS, HISTORY_LOG, FISCAL_CORE } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';

export const DebtDashboard = () => (
  <div className="p-4 md:p-8 space-y-16 animate-slide-up pb-32">
    {/* Creditor Network */}
    <div>
      <SectionHeader q="WHO OWNS KENYA'S DEBT?" title="The Creditor Network" sub="A granular audit of exactly who holds Kenya's KSh 13.12 Trillion public debt stock." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="financial-card p-8 md:p-10 shadow-xl">
               <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-5">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Creditor Distribution & Holding Shares</h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">Total Stock: {formatKSh(FISCAL_CORE.totalDebt?.val)}</span>
               </div>
               <div className="space-y-8">
                  {([...(LENDERS ?? [])].sort((a,b) => (b.amount || 0) - (a.amount || 0))).map((l, i) => (
                    <div key={i} className="group p-4 bg-slate-950/60 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-all">
                       <div className="flex justify-between items-start mb-3">
                          <div>
                             <div className="flex items-center gap-2.5">
                                <h5 className="text-sm md:text-base font-black uppercase text-white tracking-tight">{l.name ?? "Data Not Available"}</h5>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${l.category === 'Domestic' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-cyan-500/20 text-cyan-300'}`}>{l.category}</span>
                             </div>
                             <p className="text-xs text-slate-400 mt-1">{l.note || "Official creditor registry entry."}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                             <span className="text-lg md:text-xl font-black text-white font-mono block">{l.share ?? "N/A"}%</span>
                             <span className="text-xs font-bold text-slate-400 font-mono block">{formatKSh(l.amount)}</span>
                          </div>
                       </div>
                       <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className={`h-full ${l.category === 'Domestic' ? 'bg-indigo-500' : 'bg-cyan-400'} transition-all duration-1000 shadow-lg`} style={{ width: `${(l.share || 0)*4.5}%` }}></div>
                       </div>
                    </div>
                  ))}
                  {(!LENDERS || LENDERS.length === 0) && <p className="text-xs text-slate-500 uppercase font-black text-center py-10">No Lender Data Available</p>}
               </div>
            </div>
         </div>
         <div className="space-y-8">
            <div className="financial-card p-8 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-slate-900 shadow-xl">
               <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp size={16} className="text-indigo-400" /> Domestic vs External Debt Split
               </h3>
               <div className="space-y-6">
                  <div className="space-y-2 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                     <div className="flex justify-between items-end"><span className="text-xs font-black text-slate-400 uppercase">Local Holders (KSh 7.28T)</span><span className="text-base font-black text-indigo-400 font-mono">55.5%</span></div>
                     <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: '55.5%' }}></div></div>
                     <p className="text-[10px] text-slate-400 pt-1">Commercial banks, pension funds, SACCOs, and insurance.</p>
                  </div>
                  <div className="space-y-2 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                     <div className="flex justify-between items-end"><span className="text-xs font-black text-slate-400 uppercase">Foreign Holders (KSh 5.84T)</span><span className="text-base font-black text-cyan-400 font-mono">44.5%</span></div>
                     <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{ width: '44.5%' }}></div></div>
                     <p className="text-[10px] text-slate-400 pt-1">World Bank IDA, Eurobonds, China Exim, and IMF.</p>
                  </div>
               </div>
            </div>
            <Explanation body="Most of Kenya's debt (55.5%) is now owed to local commercial banks and pension funds inside the country. While this reduces vulnerability to USD/KSh exchange rate swings, high domestic borrowing increases interest rates for private sector borrowers." />
         </div>
      </div>
    </div>

    {/* Bills Due Soon */}
    <div className="border-t border-slate-900 pt-16">
       <SectionHeader q="BILLS & MATURITIES DUE SOON" title="The National Debt Redemption Calendar" sub="High-priority maturities and syndicated bond obligations consuming tax collections first." />
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { name: 'Eurobond 2026 ($1.0 Billion Maturity)', days: 34, amount: 130e9, risk: 'Critical', lender: 'International Bondholders', note: 'Supported by World Bank DPO & domestic rollover.' },
            { name: 'FXD1/2016 Benchmark Bond Redemption', days: 12, amount: 88.5e9, risk: 'Mandatory', lender: 'Local Commercial Banks', note: 'Treasury conducting conversion switch auction.' },
            { name: 'IMF EFF/ECF Principal & Interest Tranche', days: 48, amount: 45.2e9, risk: 'Standard', lender: 'International Monetary Fund', note: 'Scheduled multilateral service obligation.' },
          ].map((b, i) => (
            <div key={i} className="financial-card p-6 md:p-8 flex flex-col justify-between shadow-lg hover:border-red-500/30 transition-all">
               <div>
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-red-400"><Clock size={20} /></div>
                    <span className="status-badge border-red-500/30 text-red-400 bg-red-500/10 font-bold">{b.risk} Priority</span>
                 </div>
                 <h5 className="text-base font-black text-white uppercase mb-2">{b.name}</h5>
                 <p className="text-xs text-slate-400 font-medium mb-6">{b.note}</p>
               </div>
               <div>
                 <div className="flex justify-between items-end mb-4 border-t border-slate-800/80 pt-4">
                    <span className="text-xs font-bold text-slate-500 uppercase">Creditor</span>
                    <span className="text-xs font-bold text-slate-300">{b.lender}</span>
                 </div>
                 <p className="text-3xl font-black text-white font-mono mb-6">{formatKSh(b.amount)}</p>
                 <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due In</span>
                    <span className="text-sm font-black text-red-400 font-mono">{b.days} Days</span>
                 </div>
               </div>
            </div>
          ))}
       </div>
    </div>

    {/* History */}
    <div className="border-t border-slate-900 pt-16">
       <SectionHeader q="KENYA THROUGH TWO DECADES" title="The Trajectory of Public Debt" sub="Tracking how national debt and tax revenue have evolved from 2005 through 2026." />
       <div className="space-y-12 relative pb-20">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
          {(HISTORY_LOG ?? []).map((h, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
               <div className="flex-1 w-full">
                  <div className="financial-card p-8 md:p-10 group hover:border-cyan-500/40 transition-all shadow-xl">
                     <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                        <span className="text-4xl md:text-5xl font-black text-white group-hover:text-cyan-400 transition-colors font-mono">{h.year}</span>
                        <DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} />
                     </div>
                     <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                        {h.note || "National statistical snapshot."}
                     </p>
                     <div className="space-y-4">
                        <div className="flex justify-between items-end"><span className="text-xs font-black text-slate-400 uppercase">Total Debt Stock</span><span className="text-xl font-black text-white font-mono">{formatKSh(h.debt)}</span></div>
                        <div className="flex justify-between items-end"><span className="text-xs font-black text-slate-400 uppercase">Total Tax Revenue</span><span className="text-xl font-black text-cyan-400 font-mono">{formatKSh(h.revenue)}</span></div>
                     </div>
                  </div>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 z-10 flex items-center justify-center text-xs font-black text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0">{i+1}</div>
               <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
          {(!HISTORY_LOG || HISTORY_LOG.length === 0) && <p className="text-xs text-slate-500 uppercase font-black text-center py-10">No Historical Data Available</p>}
       </div>
    </div>
  </div>
);
