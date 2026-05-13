"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";

const FEATURES = [
  {
    icon: "🧠",
    title: "AI STARTUP ANALYSIS",
    desc: "Deep-dive scoring on market potential, risk, scalability, and investment readiness with full SWOT breakdown.",
  },
  {
    icon: "🦈",
    title: "4 AI SHARK INVESTORS",
    desc: "Finance, Tech, Growth, and Risk sharks — each with unique personalities, evaluation criteria, and funding behavior.",
  },
  {
    icon: "⚡",
    title: "LIVE NEGOTIATION ENGINE",
    desc: "Counter offers, equity bargaining, milestone-based deal structuring — all in real-time investor-grade chat.",
  },
  {
    icon: "📊",
    title: "VENTURE INTELLIGENCE",
    desc: "Animated score cards, confidence meters, and a full funding dashboard with implied valuations.",
  },
  {
    icon: "🔮",
    title: "STRUCTURED AI RESPONSES",
    desc: "Prompt-orchestrated responses with structured JSON handling — Gemini / OpenAI ready architecture.",
  },
  {
    icon: "🚀",
    title: "DEMO-READY PLATFORM",
    desc: "Hackathon-winning experience designed for immersive, futuristic storytelling and founder presentations.",
  },
];

const STATS = [
  { value: "4", label: "AI SHARKS" },
  { value: "360°", label: "ANALYSIS" },
  { value: "LIVE", label: "NEGOTIATION" },
  { value: "₹∞", label: "POTENTIAL" },
];

export default function LandingPage() {
  const router = useRouter();
  const { resetAll } = usePitchPilotStore();

  const handleStart = () => {
    resetAll();
    router.push("/pitch");
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,245,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 50%), #020408",
      }}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 font-mono text-[11px] tracking-[2px] uppercase text-neon-cyan"
        style={{
          borderColor: "rgba(0,245,255,0.25)",
          background: "rgba(0,245,255,0.05)",
          animation: "pulse-border 3s infinite",
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        AI VENTURE INTELLIGENCE PLATFORM
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-orbitron font-black leading-[1.05] tracking-tight mb-6 text-gradient"
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          filter: "drop-shadow(0 0 40px rgba(0,245,255,0.25))",
        }}
      >
        PITCH
        <br />
        PILOT AI
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        style={{ color: "var(--text-secondary)" }}
      >
        Pitch your startup to elite AI investors. Get real-time analysis,
        simulation-grade feedback, and live deal negotiations — powered by AI.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="flex gap-4 flex-wrap justify-center mb-16"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="font-orbitron font-bold text-sm tracking-[3px] uppercase px-12 py-4 border border-neon-cyan text-neon-cyan btn-clip transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(139,92,246,0.08))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(0,245,255,0.22), rgba(139,92,246,0.18))";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow =
              "0 0 40px rgba(0,245,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(139,92,246,0.08))";
            e.currentTarget.style.color = "var(--neon-cyan)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ⚡ START PITCHING
        </motion.button>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex gap-10 flex-wrap justify-center mb-20"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="font-orbitron text-2xl font-black text-neon-cyan"
              style={{ filter: "drop-shadow(0 0 12px rgba(0,245,255,0.4))" }}
            >
              {stat.value}
            </div>
            <div
              className="font-mono text-[10px] tracking-[2px] mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.45 }}
            whileHover={{ y: -4, borderColor: "rgba(0,245,255,0.25)" }}
            className="text-left p-6 rounded-xl glass-panel transition-all duration-300"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <div className="font-orbitron text-[12px] text-neon-cyan tracking-[1px] mb-2">
              {f.title}
            </div>
            <div
              className="text-[13px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {f.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-2 flex-wrap justify-center mt-16 font-mono text-[11px] tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {["PITCH", "ANALYZE", "SHARKS", "OFFERS", "NEGOTIATE", "DEAL"].map(
          (step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="hover:text-neon-cyan transition-colors cursor-default">
                {step}
              </span>
              {i < arr.length - 1 && <span className="text-neon-violet">→</span>}
            </span>
          )
        )}
      </motion.div>
    </main>
  );
}
