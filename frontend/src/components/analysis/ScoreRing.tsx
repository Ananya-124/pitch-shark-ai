"use client";
import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function ScoreRing({
  score,
  size = 160,
  strokeWidth = 8,
  color = "#00f5ff",
  label = "SCORE",
}: ScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`${color}15`}
          strokeWidth={strokeWidth}
        />
        {/* Animated foreground ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="font-orbitron font-black leading-none"
          style={{ fontSize: size * 0.22, color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {score}
        </motion.div>
        <div
          className="font-mono text-[9px] tracking-[2px] uppercase mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
