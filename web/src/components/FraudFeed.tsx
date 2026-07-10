"use client";

import { useEffect, useState } from "react";
import type { FraudAlert } from "@/lib/types";
import { bhumiApi } from "@/lib/api-client";
import { AlertTriangle, Terminal, ShieldAlert } from "lucide-react";

export function FraudFeed({ refreshMs = 5000 }: { refreshMs?: number }) {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);

  useEffect(() => {
    const load = () => bhumiApi.getFraudAlerts().then(setAlerts).catch(() => {});
    load();
    const id = setInterval(load, refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);

  if (alerts.length === 0) {
    return (
      <div className="bg-black/40 border border-green-500/30 rounded-card p-6 text-sm text-green-500/70 text-center font-mono flex flex-col items-center gap-3">
        <Terminal className="w-8 h-8 opacity-50" />
        <p>NO ACTIVE THREATS DETECTED</p>
        <p className="text-xs opacity-50 animate-pulse">Awaiting incoming signals...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-mono">
      {alerts.map((a) => (
        <div
          key={a.id}
          className={`relative overflow-hidden rounded-md border p-4 ${
            a.severity === "HIGH"
              ? "border-red-500/50 bg-red-950/30 text-red-400"
              : a.severity === "MED"
              ? "border-amber-500/50 bg-amber-950/30 text-amber-400"
              : "border-cyan-500/50 bg-cyan-950/30 text-cyan-400"
          }`}
        >
          {/* Cyber scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] animate-scan pointer-events-none opacity-20" />
          
          <div className="flex items-start gap-3 relative z-10">
            {a.severity === "HIGH" ? (
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse-fast" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            
            <div className="w-full">
              <div className="flex justify-between items-start border-b border-current/20 pb-1 mb-2">
                <p className="font-bold tracking-wider text-xs uppercase">
                  [ {a.type.replace(/_/g, " ")} ]
                </p>
                <p className="text-xs opacity-60">TARGET: PRCL-{a.parcelId}</p>
              </div>
              <p className="text-sm">{a.detail}</p>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-current/10">
                <p className="text-[10px] opacity-50">
                  SYS_TIME: {new Date(a.createdAt).getTime()}
                </p>
                <p className="text-[10px] uppercase opacity-70">
                  <span className="inline-block w-2 h-2 rounded-full bg-current mr-1 animate-pulse" />
                  {a.severity} THREAT
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
