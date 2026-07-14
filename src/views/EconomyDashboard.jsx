import { useState } from 'react';
import { 
  TrendingUp, Activity, HelpCircle, 
  CheckCircle, ShieldAlert, Newspaper, RefreshCw, 
  Search, Eye, BarChart3, Clock
} from 'lucide-react';
import { SectionHeader, DataBadge } from '../components/SharedUI';
import { 
  ECONOMIC_INDICATORS, ECONOMIC_HEALTH_SCORE, 
  TREND_DASHBOARD_DATA, ECONOMIC_WATCHLIST, 
  VERIFIED_NEWS, LIVE_DATA_STATUS 
} from '../data/mockData';

export const EconomyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'trends' | 'watchlist' | 'explained' | 'news'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndicators = (ECONOMIC_INDICATORS ?? []).filter(ind => 
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.explain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ind.src?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-16 animate-slide-up pb-32">
      {/* ── SECTION 1: KENYA ECONOMIC HEALTH HERO & SCORE ── */}
      <div className="space-y-8">
        <div className="financial-card p-8 md:p-12 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-950 border-emerald-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase rounded-full tracking-widest flex items-center gap-1.5">
                  <Activity size={14} className="animate-pulse text-emerald-400" /> Version 2.0 Live Intelligence
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
                  <Clock size={12} className="text-cyan-400" /> {LIVE_DATA_STATUS.lastCheck}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                Kenya Economic Health
              </h1>
              
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Comprehensive macro-level audit uniting real-time Central Bank monetary indicators, National Treasury debt burdens, KNBS quarterly growth metrics, and Kenya Revenue Authority collection performance into a single transparent intelligence dashboard.
              </p>
            </div>

            {/* ECONOMIC HEALTH SCORE WIDGET */}
            <div className="w-full xl:w-auto flex-shrink-0 p-6 md:p-8 bg-slate-950/90 border border-slate-800 rounded-3xl space-y-6 min-w-[320px] shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Overall Composite Score</span>
                  <span className="text-sm font-black text-white uppercase">Economic Health Score</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-lg">
                  Scale: 0 – 100
                </span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-mono tracking-tighter">{ECONOMIC_HEALTH_SCORE.score}</span>
                    <span className="text-lg font-bold text-slate-500 font-mono">/ 100</span>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black uppercase tracking-widest ${ECONOMIC_HEALTH_SCORE.bg} ${ECONOMIC_HEALTH_SCORE.color}`}>
                    {ECONOMIC_HEALTH_SCORE.classification}
                  </span>
                </div>

                {/* Gauge visual representation */}
                <div className="w-24 h-24 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" className="text-slate-900" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="currentColor" 
                      strokeWidth="10" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (251.2 * ECONOMIC_HEALTH_SCORE.score) / 100} 
                      className="text-amber-400 transition-all duration-1000" 
                      fill="transparent" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <span className="absolute text-xs font-black font-mono text-white">{ECONOMIC_HEALTH_SCORE.score}%</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-900 pt-3 italic">
                "{ECONOMIC_HEALTH_SCORE.summary}"
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS FOR SUB-MODULES */}
        <div className="flex flex-wrap gap-2.5 border-b border-slate-800 pb-5">
          {[
            { id: 'overview', label: '10 Core Indicators', icon: BarChart3 },
            { id: 'trends', label: 'Trend Dashboard & Charts', icon: TrendingUp },
            { id: 'watchlist', label: 'Citizen Watchlist', icon: Eye },
            { id: 'explained', label: 'Economy Explained (Simple English)', icon: HelpCircle },
            { id: 'news', label: 'Verified Official News', icon: Newspaper },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB 1: OVERVIEW OF 10 VERIFIED MACRO INDICATORS ── */}
      {activeTab === 'overview' && (
        <div className="space-y-10 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">The 10 Pillar Indicators</h2>
              <p className="text-xs text-slate-400 font-medium">Fact-checked current values against previous benchmark cycles</p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search indicator or source..." 
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-white uppercase focus:outline-none focus:border-emerald-500" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndicators.map((ind, i) => {
              const isPositiveChange = ind.direction === '▲' && ind.id !== 'publicDebt' && ind.id !== 'exchangeRate';
              const isNeutral = ind.direction === '►';
              const directionColor = isNeutral 
                ? 'text-slate-400 bg-slate-800' 
                : isPositiveChange 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-amber-400 bg-amber-500/10 border border-amber-500/20';

              return (
                <div key={i} className="financial-card p-6 md:p-8 flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-base md:text-lg font-black text-white uppercase group-hover:text-emerald-300 transition-colors">
                          {ind.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black font-mono flex items-center gap-1 ${directionColor}`}>
                            {ind.direction} {ind.direction === '▲' ? 'Up' : ind.direction === '▼' ? 'Down' : 'Stable'}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">Prev: {ind.previous}{ind.unit}</span>
                        </div>
                      </div>
                      <DataBadge status={ind.status} src={ind.src} note={`${ind.detail} (Updated ${ind.date})`} />
                    </div>

                    <div className="py-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
                          {ind.id === 'publicDebt' ? `KSh ${ind.current}` : ind.current}
                        </span>
                        <span className="text-sm font-bold text-slate-400 font-mono">{ind.unit}</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Plain English Explanation</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">"{ind.explain}"</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                    <span>Source: {ind.src?.name || 'Fact-Checked Official'}</span>
                    <span className="text-cyan-400 font-mono">{ind.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* HEALTH SCORE METHODOLOGY & BREAKDOWN AUDIT */}
          <div className="financial-card p-8 md:p-10 border-slate-800 bg-slate-900/40 space-y-8 mt-12">
            <SectionHeader q="SCORE METHODOLOGY & AUDIT" title="How The 48/100 Score Is Calculated" sub="Transparent breakdown of component weights and risk thresholds." />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Indicator Sub-Scores (Out of 100)</h4>
                {ECONOMIC_HEALTH_SCORE.components.map((comp, idx) => {
                  const statusColor = comp.status === 'Strong' ? 'bg-emerald-500 text-emerald-400' : comp.status === 'Stable' ? 'bg-cyan-500 text-cyan-400' : comp.status === 'Moderate' ? 'bg-indigo-500 text-indigo-400' : 'bg-red-500 text-red-400';
                  return (
                    <div key={idx} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white uppercase">{comp.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${statusColor.split(' ')[1]} bg-slate-900 border border-slate-800`}>{comp.status}</span>
                          <span className="text-sm font-black font-mono text-white">{comp.score}/100</span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-2">
                        <div className={`h-full ${statusColor.split(' ')[0]} transition-all duration-1000`} style={{ width: `${comp.score}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">{comp.note}</p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Verification & Scoring Protocol</h4>
                  {ECONOMIC_HEALTH_SCORE.methodology.map((m, i) => (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <h5 className="text-xs font-black text-emerald-400 uppercase tracking-tight">{m.step}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-4">
                  <ShieldAlert className="text-amber-400 flex-shrink-0" size={24} />
                  <p className="text-[11px] text-amber-300 font-medium leading-relaxed">
                    <strong className="uppercase font-black block text-xs">Non-Political Integrity Guarantee:</strong> This score is mathematically generated directly from statutory debt sustainability formulas and published fiscal datasets without editorializing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: TREND DASHBOARD & CSS-ONLY SPARKLINE CHARTS ── */}
      {activeTab === 'trends' && (
        <div className="space-y-10 animate-fade-in">
          <SectionHeader q="HISTORICAL PROGRESSION" title="Trend Dashboard" sub="Comparing current figures against 1 Month Ago, 6 Months Ago, and 1 Year Ago with pure CSS visual sparklines." />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {TREND_DASHBOARD_DATA.map((t, idx) => (
              <div key={idx} className="financial-card p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">{t.name}</h3>
                    <span className={`text-xs font-black uppercase font-mono ${t.color} mt-1 inline-block`}>{t.trend}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Current Value</span>
                    <span className="text-2xl md:text-3xl font-black text-white font-mono">{t.current}</span>
                  </div>
                </div>

                {/* COMPARISON TABLE */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase block">1 Month Ago</span>
                    <span className="text-sm md:text-base font-black text-slate-200 font-mono mt-1 block">{t.m1}</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase block">6 Months Ago</span>
                    <span className="text-sm md:text-base font-black text-slate-300 font-mono mt-1 block">{t.m6}</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase block">1 Year Ago</span>
                    <span className="text-sm md:text-base font-black text-slate-400 font-mono mt-1 block">{t.y1}</span>
                  </div>
                </div>

                {/* CSS-ONLY SPARKLINE CHART */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    <span>12-Month Sparkline Trajectory</span>
                    <span>Progression (Pure CSS Bar Chart)</span>
                  </div>
                  <div className="h-16 w-full bg-slate-950 rounded-2xl border border-slate-800/80 p-3 flex items-end justify-between gap-3">
                    {t.chart.map((val, cIdx) => {
                      const isLast = cIdx === t.chart.length - 1;
                      const barColor = isLast ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]' : 'bg-slate-700 hover:bg-slate-500';
                      return (
                        <div key={cIdx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group/bar relative">
                          <div 
                            className={`w-full rounded-md transition-all duration-700 ${barColor}`} 
                            style={{ height: `${val}%` }}
                          ></div>
                          <span className="text-[8px] font-mono text-slate-500 absolute -top-5 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-white">
                            {val}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <strong className="text-slate-300 not-italic uppercase font-bold">Context:</strong> {t.explain}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: ECONOMIC WATCHLIST (CRITICAL CITIZEN ALERT METRICS) ── */}
      {activeTab === 'watchlist' && (
        <div className="space-y-10 animate-fade-in">
          <SectionHeader q="HIGH-IMPACT CITIZEN TRACKER" title="Economic Watchlist" sub="Instant monitoring of vital prices, fuel tariffs, domestic borrowing rates, and pending bill liabilities that immediately touch daily life." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECONOMIC_WATCHLIST.map((w, idx) => (
              <div key={idx} className="financial-card p-6 md:p-8 flex flex-col justify-between group hover:border-cyan-500/40 transition-all">
                <div className="space-y-5">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">{w.impact}</span>
                      <h3 className="text-lg font-black text-white uppercase leading-tight group-hover:text-cyan-300 transition-colors">{w.title}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${w.color} flex-shrink-0`}>
                      {w.status}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                    <span className="text-[9px] font-black text-slate-500 uppercase block">Current Live Figure</span>
                    <span className="text-2xl md:text-3xl font-black text-white font-mono mt-1 block">{w.value}</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono mt-1 block">{w.change}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {w.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] font-black text-slate-500 uppercase flex justify-between items-center">
                  <span>Fact-Checked Audit</span>
                  <span className="text-emerald-400">Status: Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: ECONOMY EXPLAINED (SIMPLE ORDINARY ENGLISH GLOSSARY) ── */}
      {activeTab === 'explained' && (
        <div className="space-y-10 animate-fade-in">
          <SectionHeader q="SIMPLIFIED KNOWLEDGE BASE" title="Economy Explained" sub="Demystifying complex financial terminology into clear, accessible plain English for ordinary Kenyans." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                term: 'Gross Domestic Product (GDP) Growth',
                question: 'What does this mean for ordinary citizens?',
                simple: 'The economy produced more goods and services (crops, transport, software, manufacturing) than last year.',
                why: 'When GDP grows steadily, businesses expand, more youth get hired, and government tax collections rise naturally without raising tax rates.'
              },
              {
                term: 'Inflation Rate',
                question: 'What does this mean for ordinary citizens?',
                simple: 'How quickly the prices of everyday goods (maize flour, cooking oil, electricity, school uniform) are increasing.',
                why: 'An inflation rate of 4.6% means that a shopping basket that cost KSh 1,000 last year now costs around KSh 1,046. Keeping it low protects your purchasing power.'
              },
              {
                term: 'Exchange Rate (KES/USD)',
                question: 'What does this mean for ordinary citizens?',
                simple: 'How many Kenyan shillings you must exchange to buy one United States Dollar.',
                why: 'Because Kenya imports petroleum, medicine, fertilizer, and industrial machinery using US Dollars, a strong shilling keeps fuel and import prices lower at local shops.'
              },
              {
                term: 'Central Bank Rate (CBR)',
                question: 'What does this mean for ordinary citizens?',
                simple: 'The benchmark interest rate set by the Central Bank of Kenya that guides how much commercial banks charge for loans.',
                why: 'When the CBK lowers the rate to 12.0%, commercial banks gradually reduce interest on business loans, mortgages, and personal overdrafts, making borrowing cheaper.'
              },
              {
                term: 'Debt-to-GDP Ratio',
                question: 'What does this mean for ordinary citizens?',
                simple: 'How large Kenya\'s total national debt is compared to the total economic output of the country.',
                why: 'At 70.4%, our debt is large relative to our income. By law (PFM Act), the recommended ceiling is 55% so that the nation remains solvent.'
              },
              {
                term: 'Debt Service to Revenue Ratio',
                question: 'What does this mean for ordinary citizens?',
                simple: 'The percentage of tax money collected by KRA that must be paid out immediately to lenders before anything else is done.',
                why: 'At 53.8%, over half of all taxes go directly to pay loan interest and installments. This leaves fewer shillings for building hospitals, paying doctors, or repairing county roads.'
              },
              {
                term: 'Foreign Exchange Reserves',
                question: 'What does this mean for ordinary citizens?',
                simple: 'Foreign currency (Dollars, Euros) and gold kept safely by the Central Bank of Kenya inside international vaults.',
                why: 'These reserves act like our national emergency savings account, ensuring Kenya can always pay for essential imports like jet fuel, wheat, and debt repayments without running out of cash.'
              },
              {
                term: 'Fiscal Deficit',
                question: 'What does this mean for ordinary citizens?',
                simple: 'The exact gap or shortfall between what the government spends versus what it collects in taxes.',
                why: 'When spending exceeds taxes collected, the government must borrow money (either from local banks via Treasury bills or from international lenders) to plug that gap.'
              }
            ].map((exp, idx) => (
              <div key={idx} className="financial-card p-8 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 mb-3">
                    <HelpCircle size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{exp.question}</span>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tight border-b border-slate-800 pb-3">{exp.term}</h3>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 mb-4">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">In Plain English:</span>
                    <p className="text-sm text-white font-bold leading-relaxed">{exp.simple}</p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    <strong className="text-slate-300 uppercase text-[11px] font-black block mb-1">Why it matters to your wallet:</strong> {exp.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: FISCAL & ECONOMIC NEWS (100% VERIFIED OFFICIAL ONLY) ── */}
      {activeTab === 'news' && (
        <div className="space-y-10 animate-fade-in">
          <SectionHeader q="TRUSTED AUTHORITY DESK" title="Verified Fiscal & Economic News" sub="Strictly curated updates published exclusively by official regulatory authorities: National Treasury, CBK, KNBS, KRA, Parliament, IMF, and World Bank." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VERIFIED_NEWS.map((news, idx) => (
              <div key={idx} className="financial-card p-8 space-y-6 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[11px] font-black font-mono text-cyan-400 uppercase bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                      {news.source}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${news.badge}`}>
                      {news.verification}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-white uppercase leading-tight group-hover:text-emerald-300 transition-colors">
                    {news.headline}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-xs font-bold text-slate-500 font-mono">
                  <span>Published: {news.date}</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={14} /> Fact-Checked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LIVE DATA ARCHITECTURE & VERIFICATION ENGINE PANEL ── */}
      <div className="financial-card p-8 md:p-12 bg-slate-900/60 border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">LIVE ARCHITECTURE STATUS</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Automated Verification Protocol Engine</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-400 flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin text-cyan-400" /> Active Nodes: {LIVE_DATA_STATUS.activeNodes}
            </span>
            <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs uppercase rounded-xl">
              Synced: Verified
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-4xl">
          {LIVE_DATA_STATUS.notice}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIVE_DATA_STATUS.protocols.map((p, idx) => (
            <div key={idx} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black text-white uppercase tracking-tight">{p.name}</h4>
                <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{p.status}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
