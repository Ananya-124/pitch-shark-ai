"use client";
import { motion } from "framer-motion";
import type { SwotAnalysis } from "@/types";

interface SwotGridProps {
  swot: SwotAnalysis;
}

const QUADRANTS = [
  {
    key: "strengths" as keyof SwotAnalysis,
    label: "STRENGTHS",
    color: "#10b981",
    bg: "rgba(16,185,129,0.05)",
    border: "rgba(16,185,129,0.2)",
  },
  {
    key: "weaknesses" as keyof SwotAnalysis,
    label: "WEAKNESSES",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.05)",
    border: "rgba(244,63,94,0.2)",
  },
  {
    key: "opportunities" as keyof SwotAnalysis,
    label: "OPPORTUNITIES",
    color: "#00f5ff",
    bg: "rgba(0,245,255,0.04)",
    border: "rgba(0,245,255,0.15)",
  },
  {
    key: "threats" as keyof SwotAnalysis,
    label: "THREATS",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.2)",
  },
];

export default function SwotGrid({ swot }: SwotGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {QUADRANTS.map((q, i) => (
        <motion.div
          key={q.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="rounded-xl p-5"
          style={{
            background: q.bg,
            border: `1px solid ${q.border}`,
          }}
        >
          <div
            className="font-orbitron text-[11px] tracking-[2px] uppercase mb-3"
            style={{ color: q.color }}
          >
            {q.label}
          </div>
          <ul className="space-y-1.5">
            {(swot[q.key] as string[]).map((item, idx) => (
              <li
                key={idx}
                className="text-[13px] leading-relaxed flex gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: q.color, fontSize: "10px", marginTop: 4 }}>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
