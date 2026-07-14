import { useState } from 'react';
import { 
  Wallet, ShieldAlert, TrendingUp, CheckCircle2, 
  Activity, ArrowUpRight, PieChart, Layers, Landmark
} from 'lucide-react';
import { SectionHeader, DataBadge, formatKSh } from '../components/SharedUI';
import { BUDGET_2026_2027, REVENUE_INTELLIGENCE, FISCAL_CORE } from '../data/mockData';
import { STATUS, SOURCES } from '../constants';

export const BudgetDashboard = () => {
  const [activeTab, setActiveTab] = useState('budget'); // 'budget' | 'revenue' | 'allocations'
  const budget = BUDGET_2026_2027;
  const intel = REVENUE_INTELLIGENCE;
  const core = FISCAL_CORE;
  const collectionRatio = ((intel.collectedYTD / intel.totalTargetFY26) * 100).toFixed(1);

  return (
    <div className="p-4 md:p-8 space-y-16 animate-slide-up pb-32">
      {/* ── HEADER & NAVIGATION ── */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase rounded-full tracking-widest">
                Enacted Fiscal Framework
              </span>
              <span className="text-xs text-slate-400 font-mono">FY 2026 / 2027</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              2026/27 Budget & Revenue Intelligence
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed mt-2 font-medium">
              Verified national budget architecture tracking total government expenditure (KSh 4.18T), KRA revenue targets (KSh 3.45T), debt service constraints, and sectoral appropriations across all 47 counties.
            </p>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'budget', label: 'FY26/27 Budget Architecture', icon: Landmark },
              { id: 'revenue', label: 'KRA Revenue & Tax Heads', icon: TrendingUp },
              { id: 'allocations', label: 'Sectoral Appropriations', icon: PieChart },
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TAB 1: FY 2026/2027 BUDGET ARCHITECTURE ── */}
      {activeTab === 'budget' && (
        <div className="space-y-12 animate-fade-in">
          {/* TOP CORE BUDGET PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="financial-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900 space-y-4">
              <div className="flex justify-between items-start">
                <span className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400"><Wallet size={20} /></span>
                <DataBadge status={STATUS.VERIFIED} src={SOURCES.TREASURY} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Budgeted Expenditure</span>
                <h3 className="text-3xl font-black text-white font-mono mt-1">{formatKSh(budget.totalExpenditure)}</h3>
                <span className="text-xs font-bold text-emerald-400 block mt-1">FY 2026/2027 Appropriations Act</span>
              </div>
            </div>

            <div className="financial-card p-6 md:p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-slate-900 space-y-4">
              <div className="flex justify-between items-start">
                <span className="p-2.5 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400"><TrendingUp size={20} /></span>
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase rounded border border-cyan-500/30">Target</span>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Revenue Target</span>
                <h3 className="text-3xl font-black text-cyan-400 font-mono mt-1">{formatKSh(budget.totalRevenue)}</h3>
                <span className="text-xs font-bold text-slate-400 block mt-1">Ordinary KSh 3.32T + AIA KSh 130B</span>
              </div>
            </div>

            <div className="financial-card p-6 md:p-8 border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900 space-y-4">
              <div className="flex justify-between items-start">
                <span className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400"><Layers size={20} /></span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase rounded border border-amber-500/30">Deficit</span>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Fiscal Deficit Gap</span>
                <h3 className="text-3xl font-black text-amber-400 font-mono mt-1">{formatKSh(budget.fiscalDeficit)}</h3>
                <span className="text-xs font-bold text-slate-400 block mt-1">{budget.deficitGdpPct}% of GDP (Narrowing Target)</span>
              </div>
            </div>

            <div className="financial-card p-6 md:p-8 border-red-500/30 bg-gradient-to-br from-red-500/10 to-slate-900 space-y-4">
              <div className="flex justify-between items-start">
                <span className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400"><ShieldAlert size={20} /></span>
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-black uppercase rounded border border-red-500/30">First Charge</span>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Consolidated Fund Services</span>
                <h3 className="text-3xl font-black text-red-400 font-mono mt-1">{formatKSh(budget.consolidatedFundServices)}</h3>
                <span className="text-xs font-bold text-slate-400 block mt-1">Includes KSh 1.785T Debt Service</span>
              </div>
            </div>
          </div>

          {/* DEBT vs REVENUE AUDIT BLOCK */}
          <div className="financial-card p-8 md:p-12 space-y-8 bg-slate-900/40 border-slate-800">
            <SectionHeader q="EXPENDITURE DISTRIBUTION" title="Where Every Shilling Goes (Budget Audit)" sub="Verification of statutory commitments across debt redemption, national ministries, and 47 devolved counties." />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="space-y-6 lg:col-span-2">
                {[
                  { label: 'Consolidated Fund Services (Debt Redemption & Pensions)', amount: budget.consolidatedFundServices, share: 44.0, color: 'bg-red-500 text-red-400' },
                  { label: 'National Government Executive Ministries', amount: budget.nationalExecutive, share: 42.1, color: 'bg-cyan-500 text-cyan-400' },
                  { label: 'De-voted Counties Equitable Share Allocation', amount: budget.countyEquitableShare, share: 9.6, color: 'bg-emerald-500 text-emerald-400' },
                  { label: 'Parliament, Judiciary & Independent Commissions', amount: budget.parliamentAndJudiciary, share: 4.3, color: 'bg-purple-500 text-purple-400' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white uppercase">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${item.color.split(' ')[1]} bg-slate-900 border border-slate-800`}>{item.share}% Share</span>
                        <span className="text-base font-black text-white font-mono">{formatKSh(item.amount)}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color.split(' ')[0]} transition-all duration-1000`} style={{ width: `${item.share * 2.2}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-8 bg-slate-950 rounded-3xl border border-slate-800 space-y-6">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} /> Budget Realities Summary
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  "{budget.summary}"
                </p>
                <div className="pt-4 border-t border-slate-900 space-y-3 font-mono text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Total Public Debt Stock:</span><span className="text-white font-bold">KSh 13.12 Trillion</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Maturing Debt Within 12 Mo:</span><span className="text-red-400 font-bold">KSh 1.785 Trillion</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Annual Interest Amortization:</span><span className="text-amber-400 font-bold">KSh 1.124 Trillion</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: KRA REVENUE & TAX HEADS ── */}
      {activeTab === 'revenue' && (
        <div className="space-y-12 animate-fade-in">
          <SectionHeader q="REVENUE CENTER & KRA TRACKING" title="National Revenue Intelligence" sub="Real-time monitoring of tax collections, e-TIMS enforcement, and debt service pressure." />

          {/* HERO STATS BAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="financial-card p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-slate-900 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-400"><TrendingUp size={24} /></div>
                <DataBadge status={STATUS.VERIFIED} src={SOURCES.KRA} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">FY2026/27 Revenue Target</p>
              <h3 className="text-4xl md:text-5xl font-black text-white font-mono mb-4">{formatKSh(intel.totalTargetFY26)}</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ArrowUpRight size={16} /> +11.4% YoY Growth Pace
              </div>
            </div>

            <div className="financial-card p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-slate-900">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl text-cyan-400"><Wallet size={24} /></div>
                <span className="status-badge border-cyan-500/30 text-cyan-400 bg-cyan-500/10">{collectionRatio}% Collected</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Collected YTD (As of Q3 2026)</p>
              <h3 className="text-4xl md:text-5xl font-black text-cyan-400 font-mono mb-4">{formatKSh(intel.collectedYTD)}</h3>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-cyan-400 h-full rounded-full transition-all duration-1000" style={{ width: `${collectionRatio}%` }}></div>
              </div>
            </div>

            <div className="financial-card p-8 border-red-500/30 bg-gradient-to-br from-red-500/10 to-slate-900">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-400"><ShieldAlert size={24} /></div>
                <span className="status-badge border-red-500/30 text-red-400 bg-red-500/10">High Pressure</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Debt Service Obligation</p>
              <h3 className="text-4xl md:text-5xl font-black text-red-400 font-mono mb-4">{formatKSh(core.totalDebtService?.val)}</h3>
              <p className="text-xs font-bold text-slate-400">
                Consumes <span className="text-red-400 font-black">53.8%</span> of all tax revenue collected.
              </p>
            </div>
          </div>

          {/* TAX HEADS BREAKDOWN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 financial-card p-8 md:p-10 space-y-8">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-6">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Where Tax Revenue Comes From</h3>
                  <p className="text-xs text-slate-500 mt-1">Breakdown across primary KRA collection streams</p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">Official KRA Data</span>
              </div>

              <div className="space-y-6">
                {(intel.taxHeads ?? []).map((t, i) => (
                  <div key={i} className="group p-4 bg-slate-950/60 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition-all">
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${t.color}`}></span>
                        <span className="text-sm font-bold text-white uppercase tracking-tight">{t.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">{t.status}</span>
                        <span className="text-base font-black text-white font-mono">{formatKSh(t.amount)} <span className="text-xs text-slate-500">({t.share}%)</span></span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${t.color} transition-all duration-1000`} style={{ width: `${t.share * 2.5}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="financial-card p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-slate-900 space-y-6">
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={16} /> e-TIMS & Compliance Surge
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  The mandatory deployment of the Electronic Tax Invoice Management System (e-TIMS) has added over 350,000 businesses to the real-time tax verification grid, significantly reducing VAT under-reporting.
                </p>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Taxpayers Registered:</span><span className="text-white font-mono">7.6M Citizens</span></div>
                  <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Active e-TIMS Merchants:</span><span className="text-indigo-400 font-mono">380,000+</span></div>
                </div>
              </div>

              <div className="financial-card p-8 space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Key Revenue Insights</h4>
                <div className="space-y-4">
                  {(intel.insights ?? []).map((ins, i) => (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
                      <h5 className="text-[11px] font-bold text-emerald-400 uppercase mb-1">{ins.title}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{ins.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: SECTORAL APPROPRIATIONS & MAJOR PROGRAMS ── */}
      {activeTab === 'allocations' && (
        <div className="space-y-10 animate-fade-in">
          <SectionHeader q="NATIONAL DEVELOPMENT & SERVICES" title="Sectoral Appropriations" sub="Detailed allocations across high-impact ministries and statutory programs under the FY 2026/2027 Budget." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {budget.keyAllocations.map((sec, idx) => (
              <div key={idx} className="financial-card p-8 flex flex-col justify-between space-y-6 group hover:border-emerald-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-cyan-400 rounded-lg text-xs font-mono font-black">
                      {sec.share}% of Total Budget
                    </span>
                    <span className="text-xl md:text-2xl font-black text-white font-mono">{formatKSh(sec.amount)}</span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
                    {sec.sector}
                  </h3>

                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" style={{ width: `${sec.share * 2.2}%` }}></div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium pt-2">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                  <span>Enacted Appropriations Bill</span>
                  <span className="text-emerald-400">Verified Official</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const RevenueDashboard = () => <BudgetDashboard />;
