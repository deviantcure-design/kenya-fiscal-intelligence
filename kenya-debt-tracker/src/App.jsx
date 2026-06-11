import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  PieChart, 
  Briefcase, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronDown,
  Info,
  Layers,
  Building,
  RefreshCw
} from 'lucide-react';

// ==========================================
// 1. HARDCODED FINANCIAL DATA (2026 ENVIRONMENT)
// ==========================================
const DEBT_SUMMARY = {
  totalDebt: 13020000000000, // KSh 13.02 Trillion
  debtToGdp: 70.4,
  debtServiceRatio: 69.0, // 69% of ordinary revenue
  domestic: {
    total: 7240000000000, // KSh 7.24 Trillion
    percentage: 55.6,
    interest: 851000000000, // KSh 851 Billion
    holders: [
      { name: 'Commercial Banks', amount: 3410000000000, pct: 47.1 },
      { name: 'Pension Funds', amount: 2310000000000, pct: 31.9 },
      { name: 'Insurance Companies', amount: 580000000000, pct: 8.0 },
      { name: 'Central Bank of Kenya', amount: 430000000000, pct: 5.9 },
      { name: 'Other Investors', amount: 510000000000, pct: 7.1 }
    ]
  },
  external: {
    total: 5780000000000, // KSh 5.78 Trillion
    percentage: 44.4,
    interest: 246000000000, // KSh 246 Billion
    holders: [
      { name: 'Multilateral (World Bank, IMF, AfDB)', amount: 2950000000000, pct: 51.0 },
      { name: 'Bilateral Lenders (China, Japan, France)', amount: 1510000000000, pct: 26.1 },
      { name: 'Commercial Banks & Eurobonds', amount: 1320000000000, pct: 22.9 }
    ]
  },
  annualInterestTotal: 1097000000000 // KSh 1.097 Trillion
};

const UPCOMING_REPAYMENTS = [
  {
    id: 'rep-1',
    title: 'Treasury Bond (FXD1/2016/10Yr) Maturity',
    type: 'Domestic Debt',
    amount: 45000000000,
    dueDate: '2026-06-25',
    urgency: 'high',
    lender: 'Local Institutional Investors'
  },
  {
    id: 'rep-2',
    title: 'Eurobond Semi-Annual Interest Payment',
    type: 'External Debt',
    amount: 14200000000,
    dueDate: '2026-07-12',
    urgency: 'high',
    lender: 'International Sovereign Bond Holders'
  },
  {
    id: 'rep-3',
    title: 'IMF Extended Fund Facility (EFF) Tranche Repayment',
    type: 'External Debt',
    amount: 28700000000,
    dueDate: '2026-08-04',
    urgency: 'medium',
    lender: 'International Monetary Fund'
  },
  {
    id: 'rep-4',
    title: 'Treasury Bill (91-Day & 182-Day) Synchronized Batch',
    type: 'Domestic Debt',
    amount: 62000000000,
    dueDate: '2026-08-20',
    urgency: 'medium',
    lender: 'Commercial Banks & CBK Open Market'
  },
  {
    id: 'rep-5',
    title: 'Exim Bank of China (SGR Loan Phase 1 Tranche)',
    type: 'External Debt',
    amount: 38500000000,
    dueDate: '2026-11-15',
    urgency: 'low',
    lender: 'Government of China (Bilateral)'
  }
];

const BUDGET_ALLOCATION = {
  totalBudget: 3920000000000, // KSh 3.92 Trillion Total Budget Frame
  revenueTarget: 2950000000000, // KSh 2.95 Trillion projected ordinary revenue
  deficit: 970000000000,
  sectors: [
    { 
      name: 'Consolidated Fund Services (CFS) - Debt Servicing', 
      amount: 1840000000000, // Consists of Interest + Principal Redemptions
      percentage: 46.9, 
      color: 'bg-red-600',
      details: 'Strictly statutory obligations prioritizing domestic bond redemptions, external coupons, and sovereign penalties before any department funds are released.'
    },
    { 
      name: 'Executive & National Government Operations', 
      amount: 1310000000000, 
      percentage: 33.4, 
      color: 'bg-slate-700',
      details: 'Running costs of ministries, departments, defense, internal security, state payrolls, and operations across administrative units.'
    },
    { 
      name: 'County Governments Equitable Share', 
      amount: 415000000000, 
      percentage: 10.6, 
      color: 'bg-indigo-600',
      details: 'Devolved funds distributed to the 47 county governments to manage localized health, agriculture, and rural infrastructure.'
    },
    { 
      name: 'Parliament & Judiciary Autonomy Allocations', 
      amount: 72000000000, 
      percentage: 1.8, 
      color: 'bg-amber-600',
      details: 'Legislative oversight allocations, court operations expansions, and judicial modernization budgets.'
    },
    { 
      name: 'Development Project Financing (Exchequer Counterpart)', 
      amount: 283000000000, 
      percentage: 7.2, 
      color: 'bg-emerald-600',
      details: 'Domestic contribution mandatory to unlock structural co-funded infrastructure loans from external multilateral financing partners.'
    }
  ]
};

const DEBT_FUNDED_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Standard Gauge Railway (SGR) Phase 2B & Naivasha Inland Hub Expansion',
    sector: 'Transport',
    totalBudget: 178000000000,
    amountSpent: 161000000000,
    fundingSource: 'Bilateral Loan (Exim Bank of China) / Exchequer',
    status: 'Operational',
    completionPercentage: 92,
    county: 'Nakuru / Nairobi',
    description: 'Extension of freight tracks, building container handling facilities, and upgrading tracking infrastructure to handle cross-border trade extensions.'
  },
  {
    id: 'proj-2',
    name: 'Kenol-Sagana-Marua Dual Carriageway Upgrade',
    sector: 'Transport',
    totalBudget: 33000000000,
    amountSpent: 31200000000,
    fundingSource: 'Multilateral (African Development Bank) + Govt Counterpart',
    status: 'Operational',
    completionPercentage: 100,
    county: 'Murang’a / Kirinyaga / Nyeri',
    description: 'Conversion of the critical A2 northern corridor link into a high-speed 4-lane dual carriageway to reduce cargo transit times.'
  },
  {
    id: 'proj-3',
    name: 'National Last Mile Power Connectivity Project (Phase IV)',
    sector: 'Energy',
    totalBudget: 27500000000,
    amountSpent: 19800000000,
    fundingSource: 'Multilateral Loan (World Bank / AFD)',
    status: 'In Progress',
    completionPercentage: 72,
    county: 'Nationwide (47 Counties)',
    description: 'Installation of low-voltage distribution lines and localized step-down transformers to bring grid power to over 280,000 rural households.'
  },
  {
    id: 'proj-4',
    name: 'Thwake Multi-Purpose Dam & Water Supply Systems',
    sector: 'Water',
    totalBudget: 82000000000,
    amountSpent: 59000000000,
    fundingSource: 'Co-financed (African Development Bank & Government of Kenya)',
    status: 'In Progress',
    completionPercentage: 71,
    county: 'Makueni / Kitui',
    description: 'Construction of a mega-dam structure for drinking water supply, downstream irrigation blocks, and eventual 20MW hydropower integration.'
  },
  {
    id: 'proj-5',
    name: 'Nairobi Expressway Operations & Eastern Bypass Link Integration',
    sector: 'Transport',
    totalBudget: 18500000000,
    amountSpent: 11100000000,
    fundingSource: 'Commercial Debt Bond / Public-Private Partnership Structure',
    status: 'In Progress',
    completionPercentage: 60,
    county: 'Nairobi / Machakos',
    description: 'Constructing localized feedback entries, adding smart toll monitoring infrastructure, and expanding peripheral feeder links.'
  },
  {
    id: 'proj-6',
    name: 'Universal Health Coverage (UHC) Medical Equipment Modernization Scheme',
    sector: 'Health',
    totalBudget: 41000000000,
    amountSpent: 38500000000,
    fundingSource: 'External Commercial Credit / Sovereign Development Loans',
    status: 'Delayed',
    completionPercentage: 84,
    county: 'Multicounty (Selected Level 5 Hospitals)',
    description: 'Procurement and rollout of specialized oncology, renal dialysis, and intensive ICU life support infrastructure across county referral hubs.'
  },
  {
    id: 'proj-7',
    name: 'Konza Technopolis Infrastructure Core Support - Phase II',
    sector: 'Technology',
    totalBudget: 52000000000,
    amountSpent: 29000000000,
    fundingSource: 'Bilateral Credit lines (Government of Italy)',
    status: 'In Progress',
    completionPercentage: 55,
    county: 'Machakos Area',
    description: 'Development of horizontal underground utility ducts, smart waste plants, and high-capacity tier-3 localized cloud data centers.'
  }
];

// ==========================================
// UTILITY FUNCTION FOR FORMATTING CURRENCY
// ==========================================
const formatKSh = (value) => {
  if (value >= 1000000000000) {
    return `KSh ${(value / 1000000000000).toFixed(2)} Trillion`;
  }
  if (value >= 1000000000) {
    return `KSh ${(value / 1000000000).toFixed(1)} Billion`;
  }
  return `KSh ${value.toLocaleString()}`;
};

export default function KenyaDebtDashboard() {
  const [activeTab, setActiveTab] = useState('debt-overview');
  const [tickerMetrics, setTickerMetrics] = useState({ perDay: 0, perHour: 0, perSecond: 0 });
  const [timeRemaining, setTimeRemaining] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Project Tracker State Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);

  // Calculate live ticker compounding interest based on KSh 1.097T annual rate
  useEffect(() => {
    const annual = DEBT_SUMMARY.annualInterestTotal;
    const perDay = Math.floor(annual / 365);
    const perHour = Math.floor(perDay / 24);
    const perSecond = annual / (365 * 24 * 60 * 60);

    setTickerMetrics({ perDay, perHour, perSecond });

    // Live Repayment Deadlines Calculator
    const calculateCountdowns = () => {
      const targetDates = UPCOMING_REPAYMENTS.map(rep => {
        const diff = new Date(rep.dueDate) - new Date();
        if (diff <= 0) return { id: rep.id, text: "Due Now / In Processing" };
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return { id: rep.id, text: `${days}d ${hours}h remaining`, rawDays: days };
      });

      const countdownMap = {};
      targetDates.forEach(item => { countdownMap[item.id] = item; });
      setTimeRemaining(countdownMap);
    };

    calculateCountdowns();
    const interval = setInterval(calculateCountdowns, 60000); // refresh time metrics
    return () => clearInterval(interval);
  }, []);

  // Real-time ticking accumulation counter setup
  const [realtimeInterestSec, setRealtimeInterestSec] = useState(0);
  useEffect(() => {
    const secRate = tickerMetrics.perSecond;
    if (!secRate) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const secondsPassedToday = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
      setRealtimeInterestSec(Math.floor(secondsPassedToday * secRate));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [tickerMetrics]);

  // Project Filter Logic
  const filteredProjects = DEBT_FUNDED_PROJECTS.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.county.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || project.sector === selectedSector;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const uniqueSectors = ['All', ...new Set(DEBT_FUNDED_PROJECTS.map(p => p.sector))];
  const uniqueStatuses = ['All', ...new Set(DEBT_FUNDED_PROJECTS.map(p => p.status))];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col md:flex-row antialiased">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-80 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/10 border border-red-500/30 rounded-lg text-red-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">KENYA DEBT OBSERVER</h1>
              <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Fiscal Year 2026 Data Hub</span>
            </div>
          </div>
          <div className="mt-4 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-center text-xs text-amber-500 font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Live Data Modeling Framework
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('debt-overview')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-150 ${activeTab === 'debt-overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Clock className="w-5 h-5" />
            Debt & Repayment Engine
          </button>
          
          <button 
            onClick={() => setActiveTab('expenditure-allocation')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-150 ${activeTab === 'expenditure-allocation' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <PieChart className="w-5 h-5" />
            Expenditure & Revenues
          </button>
          
          <button 
            onClick={() => setActiveTab('project-tracker')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-150 ${activeTab === 'project-tracker' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Briefcase className="w-5 h-5" />
            Debt-Funded Mega Projects
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p>Aggregated figures reference official releases from the National Treasury, CBK, and Controller of Budget records adjusted for the 2026 fiscal curve.</p>
          </div>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT RUNTIME */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
        
        {/* TOP COMPONENT: LIVE REALTIME INTEREST TICKER BANNER */}
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4">
            <DollarSign className="w-48 h-48" />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">Real-time Debt Servicing Bleed</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Compounding Interest Accumulator</h2>
              <p className="text-xs text-slate-400">Visualizing running interest overhead allocations incurred today alone.</p>
            </div>
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-6 py-4 min-w-[280px] lg:min-w-[360px] text-center lg:text-right">
              <span className="text-xs text-slate-400 block font-medium mb-1">Accrued Interest Income Since Midnight</span>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-amber-400 tracking-tight transition-all duration-100">
                {realtimeInterestSec > 0 ? formatKSh(realtimeInterestSec) : 'Calculating...'}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Rate/Day: ~{formatKSh(tickerMetrics.perDay)}</span>
                <span>Rate/Sec: ~KSh {Math.floor(tickerMetrics.perSecond).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW A: DEBT PROFILE AND REPAYMENT TIMELINE */}
        {activeTab === 'debt-overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Macro Statistics Metric Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-md">
                <div className="flex items-center justify-between mb-3 text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Public Debt Stock</span>
                  <Layers className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{formatKSh(DEBT_SUMMARY.totalDebt)}</div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-900 pt-2">
                  <span>Domestic Stack: {DEBT_SUMMARY.domestic.percentage}%</span>
                  <span>External Stack: {DEBT_SUMMARY.external.percentage}%</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-md">
                <div className="flex items-center justify-between mb-3 text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Estimated Debt-to-GDP Ratio</span>
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{DEBT_SUMMARY.debtToGdp}%</div>
                <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${DEBT_SUMMARY.debtToGdp}%` }}></div>
                </div>
                <p className="text-[11px] text-amber-500/80 mt-1.5">Significantly above East African Community ceiling bounds.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-md">
                <div className="flex items-center justify-between mb-3 text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Revenue Collection Absorption</span>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{DEBT_SUMMARY.debtServiceRatio}%</div>
                <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${DEBT_SUMMARY.debtServiceRatio}%` }}></div>
                </div>
                <p className="text-[11px] text-red-400 mt-1.5">KSh 69 out of every KSh 100 collected services lenders.</p>
              </div>
            </div>

            {/* Split Composition View and Expandable Holder Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Domestic Profile Section */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Domestic Debt Architecture</h3>
                    <p className="text-xs text-slate-400">Internal debt held via sovereign treasury papers</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-indigo-400">{formatKSh(DEBT_SUMMARY.domestic.total)}</span>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Lender Mix Breakdowns</span>
                    <span>% share</span>
                  </div>
                  {DEBT_SUMMARY.domestic.holders.map((holder, idx) => (
                    <div key={idx} className="bg-slate-900/50 rounded-lg p-2.5 flex flex-col gap-1.5 border border-slate-800/40">
                      <div className="flex justify-between text-slate-300 font-medium">
                        <span>{holder.name}</span>
                        <span>{holder.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-indigo-500 h-1 rounded-full" style={{ width: `${holder.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>Domestic Interest Commitment:</span>
                  <span className="font-semibold text-white font-mono">{formatKSh(DEBT_SUMMARY.domestic.interest)}</span>
                </div>
              </div>

              {/* External Profile Section */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">External Debt Architecture</h3>
                    <p className="text-xs text-slate-400">Foreign denomination obligations, loans and syndicates</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-indigo-400">{formatKSh(DEBT_SUMMARY.external.total)}</span>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Creditor Classification Structure</span>
                    <span>% share</span>
                  </div>
                  {DEBT_SUMMARY.external.holders.map((holder, idx) => (
                    <div key={idx} className="bg-slate-900/50 rounded-lg p-2.5 flex flex-col gap-1.5 border border-slate-800/40">
                      <div className="flex justify-between text-slate-300 font-medium">
                        <span>{holder.name}</span>
                        <span>{holder.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${holder.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                  <span>External Interest Commitment:</span>
                  <span className="font-semibold text-white font-mono">{formatKSh(DEBT_SUMMARY.external.interest)}</span>
                </div>
              </div>
            </div>

            {/* Repayment Timeline & Maturity Tranche Alert Indicators */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Immediate Repayment Execution Horizon</h3>
                <p className="text-xs text-slate-400">Chronological list of next sovereign debt maturities and coupon windows due from the exchequer fund.</p>
              </div>

              <div className="space-y-3">
                {UPCOMING_REPAYMENTS.map((rep) => (
                  <div 
                    key={rep.id} 
                    className={`border rounded-xl p-4 transition-all duration-200 ${rep.urgency === 'high' ? 'border-red-900/50 bg-red-950/10 hover:bg-red-950/20' : 'border-slate-800 bg-slate-900/20 hover:bg-slate-900/40'}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${rep.type.includes('Domestic') ? 'bg-indigo-900/60 border border-indigo-700/50 text-indigo-300' : 'bg-emerald-900/60 border border-emerald-700/50 text-emerald-300'}`}>
                            {rep.type}
                          </span>
                          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Due: {rep.dueDate}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200">{rep.title}</h4>
                        <p className="text-xs text-slate-400 font-medium">Creditor Target: <span className="text-slate-300">{rep.lender}</span></p>
                      </div>

                      <div className="flex lg:flex-col items-between lg:items-end justify-between lg:justify-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                        <div className="text-base font-bold font-mono text-white">{formatKSh(rep.amount)}</div>
                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${rep.urgency === 'high' ? 'text-red-400' : 'text-amber-400'}`}>
                          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                          <span className="font-mono">{timeRemaining[rep.id]?.text || 'Recalculating...'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW B: EXPENDITURE FRAME & REVENUE RECOVERY */}
        {activeTab === 'expenditure-allocation' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Topline Budget vs Resource Deficit Balancing */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Fiscal Deficit Structure Frame</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Total Target Budget Expenditures</span>
                  <span className="text-xl font-bold text-white font-mono">{formatKSh(BUDGET_ALLOCATION.totalBudget)}</span>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Projected Ordinary Revenue Stock</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">{formatKSh(BUDGET_ALLOCATION.revenueTarget)}</span>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">Fiscal Funding Shortfall (Deficit)</span>
                  <span className="text-xl font-bold text-red-400 font-mono">{formatKSh(BUDGET_ALLOCATION.deficit)}</span>
                </div>
              </div>

              {/* Dynamic Macro Stacked Percentage Bar Visualization */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Revenue Coverage Target (~75.2%)</span>
                  <span>Debt Deficit Financing Required (~24.8%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-xl h-4 overflow-hidden flex border border-slate-700/30">
                  <div className="bg-emerald-600 h-full" style={{ width: '75.2%' }} title="Tax revenue coverage"></div>
                  <div className="bg-red-600 h-full animate-pulse" style={{ width: '24.8%' }} title="New borrowings required"></div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  The visual deficit split shows how much of the proposed allocations depend on floating new domestic treasury bonds or issuing commercial loans, pushing future interest liabilities higher.
                </p>
              </div>
            </div>

            {/* In-depth Allocation Sector Grid */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sector Specific Allocations Matrix</h3>
                <p className="text-xs text-slate-400">Where tax collected and newly floated public debt lines are targeted dynamically across components.</p>
              </div>

              <div className="space-y-3">
                {BUDGET_ALLOCATION.sectors.map((sector, index) => {
                  const isExpanded = expandedSection === index;
                  return (
                    <div 
                      key={index}
                      className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : index)}
                        className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-slate-900/30"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-3 h-3 rounded-full ${sector.color} shrink-0`}></span>
                            <span className="text-sm font-bold text-slate-200">{sector.name}</span>
                          </div>
                          
                          <div className="w-full lg:w-96 bg-slate-900 rounded-full h-1.5 mt-2">
                            <div className={`${sector.color} h-1.5 rounded-full`} style={{ width: `${sector.percentage}%` }}></div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 font-mono">
                          <div className="text-right">
                            <div className="text-sm font-bold text-white">{formatKSh(sector.amount)}</div>
                            <div className="text-xs text-slate-400">{sector.percentage}% of overall stack</div>
                          </div>
                          {isExpanded ? <ChevronDown className="w-4 'h-4' text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 bg-slate-950 border-t border-slate-900 text-xs text-slate-400 leading-relaxed">
                          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/50">
                            <span className="font-bold text-slate-300 block mb-1">Allocation Subtext & Statutory Mandate:</span>
                            {sector.details}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* VIEW C: DEBT FUNDED INFRASTRUCTURE TRACKER */}
        {activeTab === 'project-tracker' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Description */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Public Debt Project Allocation Index</h3>
              <p className="text-xs text-slate-400">Granular visibility into major capital intensive infrastructure items co-funded or wholly sustained by external loans and treasury disbursements.</p>
            </div>

            {/* Filter, Search, and Status Modification Toolbars */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Search project name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select 
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="bg-transparent text-xs text-slate-300 focus:outline-none py-1 font-medium cursor-pointer"
                  >
                    {uniqueSectors.map((sector, i) => <option key={i} value={sector} className="bg-slate-950">{sector} Sector</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent text-xs text-slate-300 focus:outline-none py-1 font-medium cursor-pointer"
                  >
                    {uniqueStatuses.map((status, i) => <option key={i} value={status} className="bg-slate-950">{status} Status</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Render Output Table Grid Components */}
            <div className="space-y-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => {
                  const isProjExpanded = expandedProject === project.id;
                  return (
                    <div 
                      key={project.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700/60 transition-all duration-150"
                    >
                      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {project.sector}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">• County Area: {project.county}</span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-slate-200 tracking-tight">{project.name}</h4>
                          
                          {/* Miniature Completion Visual Progress bar */}
                          <div className="flex items-center gap-3 pt-1">
                            <div className="w-32 bg-slate-900 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${project.status === 'Operational' ? 'bg-emerald-500' : project.status === 'Delayed' ? 'bg-red-500' : 'bg-amber-500'}`}
                                style={{ width: `${project.completionPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-[11px] font-bold font-mono text-slate-400">{project.completionPercentage}% Complete</span>
                          </div>
                        </div>

                        {/* Financial metrics and toggle buttons */}
                        <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 border-slate-900 pt-3 lg:pt-0 shrink-0 font-mono">
                          <div className="text-left lg:text-right">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase block">Total Allocated Financing</span>
                            <span className="text-sm font-bold text-white">{formatKSh(project.totalBudget)}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 ${
                              project.status === 'Operational' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-400' :
                              project.status === 'Delayed' ? 'bg-red-950/50 border border-red-800 text-red-400' :
                              'bg-amber-950/50 border border-amber-800 text-amber-400'
                            }`}>
                              {project.status === 'Operational' && <CheckCircle className="w-3 h-3" />}
                              {project.status === 'Delayed' && <AlertTriangle className="w-3 h-3" />}
                              {project.status === 'In Progress' && <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />}
                              {project.status}
                            </span>

                            <button 
                              onClick={() => setExpandedProject(isProjExpanded ? null : project.id)}
                              className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 transition-colors"
                            >
                              {isProjExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Meta details container */}
                      {isProjExpanded && (
                        <div className="bg-slate-950 border-t border-slate-900 p-5 space-y-4 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 border border-slate-800/60 p-3 rounded-lg space-y-1">
                              <span className="text-slate-400 font-bold uppercase text-[10px] block">Funding Instrument / Origin</span>
                              <span className="text-slate-200 font-medium">{project.fundingSource}</span>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800/60 p-3 rounded-lg space-y-1">
                              <span className="text-slate-400 font-bold uppercase text-[10px] block">Absorption Rate Ratio</span>
                              <span className="text-slate-200 font-medium font-mono">
                                {formatKSh(project.amountSpent)} spent out of {formatKSh(project.totalBudget)} ({Math.round((project.amountSpent/project.totalBudget)*100)}%)
                              </span>
                            </div>
                          </div>

                          <div className="bg-slate-900/30 p-3 rounded-lg border border-slate-800/40">
                            <span className="text-slate-300 font-bold block mb-1">Project Technical Context & Impact Horizon:</span>
                            <p className="text-slate-400 leading-relaxed font-medium">{project.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500 space-y-2">
                  <Info className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-sm font-medium">No infrastructure items fit the current filters or query string parameters.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedSector('All'); setSelectedStatus('All'); }}
                    className="text-xs text-indigo-400 underline font-semibold"
                  >
                    Reset Active Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
}