import { AlertTriangle, Activity, ShieldAlert } from "lucide-react";

export function CyberMarquee() {
  return (
    <div className="bg-red-950/80 border-y border-red-500/50 text-red-400 py-1.5 flex overflow-hidden whitespace-nowrap text-sm font-mono tracking-widest relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
      
      <div className="animate-marquee flex items-center gap-12 shrink-0">
        <span className="flex items-center gap-2"><Activity size={16} /> SYSTEM NOMINAL</span>
        <span className="flex items-center gap-2"><ShieldAlert size={16} /> BHUSHIELD AI SCANNERS ACTIVE</span>
        <span className="flex items-center gap-2"><AlertTriangle size={16} /> MONITORING STATE-WIDE TRANSFERS</span>
        <span className="flex items-center gap-2"><Activity size={16} /> BLOCKCHAIN SYNCED</span>
        
        {/* Repeat for seamless loop */}
        <span className="flex items-center gap-2"><Activity size={16} /> SYSTEM NOMINAL</span>
        <span className="flex items-center gap-2"><ShieldAlert size={16} /> BHUSHIELD AI SCANNERS ACTIVE</span>
        <span className="flex items-center gap-2"><AlertTriangle size={16} /> MONITORING STATE-WIDE TRANSFERS</span>
        <span className="flex items-center gap-2"><Activity size={16} /> BLOCKCHAIN SYNCED</span>
      </div>
    </div>
  );
}
