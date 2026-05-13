"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TopNav from "@/components/layout/TopNav";
import PageHeader from "@/components/ui/PageHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import GlowButton from "@/components/ui/GlowButton";
import MetricCard from "@/components/ui/MetricCard";
import ScoreRing from "@/components/analysis/ScoreRing";
import SwotGrid from "@/components/analysis/SwotGrid";
import SectionTitle from "@/components/ui/SectionTitle";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";

const RISK_COLOR: Record<string, string> = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#f43f5e",
  "Very High": "#c026d3",
};

const POT_COLOR: Record<string, string> = {
  Low: "#f43f5e",
  Medium: "#f59e0b",
  High: "#10b981",
  "Very High": "#00f5ff",
};

export default function AnalysisPage() {
  const router = useRouter();
  const { pitch, analysis, loadingAnalysis } = usePitchPilotStore();

  useEffect(() => {
    if (!pitch && !loadingAnalysis) router.replace("/pitch");
  }, [pitch, loadingAnalysis, router]);

  if (loadingAnalysis) {
    return (
      <>
        <TopNav />
        <main className="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto">
          <LoadingScreen
            message="ANALYZING YOUR STARTUP..."
            subMessage="Running venture intelligence algorithms"
          />
        </main>
      </>
    );
  }

  if (!analysis || !pitch) return null;

  return (
    <>
      <TopNav />
      <main className="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <PageHeader
          eyebrow="02 / VENTURE ANALYSIS"
          title={pitch.name}
          subtitle={analysis.summary}
        />

        {/* Score hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center gap-8 mb-10 p-8 rounded-2xl glass-panel"
          style={{ borderColor: "rgba(0,245,255,0.15)" }}
        >
          <ScoreRing score={analysis.score} />
          <div className="flex-1 text-center sm:text-left">
            <h2
              className="font-orbitron text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {pitch.name}
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {analysis.recommendation}
            </p>
            <div
              className="font-mono text-[12px] tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {pitch.domain} &nbsp;·&nbsp; ₹{pitch.ask}L ASK &nbsp;·&nbsp;{" "}
              {pitch.model}
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <SectionTitle>KEY METRICS</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MetricCard
            label="Risk Level"
            value={analysis.risk_level}
            accentColor={RISK_COLOR[analysis.risk_level] || "#f59e0b"}
            delay={0.05}
          />
          <MetricCard
            label="Market Potential"
            value={analysis.market_potential}
            accentColor={POT_COLOR[analysis.market_potential] || "#10b981"}
            delay={0.1}
          />
          <MetricCard
            label="Invest. Probability"
            value={`${analysis.investment_probability}%`}
            accentColor="#8b5cf6"
            showBar
            barValue={analysis.investment_probability}
            delay={0.15}
          />
          <MetricCard
            label="Scalability"
            value={`${analysis.scalability_score}%`}
            accentColor="#00f5ff"
            showBar
            barValue={analysis.scalability_score}
            delay={0.2}
          />
        </div>

        {/* Scalability note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-8 p-5 rounded-xl border"
          style={{
            borderColor: "rgba(0,245,255,0.12)",
            background: "rgba(0,245,255,0.03)",
          }}
        >
          <div
            className="font-mono text-[10px] tracking-[2px] uppercase mb-2"
            style={{ color: "var(--neon-cyan)" }}
          >
            SCALABILITY ASSESSMENT
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {analysis.scalability_note}
          </p>
        </motion.div>

        {/* SWOT */}
        <SectionTitle>SWOT ANALYSIS</SectionTitle>
        <div className="mb-10">
          <SwotGrid swot={analysis.swot} />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8">
          <GlowButton variant="secondary" onClick={() => router.push("/pitch")}>
            ← EDIT PITCH
          </GlowButton>
          <GlowButton onClick={() => router.push("/investors")}>
            MEET AI SHARKS →
          </GlowButton>
        </div>
      </main>
    </>
  );
}
