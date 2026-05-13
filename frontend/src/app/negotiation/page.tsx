"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "@/components/layout/TopNav";
import SharkSidebar from "@/components/negotiation/SharkSidebar";
import NegotiationChat from "@/components/negotiation/NegotiationChat";
import GlowButton from "@/components/ui/GlowButton";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";
import { SHARKS, SHARK_MAP } from "@/data/sharks";

export default function NegotiationPage() {
  const router = useRouter();
  const { pitch, feedback, currentOffers } = usePitchPilotStore();
  const [activeSharkId, setActiveSharkId] = useState<string | null>(null);

  useEffect(() => {
    if (!pitch || feedback.length === 0) router.replace("/pitch");
  }, [pitch, feedback, router]);

  if (!pitch || feedback.length === 0) return null;

  const activeShark = activeSharkId ? SHARK_MAP[activeSharkId] : null;
  const activeFeedback = activeSharkId
    ? feedback.find((f) => f.id === activeSharkId)
    : null;

  const totalInvesting = feedback.filter((f) => f.offer.investing).length;
  const currentTotal = Object.values(currentOffers).reduce(
    (acc, o) => acc + o.amount,
    0
  );

  return (
    <>
      <TopNav />
      <div
        className="relative z-10 pt-20"
        style={{ height: "100dvh", display: "flex", flexDirection: "column" }}
      >
        {/* Header bar */}
        <div
          className="px-6 py-3 flex items-center justify-between border-b"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <div>
            <div
              className="font-orbitron text-[11px] tracking-[2px] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              05 / NEGOTIATION ROOM
            </div>
            <div className="font-orbitron text-base font-bold text-neon-cyan">
              {pitch.name} — Deal Room
            </div>
          </div>
          <div className="flex items-center gap-6">
            {currentTotal > 0 && (
              <div className="text-right">
                <div
                  className="font-mono text-[10px] tracking-widest mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  CURRENT TOTAL
                </div>
                <div className="font-orbitron text-lg font-bold text-neon-amber">
                  ₹{currentTotal}L
                </div>
              </div>
            )}
            <GlowButton
              variant="secondary"
              size="sm"
              onClick={() => router.push("/results")}
            >
              ← OFFERS
            </GlowButton>
          </div>
        </div>

        {/* Main layout */}
        <div
          className="flex flex-1 gap-0 overflow-hidden"
          style={{ minHeight: 0 }}
        >
          {/* Sidebar */}
          <div
            className="w-72 flex-shrink-0 p-4 border-r overflow-y-auto"
            style={{ borderColor: "var(--border-soft)" }}
          >
            <SharkSidebar
              sharks={SHARKS}
              feedback={feedback}
              activeId={activeSharkId}
              onSelect={setActiveSharkId}
            />

            {/* Deal summary */}
            {Object.keys(currentOffers).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl border"
                style={{
                  borderColor: "rgba(16,185,129,0.25)",
                  background: "rgba(16,185,129,0.05)",
                }}
              >
                <div
                  className="font-orbitron text-[11px] tracking-[2px] text-neon-emerald mb-3"
                >
                  CURRENT DEALS
                </div>
                {Object.entries(currentOffers).map(([id, offer]) => {
                  const shark = SHARK_MAP[id];
                  if (!shark) return null;
                  return (
                    <div
                      key={id}
                      className="flex justify-between items-center py-1.5 border-b last:border-0"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                    >
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: shark.color }}
                      >
                        {shark.emoji} {shark.id.toUpperCase()}
                      </span>
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        ₹{offer.amount}L · {offer.equity}%
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            {activeShark && activeFeedback ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSharkId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  {/* Chat header */}
                  <div
                    className="flex items-center gap-4 px-5 py-3.5 border-b flex-shrink-0"
                    style={{
                      borderColor: "var(--border-soft)",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 flex-shrink-0"
                      style={{
                        background: `${activeShark.color}15`,
                        borderColor: `${activeShark.color}50`,
                      }}
                    >
                      {activeShark.emoji}
                    </div>
                    <div>
                      <div
                        className="font-orbitron text-sm font-bold"
                        style={{ color: activeShark.color }}
                      >
                        {activeShark.name}
                      </div>
                      <div
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {activeShark.role}
                      </div>
                    </div>
                    {currentOffers[activeShark.id] && (
                      <div
                        className="ml-auto font-mono text-[12px] px-4 py-1.5 rounded-lg border"
                        style={{
                          color: "var(--neon-amber)",
                          borderColor: "rgba(245,158,11,0.3)",
                          background: "rgba(245,158,11,0.08)",
                        }}
                      >
                        LIVE: ₹{currentOffers[activeShark.id].amount}L ·{" "}
                        {currentOffers[activeShark.id].equity}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-h-0">
                    <NegotiationChat
                      shark={activeShark}
                      feedback={activeFeedback}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-6xl"
                >
                  🦈
                </motion.div>
                <div
                  className="font-orbitron text-sm tracking-[3px] text-center"
                  style={{ color: "var(--text-muted)" }}
                >
                  SELECT A SHARK TO BEGIN NEGOTIATION
                </div>
                <div
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {totalInvesting} shark{totalInvesting !== 1 ? "s" : ""} made
                  offers · {feedback.length - totalInvesting} need convincing
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
