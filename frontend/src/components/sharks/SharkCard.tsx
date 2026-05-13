"use client";
import { motion } from "framer-motion";
import type { Shark } from "@/types";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";

interface SharkCardProps {
  shark: Shark;
  index: number;
}

export default function SharkCard({ shark, index }: SharkCardProps) {
  const { sharkAnswers, setSharkAnswer } = usePitchPilotStore();
  const answer = sharkAnswers[shark.id] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.45 }}
      className="relative rounded-2xl p-7 glass-panel overflow-hidden group transition-all duration-300"
      style={
        {
          "--shark-color": shark.color,
          borderColor: `${shark.color}20`,
        } as React.CSSProperties
      }
      whileHover={{ y: -4 }}
    >
      {/* Right accent bar */}
      <div
        className="absolute top-0 right-0 bottom-0 w-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ background: shark.color }}
      />

      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 border-2"
        style={{
          background: `${shark.color}15`,
          borderColor: `${shark.color}40`,
        }}
      >
        {shark.emoji}
      </div>

      {/* Name & Role */}
      <div
        className="font-orbitron text-sm font-bold mb-1"
        style={{ color: shark.color }}
      >
        {shark.name}
      </div>
      <div
        className="font-mono text-[11px] tracking-[1.5px] mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        {shark.role}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {shark.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2.5 py-1 rounded-full border tracking-wide"
            style={{
              color: shark.color,
              borderColor: `${shark.color}35`,
              background: `${shark.color}10`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Question */}
      <div
        className="text-sm leading-relaxed italic px-3 py-3 rounded-lg mb-4 border-l-2"
        style={{
          color: "var(--text-secondary)",
          background: "rgba(255,255,255,0.02)",
          borderColor: shark.color,
        }}
      >
        &ldquo;{shark.question}&rdquo;
      </div>

      {/* Answer textarea */}
      <div>
        <label
          className="block font-mono text-[10px] tracking-[2px] uppercase mb-1.5"
          style={{ color: shark.color }}
        >
          YOUR ANSWER
        </label>
        <textarea
          value={answer}
          onChange={(e) => setSharkAnswer(shark.id, e.target.value)}
          placeholder={`Respond to ${shark.name}...`}
          rows={3}
          className="pitch-input resize-y min-h-[72px]"
          style={{ borderColor: `${shark.color}25` }}
        />
      </div>
    </motion.div>
  );
}
