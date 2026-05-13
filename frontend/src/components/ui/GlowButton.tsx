"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
}

const variants = {
  primary: {
    border: "border-neon-violet",
    bg: "bg-neon-violet/10 hover:bg-neon-violet/30",
    text: "text-neon-violet hover:text-white",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]",
  },
  secondary: {
    border: "border-white/10",
    bg: "bg-transparent hover:bg-white/5",
    text: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    glow: "",
  },
  danger: {
    border: "border-neon-rose",
    bg: "bg-neon-rose/10 hover:bg-neon-rose/25",
    text: "text-neon-rose hover:text-white",
    glow: "hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]",
  },
};

const sizes = {
  sm: "px-5 py-2.5 text-[11px] tracking-[1.5px]",
  md: "px-8 py-3.5 text-[12px] tracking-[2px]",
  lg: "px-12 py-4 text-[14px] tracking-[3px]",
};

export default function GlowButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className,
  size = "md",
  type = "button",
}: GlowButtonProps) {
  const v = variants[variant];
  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative font-orbitron font-bold uppercase tracking-widest",
        "border transition-all duration-300 outline-none btn-clip",
        v.border,
        v.bg,
        v.text,
        v.glow,
        sizes[size],
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
