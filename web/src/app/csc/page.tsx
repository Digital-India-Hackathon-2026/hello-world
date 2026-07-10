"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Printer } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ULPINInput } from "@/components/ULPINInput";
import { StatusBadge } from "@/components/StatusBadge";
import { PageTransition } from "@/components/PageTransition";
import { getParcel } from "@/lib/data";
import { formatULPIN, normalizeULPIN } from "@/lib/utils";

const LANGS = [
  { code: "te", label: "తెలుగు" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
];

const MESSAGES: Record<string, { verified: string; owner: string }> = {
  te: { verified: "ధృవీకరించబడింది", owner: "యజమాని" },
  hi: { verified: "सत्यापित", owner: "मालिक" },
  en: { verified: "Verified", owner: "Owner" },
};

export default function CSCPage() {
  const [lang, setLang] = useState("te");
  const [step, setStep] = useState(1);
  const [segments, setSegments] = useState(["", "", "", ""]);
  const [aadhaar, setAadhaar] = useState("");
  const [parcel, setParcel] = useState<ReturnType<typeof getParcel>>(null);

  const handleVerify = (ulpin: string) => {
    setParcel(getParcel(normalizeULPIN(ulpin)));
    setStep(3);
  };

  const msg = MESSAGES[lang];

  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Navbar />
      <PageHeader
        title="CSC BhumiKiosk"
        hindiTitle="सीएससी भूमि कियोस्क"
        subtitle="Common Service Centre assisted land verification — vernacular support for rural citizens"
        breadcrumbs={[{ label: "Portals", href: "/csc" }, { label: "CSC Kiosk" }]}
      />

      <main id="main-content" className="flex-1">
        <PageTransition>
          <section className="py-10 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gov-muted">Select language / भाषा चुनें</p>
                <div className="flex gap-1">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`px-3 py-1.5 rounded-btn text-sm font-medium transition-colors ${
                        lang === l.code
                          ? "bg-gov-blue text-white"
                          : "bg-white border border-gov-border text-gov-muted hover:border-gov-blue"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex gap-2 mb-6" aria-label="Progress">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      step >= s ? "bg-gov-blue" : "bg-gov-border"
                    }`}
                  />
                ))}
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="gov-card-elevated p-6 md:p-8"
                >
                  <h2 className="text-lg font-bold text-gov-navy mb-1">Step 1: Citizen Aadhaar Authentication</h2>
                  <p className="text-gov-muted text-sm mb-6">
                    Operator-assisted authentication. Aadhaar number is not stored on BhumiTrust.
                  </p>
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
                    placeholder="XXXX XXXX XXXX"
                    aria-label="Aadhaar number"
                    className="gov-input text-xl font-mono text-center tracking-widest py-4"
                  />
                  <button
                    onClick={() => setStep(2)}
                    disabled={aadhaar.length !== 12}
                    className="gov-btn-primary w-full mt-6 py-3 text-base disabled:opacity-40"
                  >
                    Send OTP
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="gov-card-elevated p-6 md:p-8"
                >
                  <h2 className="text-lg font-bold text-gov-navy mb-6">Step 2: Enter ULPIN</h2>
                  <ULPINInput value={segments} onChange={setSegments} onComplete={handleVerify} size="large" />
                </motion.div>
              )}

              {step === 3 && parcel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="gov-card-elevated p-6 md:p-8 border-gov-green/40"
                >
                  <StatusBadge status="verified" className="mb-4" />
                  <h2 className="text-2xl font-bold text-gov-green">{msg.verified}</h2>
                  <p className="font-mono mt-2 text-gov-blue">{formatULPIN(parcel.ulpin)}</p>

                  <div className="mt-6 space-y-3">
                    <p><span className="text-gov-muted">{msg.owner}:</span> <strong>{parcel.owners[0]?.name}</strong></p>
                    <p><span className="text-gov-muted">Area:</span> <strong>{parcel.area}</strong></p>
                    <p><span className="text-gov-muted">Status:</span> <strong>{parcel.hasLien ? "Lien Active" : "No encumbrance"}</strong></p>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button className="gov-btn-primary flex items-center gap-2 flex-1 justify-center py-3">
                      <Printer className="w-5 h-5" /> Print TrustSeal
                    </button>
                    <button className="gov-btn-secondary px-4" aria-label="Read aloud">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => { setStep(1); setParcel(null); setSegments(["", "", "", ""]); }}
                    className="w-full mt-4 text-gov-muted text-sm hover:text-gov-blue"
                  >
                    Start New Verification
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
