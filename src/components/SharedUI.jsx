import { Component, useState } from 'react';
import { ShieldAlert, AlertTriangle, X, ShieldQuestion, HelpCircle } from 'lucide-react';
import { STATUS } from '../constants';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("CRITICAL DASHBOARD CRASH:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center font-sans overflow-auto">
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl mb-8">
            <ShieldAlert size={64} className="text-red-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Runtime Error Detected</h1>
          <p className="text-slate-400 max-w-md mx-auto mb-8 uppercase text-xs font-bold leading-relaxed">
            The platform's verification engine caught a critical failure. Diagnostic details are listed below for debugging.
          </p>
          
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left mb-10 overflow-hidden">
             <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">Development Diagnostic Panel</p>
             <div className="space-y-4">
                <div>
                   <p className="text-[9px] font-black text-slate-500 uppercase">Error Message</p>
                   <p className="text-sm font-mono text-white bg-slate-950 p-3 rounded-xl border border-slate-800 mt-1">{this.state.error?.message || "Unknown Error"}</p>
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-500 uppercase">Component Stack</p>
                   <div className="text-[10px] font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap">
                      {this.state.errorInfo?.componentStack || "No stack trace available."}
                   </div>
                </div>
             </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="px-8 py-4 bg-white text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-colors">
              Restart Engine
            </button>
            <button onClick={() => this.setState({ hasError: false })} className="px-8 py-4 bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-700 transition-colors">
              Try Recovering
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const formatKSh = (val, short = true) => {
  if (val === null || val === undefined || isNaN(val)) return 'Data Not Available';
  if (short) {
    if (val >= 1e12) return `KSh ${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `KSh ${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `KSh ${(val / 1e6).toFixed(1)}M`;
  }
  return `KSh ${val.toLocaleString()}`;
};

export const VerificationModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;
  const status = data.status || STATUS.UNVERIFIED;
  const Icon = status.icon || ShieldQuestion;
  
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-8">
          <div className={`p-3 rounded-2xl ${status.bg || 'bg-slate-800'} ${status.color || 'text-slate-400'}`}><Icon size={24} /></div>
          <div><h3 className="text-xl font-black text-white tracking-tight uppercase leading-none">{status.label || 'Data Report'}</h3><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Data Audit Trail</p></div>
        </div>
        <div className="space-y-6">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Source Authority</p>
            <p className="text-sm font-black text-white">{data.src?.name || 'Fact-Checked Official'}</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
            <div><p className="text-[9px] font-black text-slate-500 uppercase mb-1">Confidence</p><p className="text-xs font-black text-emerald-500 uppercase">{status.confidence || 'N/A'}</p></div>
            <div className="text-right"><p className="text-[9px] font-black text-slate-500 uppercase mb-1">Last Update</p><p className="text-xs font-black text-slate-300 uppercase">{data.src?.lastUpdated || 'June 2026'}</p></div>
          </div>
          {data.note && <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl italic text-[11px] text-slate-400">"{data.note}"</div>}
        </div>
        <button onClick={onClose} className="w-full mt-10 py-4 bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-colors">Close Report</button>
      </div>
    </div>
  );
};

export const DataBadge = ({ status, src, note }) => {
  const [open, setOpen] = useState(false);
  const safeStatus = status || STATUS.UNVERIFIED;
  const Icon = safeStatus.icon || ShieldQuestion;
  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); setOpen(true); }} className={`flex items-center gap-1.5 ${safeStatus.bg} ${safeStatus.color} ${safeStatus.border} border px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter hover:ring-2 hover:ring-slate-700 transition-all`}>
        <Icon size={10} /> {safeStatus.label}
      </button>
      <VerificationModal isOpen={open} onClose={() => setOpen(false)} data={{ status: safeStatus, src, note }} />
    </>
  );
};

export const SectionHeader = ({ title, sub, q }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-2"><span className="h-px w-8 bg-cyan-500"></span><span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">{q || 'REPORT'}</span></div>
    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">{title || 'Data Not Available'}</h2>
    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">{sub || 'Awaiting synchronization.'}</p>
  </div>
);

export const Explanation = ({ body }) => {
  if (!body) return null;
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl mt-4">
      <div className="flex items-center gap-2 mb-2 text-cyan-500"><HelpCircle size={16} /><span className="text-[10px] font-black uppercase tracking-widest">What does this mean?</span></div>
      <p className="text-xs text-slate-400 leading-relaxed font-medium tracking-tight uppercase">{body}</p>
    </div>
  );
};
