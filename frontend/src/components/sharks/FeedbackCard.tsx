"use client";
import { motion } from "framer-motion";
import type { SharkFeedback } from "@/types";
import { SHARK_MAP } from "@/data/sharks";

const REACTION_COLORS: Record<string, string> = {
  Impressed: "#10b981",
  Interested: "#00f5ff",
  Excited: "#8b5cf6",
  Cautious: "#f59e0b",
  Skeptical: "#f43f5e",
};

interface FeedbackCardProps {
  feedback: SharkFeedback;
  index: number;
}

export default function FeedbackCard({ feedback, index }: FeedbackCardProps) {
  const shark = SHARK_MAP[feedback.id];
  const rc = REACTION_COLORS[feedback.reaction] || "#888";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      className="rounded-2xl p-6 glass-panel"
      style={{ "--shark-color": shark.color } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 flex-shrink-0"
          style={{ background: `${shark.color}15`, borderColor: `${shark.color}40` }}
        >
          {shark.emoji}
        </div>
        <div>
          <div className="font-orbitron text-[13px]" style={{ color: shark.color }}>
            {shark.name}
          </div>
          <span
            className="font-mono text-[10px] tracking-wide px-2.5 py-0.5 rounded-full border mt-1 inline-block"
            style={{
              color: rc,
              background: `${rc}18`,
              borderColor: `${rc}40`,
            }}
          >
            {feedback.reaction.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--text-muted)" }}>
            CONFIDENCE
          </span>
          <span className="font-mono text-[11px]" style={{ color: shark.color }}>
            {feedback.confidence}%
          </span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: shark.color }}
            initial={{ width: 0 }}
            animate={{ width: `${feedback.confidence}%` }}
            transition={{ delay: index * 0.1 + 0.4, duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Comment */}
      <p
        className="text-[13px] leading-relaxed border-l-2 pl-3 mb-4"
        style={{ color: "var(--text-secondary)", borderColor: shark.color }}
      >
        {feedback.comment}
      </p>

      {/* Strengths + Concerns */}
      <div className="grid grid-cols-2 gap-3 text-[12px]">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-neon-emerald mb-2">
            STRENGTHS
          </div>
          {feedback.strengths.map((s, i) => (
            <div key={i} className="flex gap-1.5 mb-1" style={{ color: "var(--text-secondary)" }}>
              <span className="text-neon-emerald text-[10px] mt-0.5">▸</span>
              {s}
            </div>
          ))}
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest text-neon-rose mb-2">
            CONCERNS
          </div>
          {feedback.concerns.map((c, i) => (
            <div key={i} className="flex gap-1.5 mb-1" style={{ color: "var(--text-secondary)" }}>
              <span className="text-neon-rose text-[10px] mt-0.5">▸</span>
              {c}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
