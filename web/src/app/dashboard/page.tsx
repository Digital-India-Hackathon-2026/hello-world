"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FraudFeed } from "@/components/FraudFeed";
import { FraudMap } from "@/components/FraudMap";
import { CyberMarquee } from "@/components/CyberMarquee";
import { bhumiApi } from "@/lib/api-client";
import { Activity, Shield, Target, Database } from "lucide-react";

export default function DashboardPage() {
  const [mode, setMode] = useState("simulator");
  const [parcelCount, setParcelCount] = useState(0);
  const [transferCount, setTransferCount] = useState(0);

  useEffect(() => {
    bhumiApi.getChainMode().then((m) => setMode(m.mode)).catch(() => {});
    bhumiApi.getParcels().then((p) => setParcelCount(p.length)).catch(() => {});
    bhumiApi.getTransfers(undefined, "REGISTRAR").then((t) => setTransferCount(t.length)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-300">
      <Navbar />
      <CyberMarquee />
      
      <main id="main-content" className="flex-1 py-6 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-2xl font-mono font-bold text-slate-100 flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-500" />
                COMMAND CENTER // REGISTRAR
              </h1>
              <p className="font-mono text-xs text-red-500/70 mt-1 uppercase tracking-widest">Global Threat Intelligence & Asset Monitoring</p>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="px-3 py-1 bg-green-500/10 text-green-400 font-mono text-xs border border-green-500/30 rounded">SYS_ONLINE</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 font-mono text-xs border border-slate-700 rounded">AUTH_VERIFIED</span>
            </div>
          </div>

          {/* Cyber Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "NETWORK MODE", value: mode.toUpperCase(), icon: Activity, color: "text-cyan-400" },
              { label: "SECURED PARCELS", value: String(parcelCount), icon: Database, color: "text-green-400" },
              { label: "PENDING ESCROW", value: String(transferCount), icon: Target, color: "text-amber-400" },
              { label: "CHAIN ID", value: "11155111", icon: Shield, color: "text-slate-400" },
            ].map((k) => (
              <div key={k.label} className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-md p-5 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <k.icon className={`w-5 h-5 absolute top-4 right-4 opacity-20 ${k.color}`} />
                <p className={`text-3xl font-mono font-bold tracking-tighter ${k.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]`}>
                  {k.value}
                </p>
                <p className="text-[10px] font-mono text-slate-500 mt-2 tracking-widest">{k.label}</p>
              </div>
            ))}
          </div>

          {/* Main Console */}
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col min-h-[600px] border border-slate-800 bg-slate-900/50 rounded-md overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
              <FraudMap />
            </div>
            
            <div className="lg:col-span-4 border border-slate-800 bg-slate-900/50 rounded-md p-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="font-mono text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  LIVE THREAT FEED
                </h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <FraudFeed refreshMs={4000} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
