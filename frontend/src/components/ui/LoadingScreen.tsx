"use client";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingScreen({
  message = "PROCESSING...",
  subMessage,
}: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Spinner rings */}
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 border-2 border-neon-cyan/20 rounded-full"
          style={{ borderTopColor: "var(--neon-cyan)" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-2 border-neon-violet/20 rounded-full"
          style={{ borderTopColor: "var(--neon-violet)" }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-2xl">🦈</span>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        className="text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="font-mono text-sm tracking-[3px] text-neon-cyan uppercase">
          {message}
        </div>
        {subMessage && (
          <div
            className="text-xs mt-2 tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            {subMessage}
          </div>
        )}
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-neon-cyan"
            animate={{ scale: [0.6, 1, 0.6], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
