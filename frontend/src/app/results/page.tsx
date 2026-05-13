"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TopNav from "@/components/layout/TopNav";
import PageHeader from "@/components/ui/PageHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import GlowButton from "@/components/ui/GlowButton";
import FeedbackCard from "@/components/sharks/FeedbackCard";
import OfferCard from "@/components/sharks/OfferCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";

export default function ResultsPage() {
  const router = useRouter();
  const { pitch, feedback, loadingFeedback } = usePitchPilotStore();

  useEffect(() => {
    if (!pitch) router.replace("/pitch");
  }, [pitch, router]);

  if (loadingFeedback) {
    return (
      <>
        <TopNav />
        <main className="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto">
          <LoadingScreen
            message="SHARKS ARE DELIBERATING..."
            subMessage="Evaluating your responses and preparing offers"
          />
        </main>
      </>
    );
  }

  if (!pitch || feedback.length === 0) return null;

  const investing = feedback.filter((f) => f.offer.investing);
  const maxConf = Math.max(...investing.map((f) => f.confidence), 0);

  return (
    <>
      <TopNav />
      <main className="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <PageHeader
          eyebrow="04 / FUNDING DECISIONS"
          title="Investor Offers"
          subtitle="AI Sharks have evaluated your startup and made their funding decisions based on your responses."
        />

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            {
              label: "SHARKS INVESTING",
              value: investing.length,
              color: "#10b981",
            },
            {
              label: "SHARKS PASSING",
              value: feedback.length - investing.length,
              color: "#f43f5e",
            },
            {
              label: "TOTAL ASKS",
              value: `₹${investing.reduce((a, f) => a + f.offer.amount, 0)}L`,
              color: "#f59e0b",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl glass-panel text-center"
              style={{ borderColor: `${stat.color}20` }}
            >
              <div
                className="font-orbitron text-3xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div
                className="font-mono text-[10px] tracking-[2px] mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Investor Feedback */}
        <SectionTitle>🦈 SHARK EVALUATIONS</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {feedback.map((fb, i) => (
            <FeedbackCard key={fb.id} feedback={fb} index={i} />
          ))}
        </div>

        {/* Offers */}
        <SectionTitle>💰 FUNDING OFFERS</SectionTitle>
        {investing.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {investing.map((fb, i) => (
              <OfferCard
                key={fb.id}
                feedback={fb}
                isTop={fb.confidence === maxConf}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 rounded-xl glass-panel mb-10"
          >
            <div className="text-4xl mb-3">😤</div>
            <div
              className="font-orbitron text-sm tracking-[2px] mb-2"
              style={{ color: "var(--neon-rose)" }}
            >
              NO OFFERS — YET
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Head to negotiation to change their minds.
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center mt-4">
          <GlowButton variant="secondary" onClick={() => router.push("/investors")}>
            ← BACK TO SHARKS
          </GlowButton>
          <GlowButton onClick={() => router.push("/negotiation")}>
            ENTER NEGOTIATION ROOM →
          </GlowButton>
        </div>
      </main>
    </>
  );
}
