"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Shark, SharkFeedback, ChatMessage } from "@/types";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";
import { negotiate } from "@/services/api";

const SUGGESTIONS = [
  "Can you reduce the equity to 10%?",
  "What if I offer milestone-based tranches?",
  "Can you increase the funding amount?",
  "I have another offer — can you match it?",
  "What conditions are attached to this offer?",
];

interface NegotiationChatProps {
  shark: Shark;
  feedback: SharkFeedback;
}

export default function NegotiationChat({ shark, feedback }: NegotiationChatProps) {
  const {
    pitch,
    analysis,
    chatHistory,
    addMessage,
    setChatHistory,
    currentOffers,
    setCurrentOffer,
    loadingNegotiation,
    setLoading,
  } = usePitchPilotStore();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messages: ChatMessage[] = chatHistory[shark.id] || [];
  const currentOffer = currentOffers[shark.id] || null;

  // Initialize chat with opener
  useEffect(() => {
    if (!chatHistory[shark.id]) {
      const opener: ChatMessage = {
        role: "shark",
        text: currentOffer
          ? `I've reviewed ${pitch?.name} in depth. My current offer stands at ₹${currentOffer.amount} Lakhs for ${currentOffer.equity}% equity. ${feedback.comment.split(".")[0]}. What would you like to negotiate?`
          : `I passed on ${pitch?.name} because ${feedback.concerns[0]?.toLowerCase() || "the risks outweigh the opportunity"}. However, I'm open to hearing a revised case. Convince me.`,
        timestamp: new Date().toISOString(),
      };
      setChatHistory(shark.id, [opener]);
    }
  }, [shark.id]); // eslint-disable-line

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loadingNegotiation) return;
    setInput("");

    const userMsg: ChatMessage = {
      role: "user",
      text: msg,
      timestamp: new Date().toISOString(),
    };
    addMessage(shark.id, userMsg);
    setLoading("negotiation", true);

    try {
      const result = await negotiate({
        pitch: pitch!,
        analysis: analysis!,
        shark_id: shark.id,
        current_offer: currentOffer,
        feedback,
        chat_history: [...messages, userMsg].slice(-8),
        user_message: msg,
      });

      const sharkMsg: ChatMessage = {
        role: "shark",
        text: result.reply,
        timestamp: new Date().toISOString(),
      };
      addMessage(shark.id, sharkMsg);

      if (result.new_offer) {
        setCurrentOffer(shark.id, result.new_offer.amount, result.new_offer.equity);
      }
    } catch {
      addMessage(shark.id, {
        role: "shark",
        text: "Interesting point. Let me think about that. The fundamentals of my position remain, but I'm open to further discussion.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading("negotiation", false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Current offer strip */}
      {currentOffer && (
        <motion.div
          className="flex gap-3 flex-wrap px-4 py-2.5 border-b"
          style={{ borderColor: "var(--border-soft)", background: "rgba(0,0,0,0.3)" }}
          layout
        >
          <span
            className="font-mono text-[11px] px-3 py-1 rounded border"
            style={{
              color: "var(--neon-amber)",
              background: "rgba(245,158,11,0.08)",
              borderColor: "rgba(245,158,11,0.25)",
            }}
          >
            ₹{currentOffer.amount}L for {currentOffer.equity}% equity
          </span>
          <span
            className="font-mono text-[11px] px-3 py-1 rounded border"
            style={{
              color: "var(--neon-amber)",
              background: "rgba(245,158,11,0.08)",
              borderColor: "rgba(245,158,11,0.25)",
            }}
          >
            Valuation: ₹{Math.round((currentOffer.amount / currentOffer.equity) * 100)}L
          </span>
        </motion.div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col max-w-[75%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
            >
              <div
                className="font-mono text-[10px] tracking-[1.5px] mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {msg.role === "user" ? "YOU" : shark.name}
              </div>
              <div
                className="px-4 py-3 rounded-xl text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "rgba(139,92,246,0.15)",
                        border: "1px solid rgba(139,92,246,0.3)",
                        color: "var(--text-primary)",
                        borderRadius: "12px 12px 0 12px",
                      }
                    : {
                        background: `${shark.color}08`,
                        border: `1px solid ${shark.color}25`,
                        color: "var(--text-secondary)",
                        borderRadius: "12px 12px 12px 0",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loadingNegotiation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-start"
          >
            <div
              className="px-4 py-3 rounded-xl flex gap-1.5 items-center"
              style={{
                background: `${shark.color}08`,
                border: `1px solid ${shark.color}25`,
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: shark.color }}
                  animate={{ scale: [0.6, 1, 0.6], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div
        className="flex gap-2 flex-wrap px-4 py-2.5 border-t"
        style={{ borderColor: "var(--border-soft)" }}
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            disabled={loadingNegotiation}
            className="font-mono text-[11px] px-3 py-1.5 rounded border transition-all hover:border-neon-violet hover:text-neon-violet disabled:opacity-40"
            style={{
              borderColor: "var(--border-soft)",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div
        className="flex gap-3 px-4 py-3 border-t items-end"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Counter-offer, ask for terms revision..."
          rows={1}
          disabled={loadingNegotiation}
          className="pitch-input flex-1 resize-none min-h-[42px] max-h-[100px]"
        />
        <button
          onClick={() => handleSend()}
          disabled={loadingNegotiation || !input.trim()}
          className="font-orbitron text-[11px] tracking-widest px-5 py-2.5 rounded-lg border transition-all disabled:opacity-40 whitespace-nowrap"
          style={{
            borderColor: "var(--neon-violet)",
            background: "rgba(139,92,246,0.1)",
            color: "var(--neon-violet)",
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
