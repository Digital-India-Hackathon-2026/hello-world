"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/PageTransition";
import { FEATURES } from "@/lib/data";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Navbar />
      <PageHeader
        title="Services & Features"
        hindiTitle="सेवाएं और विशेषताएं"
        subtitle="10 India-specific capabilities that strengthen land governance beyond generic blockchain registry"
        breadcrumbs={[{ label: "Services" }]}
      />

      <main id="main-content" className="flex-1 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="gov-disclaimer mb-8">
            All services complement existing DILRMP land records maintained by State Revenue Departments.
            BhumiTrust provides a tamper-evident verification and fraud-prevention layer only.
          </div>

          <div className="space-y-4">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.id} delay={i * 0.04}>
                <div className="gov-card p-5 md:p-6 flex flex-col md:flex-row md:items-start gap-4 hover:border-gov-blue transition-colors">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gov-blue text-white font-bold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-gov-saffron font-semibold uppercase tracking-wide">{f.subtitle}</p>
                    <h3 className="text-lg font-bold text-gov-navy mt-1">{f.title}</h3>
                    <p className="text-gov-muted mt-2 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
