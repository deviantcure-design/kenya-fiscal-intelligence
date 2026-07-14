import { ShieldCheck, AlertTriangle, ShieldQuestion } from 'lucide-react';

export const STATUS = {
  VERIFIED: { label: 'Verified', color: 'text-emerald-500', icon: ShieldCheck, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', confidence: '100%' },
  ESTIMATED: { label: 'Estimated', color: 'text-amber-500', icon: AlertTriangle, bg: 'bg-amber-500/10', border: 'border-amber-500/20', confidence: '85%' },
  UNVERIFIED: { label: 'Unverified', color: 'text-slate-400', icon: ShieldQuestion, bg: 'bg-slate-800', border: 'border-slate-700', confidence: 'N/A' },
  NOT_AVAILABLE: { label: 'Awaiting Audit', color: 'text-rose-500', icon: AlertTriangle, bg: 'bg-rose-500/10', border: 'border-rose-500/20', confidence: '0%' },
};

export const PROJECT_HEALTH = {
  ON_TRACK: { label: 'On Track', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  DELAYED: { label: 'Delayed', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  AT_RISK: { label: 'At Risk', color: 'text-red-500', bg: 'bg-red-500/10' },
  OPERATIONAL: { label: 'Operational', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
};

export const SOURCES = {
  TREASURY: { name: 'National Treasury / Budget Estimates FY26/27', lastUpdated: 'July 2026' },
  CBK: { name: 'Central Bank of Kenya Statistical Bulletin', lastUpdated: 'July 2026' },
  KRA: { name: 'Kenya Revenue Authority e-TIMS Registry', lastUpdated: 'July 2026' },
  KNBS: { name: 'Kenya National Bureau of Statistics (KNBS)', lastUpdated: 'July 2026' },
  PARLIAMENT: { name: 'Parliament Budget Office / Auditor General', lastUpdated: 'July 2026' },
  IMF: { name: 'IMF Extended Fund Facility & Fiscal Monitor', lastUpdated: 'July 2026' },
  WORLD_BANK: { name: 'World Bank Kenya Economic Update', lastUpdated: 'June 2026' },
  AFDB: { name: 'African Development Bank (AfDB) Portal', lastUpdated: 'June 2026' },
};
