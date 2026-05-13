"use client";
import { motion } from "framer-motion";
import type { SharkFeedback } from "@/types";
import { SHARK_MAP } from "@/data/sharks";

interface OfferCardProps {
  feedback: SharkFeedback;
  isTop?: boolean;
  index?: number;
}

export default function OfferCard({
  feedback,
  isTop = false,
  index = 0,
}: OfferCardProps) {
  const shark = SHARK_MAP[feedback.id];
  const valuation = Math.round(
    (feedback.offer.amount / feedback.offer.equity) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.45 }}
      className="relative rounded-2xl p-8 text-center glass-panel overflow-hidden"
      style={{
        borderColor: isTop ? "#f59e0b" : `${shark.color}20`,
        boxShadow: isTop ? "0 0 40px rgba(245,158,11,0.15)" : undefined,
      }}
    >
      {/* Top offer ribbon */}
      {isTop && (
        <div className="absolute top-0 left-0 right-0 overflow-hidden h-12 pointer-events-none">
          <div
            className="absolute top-3 right-[-32px] bg-neon-amber text-black font-orbitron text-[8px] tracking-[2px] font-bold py-1 px-10"
            style={{ transform: "rotate(45deg)" }}
          >
            TOP OFFER
          </div>
        </div>
      )}

      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
          style={{
            background: `${shark.color}15`,
            borderColor: `${shark.color}40`,
          }}
        >
          {shark.emoji}
        </div>
      </div>

      {/* Shark name */}
      <div
        className="font-orbitron text-[11px] tracking-[2px] mb-3"
        style={{ color: shark.color }}
      >
        {shark.name}
      </div>

      {/* Amount */}
      <motion.div
        className="font-orbitron text-4xl font-black mb-1"
        style={{ color: shark.color }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.3 }}
      >
        ₹{feedback.offer.amount}L
      </motion.div>

      {/* Equity */}
      <div className="font-mono text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
        for{" "}
        <strong className="text-[var(--text-primary)]">
          {feedback.offer.equity}%
        </strong>{" "}
        equity
      </div>

      {/* Valuation */}
      <div
        className="font-mono text-[11px] tracking-wide"
        style={{ color: "var(--text-muted)" }}
      >
        Implied Valuation: ₹{valuation}L
      </div>

      {/* Confidence */}
      <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: shark.color }}
          initial={{ width: 0 }}
          animate={{ width: `${feedback.confidence}%` }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
        />
      </div>
      <div
        className="font-mono text-[10px] tracking-widest mt-1.5"
        style={{ color: "var(--text-muted)" }}
      >
        {feedback.confidence}% CONVICTION
      </div>
    </motion.div>
  );
}
