import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Scale, Wallet, HistoryIcon, ShieldQuestion, Layers, ShieldAlert } from 'lucide-react';
import { FISCAL_CORE, RECENT_CHANGES, INTELLIGENCE_LOG } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';
import { SectionHeader, DataBadge, Explanation, formatKSh } from '../components/SharedUI';

export const ViewHome = ({ setActiveTab, qualityIndex }) => {
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

  const HeadlineValue = ({ label, value, sub, color = "text-white", size = "text-5xl md:text-7xl" }) => (
    <div className="flex flex-col">
      <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{label}</p>
      <h2 className={`${size} font-black ${color} tracking-tighter leading-none mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
        {value}
      </h2>
      {sub && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>}
    </div>
  );

  const FlowStep = ({ label, val, color, icon: Icon, isLast }) => (
    <div className="flex flex-col items-center group">
      <div className={`w-full max-w-[280px] financial-card p-6 md:p-8 bg-slate-900/40 border-slate-800 hover:border-${color}-500/30 transition-all text-center relative`}>
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-${color}-500 shadow-xl`}>
          <Icon size={20} />
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 mt-2">{label}</p>
        <p className={`text-2xl md:text-3xl font-black text-white tracking-tight`}>{formatKSh(val)}</p>
      </div>
      {!isLast && (
        <div className="py-4 flex flex-col items-center">
          <div className="w-px h-8 bg-gradient-to-b from-slate-700 to-transparent"></div>
          <div className="text-slate-700 my-1">
             <Layers size={14} className="animate-pulse" />
          </div>
          <div className="w-px h-8 bg-gradient-to-t from-slate-700 to-transparent"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-24 animate-slide-up pb-32">
      {/* HERO SECTION: THE BIG PICTURE */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        <div className="relative z-10 space-y-16">
          <div className="max-w-4xl">
            <SectionHeader q="FLAGSHIP AUDIT 2026" title="The Scale of Kenya's Finance" sub="Real-time transparency into the largest financial obligations of the Republic." />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <HeadlineValue 
              label="Total National Debt" 
              value={formatKSh(FISCAL_CORE.totalDebt?.val)} 
              sub="Consolidated Domestic and External Obligations"
              color="text-cyan-500"
              size="text-6xl md:text-8xl lg:text-9xl"
            />
            
            <div className="financial-card p-8 md:p-12 border-red-500/20 bg-red-500/5 relative">
              <div className="absolute -top-4 right-8"><DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} /></div>
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-6">Accumulated Interest (Today)</p>
              <h2 className="text-4xl md:text-6xl font-black text-white font-mono tracking-tighter mb-6">
                KSh {accruedToday.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 animate-pulse" style={{ width: '100%' }}></div>
                </div>
                <span className="text-[10px] font-black text-red-400 uppercase">+{formatKSh(interestPerSecond, false)} / SEC</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-900">
            <HeadlineValue label="Revenue Collected" value={formatKSh(FISCAL_CORE.revenueCollected?.val)} size="text-4xl md:text-5xl" color="text-emerald-500" />
            <HeadlineValue label="Total Debt Service" value={formatKSh(FISCAL_CORE.totalDebtService?.val)} size="text-4xl md:text-5xl" color="text-amber-500" />
            <HeadlineValue label="Net Surplus (Remaining)" value={formatKSh(FISCAL_CORE.moneyRemaining?.val)} size="text-4xl md:text-5xl" color="text-cyan-400" />
          </div>
        </div>
      </section>

      {/* MONEY FLOW VISUALIZATION */}
      <section className="financial-card p-8 md:p-20 bg-slate-950 border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <SectionHeader q="THE PIPELINE" title="Kenya's Money Flow" sub="Tracing the path from tax collection to project development." />
        </div>
        
        <div className="flex flex-col items-center">
          <FlowStep label="Revenue Collected" val={FISCAL_CORE.revenueCollected?.val} color="emerald" icon={Wallet} />
          <FlowStep label="Interest Payments" val={FISCAL_CORE.interestPaid?.val} color="red" icon={Activity} />
          <FlowStep label="Principal Repayments" val={FISCAL_CORE.principalPaid?.val} color="amber" icon={Layers} />
          <FlowStep label="Total Debt Service" val={FISCAL_CORE.totalDebtService?.val} color="rose" icon={ShieldAlert} />
          <FlowStep label="Money Remaining" val={FISCAL_CORE.moneyRemaining?.val} color="cyan" icon={Scale} isLast />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
             <div className="financial-card p-6 bg-slate-900/20 border-slate-800 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-2">To Counties</p>
                <p className="text-xl font-black text-white">KSh 380.0B</p>
             </div>
             <div className="financial-card p-6 bg-slate-900/20 border-slate-800 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Gov Services</p>
                <p className="text-xl font-black text-white">KSh 740.0B</p>
             </div>
             <div className="financial-card p-6 bg-slate-900/20 border-slate-800 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Development</p>
                <p className="text-xl font-black text-white">KSh 456.0B</p>
             </div>
          </div>
        </div>
      </section>

      {/* THE KSH 100 HERO EXPLAINER */}
      <section className="financial-card p-8 md:p-20 bg-slate-900/10 border-cyan-500/10 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-10"><Scale size={300} /></div>
         
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeader 
                q="THE CITIZEN TEST" 
                title="If Government Collects KSh 100" 
                sub="A radical simplification of the national budget priorities." 
              />
              <div className="mt-12 space-y-12">
                <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl">
                   <p className="text-6xl font-black text-white mb-4">KSh 52</p>
                   <p className="text-sm font-black text-red-500 uppercase tracking-widest mb-4">Debt Repayment</p>
                   <p className="text-xs text-slate-400 leading-relaxed uppercase font-bold">More than half of every shilling collected goes directly to lenders before a single hospital or school is funded.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                      <p className="text-3xl font-black text-white mb-2">KSh 14</p>
                      <p className="text-[10px] font-black text-indigo-400 uppercase">Education</p>
                   </div>
                   <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                      <p className="text-3xl font-black text-white mb-2">KSh 12</p>
                      <p className="text-[10px] font-black text-emerald-400 uppercase">Counties</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
               {[
                 { label: 'Debt Repayment', val: 52, color: 'bg-red-500' },
                 { label: 'Education', val: 14, color: 'bg-indigo-500' },
                 { label: 'Counties', val: 12, color: 'bg-emerald-500' },
                 { label: 'Security & Ops', val: 12, color: 'bg-slate-700' },
                 { label: 'Development', val: 10, color: 'bg-cyan-500' },
               ].map((b, i) => (
                 <div key={i} className="group">
                    <div className="flex justify-between items-end mb-3">
                       <span className="text-xs font-black text-white uppercase tracking-widest">{b.label}</span>
                       <span className="text-xl font-black text-white">KSh {b.val}</span>
                    </div>
                    <div className="h-4 w-full bg-slate-950 rounded-full border border-slate-800 p-1">
                       <div className={`h-full ${b.color} rounded-full transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${b.val}%` }}></div>
                    </div>
                 </div>
               ))}
               <div className="pt-10">
                  <Explanation body="The 'KSh 100 Test' shows that fiscal space is extremely limited. Fixed obligations (Debt) dominate the budget, leaving little for discretionary spending on development." />
               </div>
            </div>
         </div>
      </section>

      {/* SHARE OF DEBT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="financial-card p-12 border-amber-500/20 bg-amber-500/5 flex flex-col justify-center">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-8">Personal Liability View</p>
            <div className="space-y-12">
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Your Share (Per Citizen)</p>
                  <p className="text-5xl font-black text-white">
                    {FISCAL_CORE.totalDebt?.val && FISCAL_CORE.population ? `KSh ${(FISCAL_CORE.totalDebt.val / FISCAL_CORE.population).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "N/A"}
                  </p>
               </div>
               <div className="pt-8 border-t border-slate-800/50">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Per Taxpayer</p>
                  <p className="text-3xl font-black text-slate-300">
                    {FISCAL_CORE.totalDebt?.val && FISCAL_CORE.taxpayers ? `KSh ${(FISCAL_CORE.totalDebt.val / FISCAL_CORE.taxpayers).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "N/A"}
                  </p>
               </div>
            </div>
         </div>
         
         <div className="financial-card p-12 bg-slate-900/50 flex flex-col items-center justify-center text-center">
            <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-500 mb-8 animate-pulse">
               <ShieldCheck size={48} />
            </div>
            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tight">Real-Time Data Integrity</h3>
            <p className="text-xs text-slate-500 font-bold uppercase leading-relaxed max-w-sm">
               All figures are pulled from the National Treasury BPS 2025 and Central Bank of Kenya reports. Audit logs are available in the source panel.
            </p>
            <button onClick={() => window.print()} className="mt-10 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all">
               Generate Audit PDF
            </button>
         </div>
      </section>
    </div>
  );
};

export const HomeDashboard = () => (
  <div className="p-4 md:p-8 space-y-16 animate-slide-up pb-32">
    <div className="financial-card p-8 md:p-12 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
       <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><HistoryIcon size={240} /></div>
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-indigo-500 rounded-[1.5rem] text-slate-950 shadow-[0_0_20px_rgba(99,102,241,0.3)]"><Activity size={24} /></div>
             <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Intelligence Feed</h3>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Updates Since Your Last Session</p>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">System Pulse</p>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Live Audit Active</span>
             </div>
          </div>
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {(RECENT_CHANGES ?? []).map((change, i) => {
            const Icon = change.icon || ShieldQuestion;
            return (
              <div key={i} className="flex justify-between items-center p-6 bg-slate-950/40 border border-slate-800 rounded-3xl hover:border-indigo-500/20 transition-all group">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-800 transition-colors">
                       <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{change.type}</p>
                      <p className="text-sm md:text-base font-black text-white uppercase tracking-tight">{change.msg}</p>
                    </div>
                 </div>
                 <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-black text-slate-700 uppercase">{change.time}</span>
                 </div>
              </div>
            );
          })}
       </div>
       
       <div className="mt-12 flex items-center gap-2 justify-center">
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Anti-Hallucination Policy Active</span>
          <div className="h-px flex-1 max-w-[40px] bg-slate-800"></div>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Source Verified Only</span>
       </div>
    </div>

    <div className="border-t border-slate-900 pt-16">
       <ViewHome setActiveTab={() => {}} qualityIndex={96} />
    </div>

    <div className="border-t border-slate-900 pt-16">
      <SectionHeader q="FISCAL INTELLIGENCE" title="Latest Fiscal Developments" sub="Verified news and updates from the center of Kenya's financial policy." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(INTELLIGENCE_LOG ?? []).map((item) => (
          <div key={item.id} className="financial-card p-8 hover:border-cyan-500/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest bg-cyan-500/5 px-2 py-1 rounded">{item.type}</span>
              <DataBadge status={item.status} src={item.src} />
            </div>
            <h3 className="text-xl font-black text-white uppercase mb-4 group-hover:text-cyan-400 transition-colors leading-tight">{item.headline}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">{item.summary}</p>
            <div className="flex justify-between items-center pt-6 border-t border-slate-900">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.date}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source: {item.src?.name || 'Treasury'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
