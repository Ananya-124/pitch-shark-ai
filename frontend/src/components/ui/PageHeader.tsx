"use client";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-[11px] tracking-[3px] uppercase text-neon-violet mb-3">
        {eyebrow}
      </div>
      <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[var(--text-secondary)] mt-2 text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
