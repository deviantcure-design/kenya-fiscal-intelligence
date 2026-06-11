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
  TREASURY: { name: 'National Treasury / BPS 2025', lastUpdated: 'June 2026' },
  CBK: { name: 'Central Bank of Kenya', lastUpdated: 'May 2026' },
  KRA: { name: 'Kenya Revenue Authority', lastUpdated: 'May 2026' },
  IMF: { name: 'IMF Fiscal Monitor', lastUpdated: 'April 2026' },
};
