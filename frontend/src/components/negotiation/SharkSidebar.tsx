"use client";
import { motion } from "framer-motion";
import type { Shark, SharkFeedback } from "@/types";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";
import clsx from "clsx";

interface SharkSidebarProps {
  sharks: Shark[];
  feedback: SharkFeedback[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function SharkSidebar({
  sharks,
  feedback,
  activeId,
  onSelect,
}: SharkSidebarProps) {
  const { currentOffers } = usePitchPilotStore();

  return (
    <div
      className="rounded-xl p-4 glass-panel overflow-y-auto"
      style={{ minHeight: 0 }}
    >
      <div
        className="font-orbitron text-[10px] tracking-[2px] uppercase mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        NEGOTIATION ROOM
      </div>

      <div className="flex flex-col gap-1.5">
        {sharks.map((shark, i) => {
          const offer = currentOffers[shark.id];
          const fb = feedback.find((f) => f.id === shark.id);
          const isActive = activeId === shark.id;

          return (
            <motion.button
              key={shark.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelect(shark.id)}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg text-left transition-all w-full",
                isActive
                  ? "border"
                  : "hover:bg-white/5 border border-transparent"
              )}
              style={
                isActive
                  ? {
                      background: `${shark.color}10`,
                      borderColor: `${shark.color}40`,
                    }
                  : {}
              }
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base border flex-shrink-0"
                style={{
                  background: `${shark.color}12`,
                  borderColor: `${shark.color}35`,
                }}
              >
                {shark.emoji}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <div
                  className="font-orbitron text-[11px] truncate"
                  style={{ color: isActive ? shark.color : "var(--text-primary)" }}
                >
                  {shark.name}
                </div>
                <div
                  className="font-mono text-[10px] mt-0.5 truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {offer
                    ? `₹${offer.amount}L · ${offer.equity}%`
                    : fb?.offer.investing
                    ? "Offer active"
                    : "No offer — persuade"}
                </div>
              </div>

              {/* Status dot */}
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto"
                style={{
                  background: offer
                    ? "#10b981"
                    : fb?.offer.investing
                    ? "#f59e0b"
                    : "#f43f5e",
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
