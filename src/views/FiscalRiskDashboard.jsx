import { SectionHeader, DataBadge, Explanation } from '../components/SharedUI';
import { RISK_INDICATORS, RISK_METHODOLOGY } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';

export const FiscalRiskDashboard = () => {
  const getRiskColor = (risk) => {
    if (risk === 'High') return 'text-red-500';
    if (risk === 'Moderate') return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="p-4 md:p-8 space-y-12 animate-slide-up pb-32">
      <SectionHeader q="STRESS TEST" title="Kenya Fiscal Risk Monitor" sub="Advanced analysis of debt sustainability and liquidity pressure." />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="financial-card p-12 flex flex-col items-center justify-center text-center bg-red-500/5 border-red-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4"><DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} /></div>
          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-8">Overall Risk Assessment</p>
          <div className="w-48 h-48 rounded-full border-[12px] border-slate-900 flex items-center justify-center relative">
             <div className="absolute inset-0 border-[12px] border-red-500 border-t-transparent border-r-transparent -rotate-45 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.2)]"></div>
             <span className="text-3xl font-black text-white uppercase tracking-tighter">Elevated</span>
          </div>
          <p className="mt-10 text-[11px] text-slate-400 uppercase font-bold leading-relaxed max-w-sm">
            Fiscal pressure is high due to debt service consuming 52.5% of revenue. Liquidity remains tight while refinancing risk is currently mitigated by concessional support.
          </p>
        </div>

        <div className="space-y-6">
           {(RISK_INDICATORS ?? []).map((ind, i) => (
             <div key={i} className="financial-card p-6 bg-slate-900/30 border-slate-800">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h5 className="text-sm font-black text-white uppercase">{ind.label ?? "Metric Unavailable"}</h5>
                   <p className={`text-[10px] font-black uppercase mt-1 ${getRiskColor(ind.risk)}`}>{ind.risk ?? "Unknown"} Risk</p>
                 </div>
                 <div className="text-right">
                   <p className="text-2xl font-black text-white">{ind.val ?? 0}{ind.unit ?? ""}</p>
                   <p className="text-[9px] text-slate-500 uppercase font-black">Threshold: {ind.limit ?? 0}{ind.unit ?? ""}</p>
                 </div>
               </div>
               <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mb-4 p-0.5">
                  <div className={`h-full ${ind.risk === 'High' ? 'bg-red-500' : 'bg-amber-500'} transition-all duration-1000 rounded-full`} style={{ width: `${Math.min(((ind.val || 0)/(ind.limit || 1))*50, 100)}%` }}></div>
               </div>
               <p className="text-[10px] text-slate-500 leading-relaxed italic">"{ind.desc ?? "Methodology pending official publication."}"</p>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 financial-card p-10 border-indigo-500/10">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-10">Likelihood of Debt Distress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { label: 'Refinancing Risk', val: 'Moderate', desc: 'Ability to roll over maturing Eurobonds & T-Bills.' },
               { label: 'Liquidity Risk', val: 'Elevated', desc: 'Sovereign cash flow versus immediate obligations.' },
               { label: 'External Vulnerability', val: 'High', desc: 'Exposure to exchange rate shocks (USD/KSh).' },
               { label: 'Fiscal Sustainability', val: 'Moderate', desc: 'Long-term path of primary balance & interest.' },
             ].map((r, i) => (
               <div key={i} className="flex gap-6 items-start">
                  <div className={`w-2 h-2 mt-2 rounded-full ${r.val === 'High' || r.val === 'Elevated' ? 'bg-amber-500' : 'bg-emerald-500'} shadow-[0_0_10px_rgba(245,158,11,0.3)]`}></div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">{r.label}</p>
                    <p className={`text-xl font-black mb-2 ${r.val === 'High' || r.val === 'Elevated' ? 'text-amber-500' : 'text-emerald-500'}`}>{r.val}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed">{r.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
        
        <div className="financial-card p-8 bg-slate-900/10 border-slate-800">
           <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6">Methodology</h3>
           <div className="space-y-6">
              {(RISK_METHODOLOGY ?? []).map((m, i) => (
                <div key={i} className="space-y-1">
                   <p className="text-[10px] font-black text-white uppercase">{m.indicator}</p>
                   <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-tighter">
                      <span>Source: {m.source}</span>
                      <span className="text-cyan-500">{m.weight} Weight</span>
                   </div>
                   <p className="text-[9px] text-slate-400 italic">Limit: {m.threshold}</p>
                </div>
              ))}
           </div>
           <div className="mt-8 pt-6 border-t border-slate-900">
              <p className="text-[8px] text-slate-600 font-black uppercase leading-relaxed">
                 Indicators tracked in accordance with IMF Debt Sustainability Framework (DSF). Zero predicted default data detected.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
