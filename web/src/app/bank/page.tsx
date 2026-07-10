"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ULPINInput } from "@/components/ULPINInput";
import { StatusBadge } from "@/components/StatusBadge";
import { PageTransition } from "@/components/PageTransition";
import { getParcel } from "@/lib/data";
import { formatULPIN, normalizeULPIN } from "@/lib/utils";

export default function BankPage() {
  const [segments, setSegments] = useState(["", "", "", ""]);
  const [result, setResult] = useState<ReturnType<typeof getParcel>>(null);
  const [lienActive, setLienActive] = useState(false);

  const handleCheck = (ulpin: string) => {
    const parcel = getParcel(normalizeULPIN(ulpin));
    setResult(parcel);
    setLienActive(parcel?.hasLien ?? false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Navbar />
      <PageHeader
        title="Bank Collateral Portal"
        hindiTitle="बैंक संपार्श्विक पोर्टल"
        subtitle="LienLock Protocol — real-time collateral verification and lien registration for financial institutions"
        breadcrumbs={[{ label: "Portals", href: "/bank" }, { label: "Bank Portal" }]}
      />

      <main id="main-content" className="flex-1">
        <PageTransition>
          <section className="py-10 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="gov-notice mb-6">
                <strong>Authorized Access.</strong> For registered banks and NBFCs integrated with BhumiTrust LienLock Protocol.
              </div>

              <div className="gov-card-elevated p-6 md:p-8 mb-6">
                <p className="metric-label mb-4">ULPIN Collateral Lookup</p>
                <ULPINInput value={segments} onChange={setSegments} onComplete={handleCheck} />
                <p className="text-xs text-gov-muted mt-4">Demo: 29KA0482017453 (active lien)</p>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="gov-card-elevated p-6 md:p-8"
                >
                  <div className="flex justify-between items-start mb-6 pb-4 border-b border-gov-border">
                    <div>
                      <p className="font-mono font-bold text-gov-blue">{formatULPIN(result.ulpin)}</p>
                      <p className="text-gov-muted mt-1 text-sm">{result.owners[0]?.name}</p>
                    </div>
                    <StatusBadge status={result.hasLien ? "blocked" : "verified"} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="metric-label">Area</p>
                      <p className="metric-value">{result.area}</p>
                    </div>
                    <div>
                      <p className="metric-label">Liens</p>
                      <p className="metric-value">{result.hasLien ? "Active" : "Clear"}</p>
                    </div>
                    <div>
                      <p className="metric-label">Disputes</p>
                      <p className="metric-value">{result.hasDispute ? "Active" : "None"}</p>
                    </div>
                    <div>
                      <p className="metric-label">On-Chain</p>
                      <p className="metric-value">{result.onChain ? "Confirmed" : "Pending"}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <button className="gov-btn-primary flex items-center gap-2 text-sm">
                      <Download className="w-4 h-4" /> Download TrustSeal
                    </button>
                    {!lienActive ? (
                      <button
                        onClick={() => setLienActive(true)}
                        className="gov-btn-secondary flex items-center gap-2 text-sm"
                      >
                        <Lock className="w-4 h-4" /> Register Lien
                      </button>
                    ) : (
                      <button
                        onClick={() => setLienActive(false)}
                        className="gov-btn-saffron flex items-center gap-2 text-sm"
                      >
                        <Unlock className="w-4 h-4" /> Release Lien (NOC)
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
