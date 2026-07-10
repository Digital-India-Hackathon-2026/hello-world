"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, FileText } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ULPINInput } from "@/components/ULPINInput";
import { PageTransition } from "@/components/PageTransition";
import { getParcel } from "@/lib/data";
import { formatULPIN, normalizeULPIN } from "@/lib/utils";

export default function DisputePage() {
  const [segments, setSegments] = useState(["", "", "", ""]);
  const [filed, setFiled] = useState(false);
  const [grounds, setGrounds] = useState("");

  const handleFile = () => {
    const parcel = getParcel(normalizeULPIN(segments.join("")));
    if (parcel) setFiled(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Navbar />
      <PageHeader
        title="NyaySetu — File Land Dispute"
        hindiTitle="न्यायसेतु — भूमि विवाद दर्ज करें"
        subtitle="Justice Bridge for court-ready evidence bundles and on-chain parcel freeze"
        breadcrumbs={[{ label: "File Dispute" }]}
      />

      <main id="main-content" className="flex-1">
        <PageTransition>
          <section className="py-10 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              {!filed ? (
                <div className="gov-card-elevated p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gov-border">
                    <Scale className="w-8 h-8 text-gov-blue" />
                    <div>
                      <p className="font-semibold text-gov-navy">Dispute Filing Form</p>
                      <p className="text-sm text-gov-muted">Integrated with e-Courts NJDG system</p>
                    </div>
                  </div>

                  <p className="metric-label mb-4">Parcel ULPIN</p>
                  <ULPINInput value={segments} onChange={setSegments} />

                  <div className="mt-6">
                    <label className="metric-label" htmlFor="grounds">Grounds for Dispute</label>
                    <textarea
                      id="grounds"
                      value={grounds}
                      onChange={(e) => setGrounds(e.target.value)}
                      rows={4}
                      placeholder="Describe the nature of dispute (e.g., ancestral ownership claim)..."
                      className="gov-input mt-2 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleFile}
                    disabled={segments.join("").length !== 14}
                    className="gov-btn-primary mt-6 disabled:opacity-40"
                  >
                    File Dispute & Freeze Parcel
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="gov-card p-6 md:p-8 border-purple-200 bg-purple-50"
                >
                  <Scale className="w-12 h-12 text-purple-700 mb-4" />
                  <h2 className="text-xl font-bold text-purple-900">Dispute Filed — Parcel Frozen</h2>
                  <p className="text-purple-700 mt-2 text-sm">ULPIN: {formatULPIN(segments.join(""))}</p>

                  <div className="mt-6 space-y-3 bg-white rounded-card p-4 border border-purple-100">
                    <p><span className="text-gov-muted">Dispute Ref:</span> <strong>D-2026-001</strong></p>
                    <p><span className="text-gov-muted">e-Courts Case:</span> <strong>NJDG-TS-2026-12345</strong></p>
                    <p><span className="text-gov-muted">Evidence Bundle:</span> <strong>EVD-2026-001</strong></p>
                    <p><span className="text-gov-muted">Parcel Status:</span> <strong className="text-purple-700">Frozen on-chain</strong></p>
                  </div>

                  <button className="gov-btn-primary mt-6 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> View Evidence Bundle (IT Act s.65B)
                  </button>
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
