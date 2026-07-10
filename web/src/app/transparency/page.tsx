"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/PageTransition";
import { FraudMap } from "@/components/FraudMap";
import { FraudFeed } from "@/components/FraudFeed";
import { TRANSPARENCY_DATA } from "@/lib/data";

export default function TransparencyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Navbar />
      <PageHeader
        title="BhumiTransparency Index"
        hindiTitle="भूमि पारदर्शिता सूचकांक"
        subtitle="Public district governance scoreboard — accountability for collectors and citizens"
        breadcrumbs={[{ label: "Transparency Index" }]}
      />

      <main id="main-content" className="flex-1 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="gov-table">
                <thead>
                  <tr>
                    {["Rank", "District", "State", "Score", "On-Chain %", "Avg Verify", "Disputes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRANSPARENCY_DATA.map((d, i) => (
                    <motion.tr
                      key={d.district}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <td>
                        <span className={`text-lg font-bold ${d.rank === 1 ? "text-gov-saffron" : "text-gov-navy"}`}>
                          #{d.rank}
                        </span>
                      </td>
                      <td className="font-semibold">{d.district}</td>
                      <td className="text-gov-muted">{d.state}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-gov-blue">{d.score}</span>
                          <div className="w-16 h-2 bg-gov-border rounded-full overflow-hidden">
                            <div className="h-full bg-gov-blue rounded-full" style={{ width: `${d.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>{d.onChainPct}%</td>
                      <td>{d.avgVerifySec}s</td>
                      <td>{d.disputes}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <FadeIn delay={0.35}>
            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <FraudMap />
              <div>
                <h3 className="font-semibold text-gov-navy mb-3">Active Fraud Alerts</h3>
                <FraudFeed />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="gov-card p-6 mt-8">
              <h3 className="font-semibold text-gov-navy mb-3">Score Calculation Methodology</h3>
              <p className="text-gov-muted text-sm font-mono bg-gov-grey p-3 rounded-btn">
                score = on_chain% × 0.30 + verify_speed × 0.30 + fraud_resolved × 0.20 + mutation_sync × 0.20
              </p>
              <p className="text-xs text-gov-muted mt-3">
                Published quarterly. Data sourced from State Revenue Departments and BhumiTrust permissioned network.
              </p>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
