"use client";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  accentColor?: string;
  showBar?: boolean;
  barValue?: number;
  delay?: number;
}

export default function MetricCard({
  label,
  value,
  accentColor = "#00f5ff",
  showBar = false,
  barValue = 0,
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative overflow-hidden rounded-xl p-5 glass-panel"
      style={{ borderColor: `${accentColor}25` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: accentColor }}
      />

      <div
        className="text-[10px] font-mono tracking-[2px] uppercase mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>

      <div
        className="font-orbitron text-2xl font-bold"
        style={{ color: accentColor }}
      >
        {value}
      </div>

      {showBar && (
        <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${barValue}%` }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
    </motion.div>
  );
}
