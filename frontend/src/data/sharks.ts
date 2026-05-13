import type { Shark } from "@/types";

export const SHARKS: Shark[] = [
  {
    id: "finance",
    name: "FINANCE SHARK",
    emoji: "💰",
    color: "#f59e0b",
    role: "VALUATION & ROI EXPERT",
    tags: ["Profitability", "Valuation", "Revenue", "ROI"],
    question:
      "Walk me through your unit economics. What is your CAC, LTV, and projected runway with this funding?",
    personality:
      "data-driven, number-focused, direct, obsessed with margins and returns",
  },
  {
    id: "tech",
    name: "TECH SHARK",
    emoji: "🔬",
    color: "#00f5ff",
    role: "SCALABILITY & INNOVATION EXPERT",
    tags: ["Scalability", "Architecture", "AI/ML", "Infrastructure"],
    question:
      "How does your technology scale to 10M users? What are the core technical risks and your engineering moat?",
    personality:
      "technical, analytical, skeptical of non-tech answers, loves innovation",
  },
  {
    id: "marketing",
    name: "GROWTH SHARK",
    emoji: "📈",
    color: "#8b5cf6",
    role: "GTM & BRAND STRATEGIST",
    tags: ["Branding", "Growth", "GTM", "Acquisition"],
    question:
      "What is your customer acquisition strategy? Describe your first 1000 customers and viral growth mechanism.",
    personality:
      "brand-obsessed, growth-focused, creative, loves network effects",
  },
  {
    id: "risk",
    name: "RISK SHARK",
    emoji: "⚠️",
    color: "#f43f5e",
    role: "RISK & SUSTAINABILITY ANALYST",
    tags: ["Competition", "Regulation", "Sustainability", "Legal"],
    question:
      "Who are your top 3 competitors and what stops them from copying your model in 6 months? Any regulatory landmines?",
    personality:
      "risk-averse, challenging, protective, asks hard devil's advocate questions",
  },
];

export const SHARK_MAP = SHARKS.reduce(
  (acc, s) => ({ ...acc, [s.id]: s }),
  {} as Record<string, Shark>
);
