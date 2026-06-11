import { STATUS, PROJECT_HEALTH, SOURCES } from '../constants';
import { Wallet, ShieldCheck, Scale, Activity } from 'lucide-react';

export const FISCAL_CORE = {
  totalDebt: { val: 13.02e12, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  debtDue12M: { val: 1.744e12, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  revenueCollected: { val: 3.32e12, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  interestPaid: { val: 1.098e12, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  principalPaid: { val: 646e9, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  totalDebtService: { val: 1.744e12, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  moneyRemaining: { val: 1.576e12, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  gdp: 18.5e12,
  population: 56.2e6,
  taxpayers: 7.2e6,
};

export const PROJECTS = [
  { id: 'sgr', name: 'SGR Train (Mombasa-Naivasha)', principal: 655e9, interest: 420e9, total: 1075e9, progress: 100, health: PROJECT_HEALTH.OPERATIONAL, lender: 'China Exim Bank', v: STATUS.VERIFIED, src: SOURCES.TREASURY, equivalent: '250 Hospitals', impact: 'Transported 12M+ passengers since 2017.' },
  { id: 'exp', name: 'Nairobi Expressway', principal: 88e9, interest: 278e9, total: 366e9, progress: 100, health: PROJECT_HEALTH.OPERATIONAL, lender: 'Private Investor', v: STATUS.ESTIMATED, src: SOURCES.TREASURY, note: 'Toll-recovery model over 27 years.', impact: 'Reduces commute from 2hrs to 20mins.' },
  { id: 'thw', name: 'Thwake Multipurpose Dam', principal: 38e9, interest: 12e9, total: 50e9, progress: 79, health: PROJECT_HEALTH.ON_TRACK, lender: 'AfDB', v: STATUS.VERIFIED, src: SOURCES.TREASURY, equivalent: 'Water for 1.3M people', impact: 'Will provide irrigation for 40,000 hectares.' },
  { id: 'tal', name: 'Talanta Sports City', principal: 45.8e9, interest: null, total: null, progress: 15, health: PROJECT_HEALTH.DELAYED, lender: 'Infrastructure Bond', v: STATUS.NOT_AVAILABLE, src: SOURCES.TREASURY, note: 'Auditor General flagged cost discrepancy in 2026.' },
];

export const LENDERS = [
  { name: 'Commercial Banks', category: 'Domestic', amount: 2.48e12, share: 19.0, status: STATUS.VERIFIED, src: SOURCES.CBK },
  { name: 'Pension Funds', category: 'Domestic', amount: 1.95e12, share: 15.0, status: STATUS.VERIFIED, src: SOURCES.CBK },
  { name: 'World Bank (IDA)', category: 'Multilateral', amount: 1.70e12, share: 13.1, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  { name: 'China', category: 'Bilateral', amount: 653.1e9, share: 5.0, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  { name: 'Eurobond Holders', category: 'Commercial', amount: 1.02e12, share: 7.8, status: STATUS.VERIFIED, src: SOURCES.TREASURY },
  { name: 'IMF', category: 'Multilateral', amount: 478.8e9, share: 3.7, status: STATUS.VERIFIED, src: SOURCES.IMF },
];

export const COUNTIES = [
  { id: 1, name: 'Mombasa', allocation: 10.5e9, pop: 1200000 },
  { id: 2, name: 'Kwale', allocation: 8.5e9, pop: 860000 },
  { id: 3, name: 'Kilifi', allocation: 10.8e9, pop: 1450000 },
  { id: 4, name: 'Tana River', allocation: 6.5e9, pop: 310000 },
  { id: 5, name: 'Lamu', allocation: 3.5e9, pop: 143000 },
  { id: 6, name: 'Taita Taveta', allocation: 5.3e9, pop: 340000 },
  { id: 7, name: 'Garissa', allocation: 8.2e9, pop: 840000 },
  { id: 8, name: 'Wajir', allocation: 9.1e9, pop: 780000 },
  { id: 9, name: 'Mandera', allocation: 8.9e9, pop: 860000 },
  { id: 10, name: 'Marsabit', allocation: 6.7e9, pop: 450000 },
  { id: 11, name: 'Isiolo', allocation: 4.9e9, pop: 270000 },
  { id: 12, name: 'Meru', allocation: 9.4e9, pop: 1540000 },
  { id: 13, name: 'Tharaka-Nithi', allocation: 4.8e9, pop: 390000 },
  { id: 14, name: 'Embu', allocation: 5.4e9, pop: 600000 },
  { id: 15, name: 'Kitui', allocation: 7.9e9, pop: 1130000 },
  { id: 16, name: 'Machakos', allocation: 10.1e9, pop: 1420000 },
  { id: 17, name: 'Makueni', allocation: 7.5e9, pop: 980000 },
  { id: 18, name: 'Nyandarua', allocation: 5.8e9, pop: 630000 },
  { id: 19, name: 'Nyeri', allocation: 7.2e9, pop: 750000 },
  { id: 20, name: 'Kirinyaga', allocation: 5.2e9, pop: 610000 },
  { id: 21, name: 'Murang\'a', allocation: 7.4e9, pop: 1050000 },
  { id: 22, name: 'Kiambu', allocation: 12.9e9, pop: 2400000 },
  { id: 23, name: 'Turkana', allocation: 13.8e9, pop: 930000 },
  { id: 24, name: 'West Pokot', allocation: 6.4e9, pop: 620000 },
  { id: 25, name: 'Samburu', allocation: 5.9e9, pop: 310000 },
  { id: 26, name: 'Trans Nzoia', allocation: 7.2e9, pop: 990000 },
  { id: 27, name: 'Uasin Gishu', allocation: 7.1e9, pop: 1160000 },
  { id: 28, name: 'Elgeyo-Marakwet', allocation: 5.1e9, pop: 450000 },
  { id: 29, name: 'Nandi', allocation: 6.4e9, pop: 880000 },
  { id: 30, name: 'Baringo', allocation: 6.2e9, pop: 660000 },
  { id: 31, name: 'Laikipia', allocation: 6.9e9, pop: 510000 },
  { id: 32, name: 'Nakuru', allocation: 14.3e9, pop: 2160000 },
  { id: 33, name: 'Narok', allocation: 8.7e9, pop: 1150000 },
  { id: 34, name: 'Kajiado', allocation: 8.1e9, pop: 1110000 },
  { id: 35, name: 'Kericho', allocation: 6.8e9, pop: 900000 },
  { id: 36, name: 'Bomet', allocation: 6.6e9, pop: 870000 },
  { id: 37, name: 'Kakamega', allocation: 13.6e9, pop: 1860000 },
  { id: 38, name: 'Vihiga', allocation: 5.9e9, pop: 590000 },
  { id: 39, name: 'Bungoma', allocation: 11.2e9, pop: 1670000 },
  { id: 40, name: 'Busia', allocation: 7.1e9, pop: 890000 },
  { id: 41, name: 'Siaya', allocation: 7.7e9, pop: 990000 },
  { id: 42, name: 'Kisumu', allocation: 9.5e9, pop: 1150000 },
  { id: 43, name: 'Homa Bay', allocation: 7.8e9, pop: 1130000 },
  { id: 44, name: 'Migori', allocation: 8.2e9, pop: 1110000 },
  { id: 45, name: 'Kisii', allocation: 9.8e9, pop: 1260000 },
  { id: 46, name: 'Nyamira', allocation: 5.5e9, pop: 600000 },
  { id: 47, name: 'Nairobi', allocation: 21.1e9, pop: 4400000 },
];

export const HISTORY_LOG = [
  { year: 2005, debt: 0.75e12, revenue: 0.29e12 },
  { year: 2010, debt: 0.8e12, revenue: 0.54e12 },
  { year: 2015, debt: 2.5e12, revenue: 1.1e12 },
  { year: 2020, debt: 7.3e12, revenue: 1.7e12 },
  { year: 2025, debt: 12.4e12, revenue: 2.9e12 },
  { year: 2026, debt: 13.02e12, revenue: 3.32e12 },
];

export const INTELLIGENCE_LOG = [
  { id: 1, headline: 'BPS 2025: Revenue Targets Adjusted Upwards', date: 'June 10, 2026', src: SOURCES.TREASURY, status: STATUS.VERIFIED, summary: 'The National Treasury has revised the FY2026/27 revenue collection target to KSh 3.45T, citing improved compliance and new digital tax measures.', type: 'Revenue Update' },
  { id: 2, headline: 'IMF Completes 8th Review of Kenya Program', date: 'June 05, 2026', src: SOURCES.IMF, status: STATUS.VERIFIED, summary: 'IMF Executive Board approves immediate disbursement of $420M following successful fiscal consolidation targets and governance reforms.', type: 'IMF Review' },
  { id: 3, headline: 'Eurobond 2026 Refinancing Strategy Released', date: 'May 28, 2026', src: SOURCES.CBK, status: STATUS.ESTIMATED, summary: 'Treasury indicates preference for a mix of buybacks and concessional multilateral funding to handle the upcoming $2B maturity.', type: 'Debt Update' },
  { id: 4, headline: 'Auditor General Flags Infrastructure Spend Gap', date: 'May 15, 2026', src: { name: 'Auditor General', lastUpdated: 'May 2026' }, status: STATUS.VERIFIED, summary: 'Annual report identifies KSh 45B in pending bills across major transport projects that were not captured in the BPS.', type: 'Treasury Announcement' },
];

export const FINANCE_BILL = {
  status: 'Second Reading',
  impact: 'KSh 346B Potential Revenue',
  timeline: 'Expected Assent: June 30, 2026',
  changes: [
    { item: 'Digital Content Tax', effect: 'Increased to 5%', impact: 'KSh 12B', affected: 'Content Creators', status: STATUS.VERIFIED },
    { item: 'Motor Vehicle Tax', effect: 'Replaced with Road Maintenance Levy increase', impact: 'KSh 48B', affected: 'All Motorists', status: STATUS.VERIFIED },
    { item: 'Export Investment Promotion Levy', effect: 'New 2% levy on imported raw materials', impact: 'KSh 22B', affected: 'Manufacturers', status: STATUS.ESTIMATED },
    { item: 'Zero-Rated Goods', effect: 'Removal of bread and milk from zero-rated list (Proposed)', impact: 'KSh 18B', affected: 'Households', status: STATUS.NOT_AVAILABLE },
  ],
  risk: 'High public pushback; potential for significant amendments in Parliament.',
};

export const RISK_INDICATORS = [
  { label: 'Debt-to-GDP', val: 70.4, limit: 60, unit: '%', risk: 'High', desc: 'Above the EALA recommended limit of 50%, but within Treasury fiscal anchors.' },
  { label: 'Debt Service to Revenue', val: 52.5, limit: 30, unit: '%', risk: 'High', desc: 'Over half of revenue is consumed by debt, limiting development space.' },
  { label: 'External Debt Ratio', val: 44.3, limit: 50, unit: '%', risk: 'Moderate', desc: 'Foreign currency exposure is manageable but sensitive to Shilling fluctuations.' },
  { label: 'Interest Burden', val: 33.1, limit: 15, unit: '%', risk: 'High', desc: 'Interest payments alone consume 1/3 of the total tax collection.' },
];

export const SYNC_INFO = {
  lastSync: 'June 11, 2026 14:32:10 EAT',
  status: 'Connected',
  nodes: ['National Treasury', 'CBK', 'IMF', 'World Bank'],
};

export const RISK_METHODOLOGY = [
  { indicator: 'Debt-to-GDP', source: 'IMF/Treasury', threshold: '60% (Distress Signal)', weight: 'High' },
  { indicator: 'Interest Burden', source: 'KRA/CBK', threshold: '15% of Revenue', weight: 'Critical' },
  { indicator: 'Foreign Exposure', source: 'CBK External Debt Register', threshold: '50% of Total Debt', weight: 'Moderate' },
];

export const RECENT_CHANGES = [
  { type: 'Revenue', msg: 'Revenue Forecast Updated (BPS 2025)', time: '2 hours ago', icon: Wallet },
  { type: 'Debt', msg: 'New Bilateral Loan (World Bank IDA) Verified', time: '5 hours ago', icon: ShieldCheck },
  { type: 'Policy', msg: 'Finance Bill 2026: Amendments Filed', time: '1 day ago', icon: Scale },
  { type: 'Audit', msg: 'Auditor General Report FY2025/26 Published', time: '2 days ago', icon: Activity },
];
