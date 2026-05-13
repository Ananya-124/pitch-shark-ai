"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TopNav from "@/components/layout/TopNav";
import PageHeader from "@/components/ui/PageHeader";
import GlowButton from "@/components/ui/GlowButton";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";
import { analyzeStartup } from "@/services/api";
import { getMockAnalysis } from "@/data/mockData";
import type { PitchData } from "@/types";

const FIELDS = [
  { id: "name", label: "STARTUP NAME", placeholder: "e.g. NeuroSync AI", span: 1 },
  { id: "domain", label: "DOMAIN / SECTOR", placeholder: "e.g. HealthTech, FinTech, EdTech", span: 1 },
  { id: "problem", label: "PROBLEM STATEMENT", placeholder: "What critical problem does your startup solve?", textarea: true, span: 2 },
  { id: "solution", label: "SOLUTION", placeholder: "How does your product/service solve it uniquely?", textarea: true, span: 2 },
  { id: "audience", label: "TARGET AUDIENCE", placeholder: "e.g. SMEs, Gen-Z consumers, Enterprise CIOs", span: 1 },
  { id: "model", label: "BUSINESS MODEL", placeholder: "e.g. SaaS, Marketplace, B2B subscription", span: 1 },
  { id: "competitors", label: "MAIN COMPETITORS", placeholder: "e.g. Salesforce, HubSpot, Zoho", span: 1 },
  { id: "ask", label: "FUNDING ASK (₹ Lakhs)", placeholder: "e.g. 50", type: "number", span: 1 },
] as const;

export default function PitchPage() {
  const router = useRouter();
  const { setPitch, setAnalysis, setLoading, loadingAnalysis } = usePitchPilotStore();
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const update = (id: string, val: string) => {
    setForm((p) => ({ ...p, [id]: val }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: false }));
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    FIELDS.forEach((f) => {
      if (!form[f.id]?.trim()) newErrors[f.id] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const pitch: PitchData = {
      name: form.name,
      domain: form.domain,
      problem: form.problem,
      solution: form.solution,
      audience: form.audience,
      model: form.model,
      competitors: form.competitors,
      ask: form.ask,
    };
    setPitch(pitch);
    setLoading("analysis", true);

    try {
      const result = await analyzeStartup(pitch);
      setAnalysis(result);
    } catch {
      setAnalysis(getMockAnalysis(pitch.name));
    } finally {
      setLoading("analysis", false);
    }

    router.push("/analysis");
  };

  return (
    <>
      <TopNav />
      <main className="relative z-10 pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <PageHeader
          eyebrow="01 / STARTUP SUBMISSION"
          title="Submit Your Pitch"
          subtitle="Fill in your startup details. Our AI will analyze, score, and simulate investor reactions across 4 dimensions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FIELDS.map((field, i) => {
            const isTextarea = "textarea" in field && field.textarea;
            const isFullWidth = field.span === 2;
            const hasError = errors[field.id];

            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={isFullWidth ? "md:col-span-2" : ""}
              >
                <label
                  className="block font-mono text-[11px] tracking-[2px] uppercase mb-1.5"
                  style={{ color: hasError ? "var(--neon-rose)" : "var(--neon-cyan)" }}
                >
                  {field.label}
                  {hasError && (
                    <span className="ml-2 text-neon-rose">— required</span>
                  )}
                </label>

                {field.id === "ask" ? (
                  <div className="flex gap-2 items-center">
                    <div
                      className="font-orbitron text-sm px-4 py-3 rounded-lg border"
                      style={{
                        color: "var(--neon-amber)",
                        borderColor: "rgba(245,158,11,0.25)",
                        background: "rgba(245,158,11,0.05)",
                      }}
                    >
                      ₹
                    </div>
                    <input
                      type="number"
                      placeholder={field.placeholder}
                      value={form[field.id] || ""}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="pitch-input flex-1"
                      style={hasError ? { borderColor: "var(--neon-rose)" } : {}}
                      min={1}
                    />
                  </div>
                ) : isTextarea ? (
                  <textarea
                    placeholder={field.placeholder}
                    value={form[field.id] || ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    rows={3}
                    className="pitch-input resize-y"
                    style={hasError ? { borderColor: "var(--neon-rose)" } : {}}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.id] || ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="pitch-input"
                    style={hasError ? { borderColor: "var(--neon-rose)" } : {}}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end mt-8"
        >
          <GlowButton
            onClick={handleSubmit}
            disabled={loadingAnalysis}
            size="lg"
          >
            {loadingAnalysis ? "ANALYZING..." : "ANALYZE MY STARTUP →"}
          </GlowButton>
        </motion.div>
      </main>
    </>
  );
}
