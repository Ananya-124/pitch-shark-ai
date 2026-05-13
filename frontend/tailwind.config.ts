import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "monospace"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        "neon-cyan": "#00f5ff",
        "neon-violet": "#8b5cf6",
        "neon-emerald": "#10b981",
        "neon-amber": "#f59e0b",
        "neon-rose": "#f43f5e",
        void: "#020408",
        deep: "#060d1a",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "pulse-border": "pulse-border 3s infinite",
        blink: "blink 1.5s infinite",
        spin: "spin 1s linear infinite",
        "bounce-dot": "bounce-dot 1.2s infinite",
        "fade-in": "fade-in 0.5s ease forwards",
      },
      keyframes: {
        "pulse-border": {
          "0%,100%": {
            borderColor: "rgba(0,245,255,0.2)",
            boxShadow: "0 0 0 rgba(0,245,255,0)",
          },
          "50%": {
            borderColor: "rgba(0,245,255,0.6)",
            boxShadow: "0 0 20px rgba(0,245,255,0.1)",
          },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "bounce-dot": {
          "0%,80%,100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
