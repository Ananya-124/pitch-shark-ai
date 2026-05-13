import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  PitchData,
  StartupAnalysis,
  SharkFeedback,
  ChatMessage,
  CurrentOffers,
  NegotiationState,
} from "@/types";

interface PitchPilotStore {
  // ── Pitch ──────────────────────────────────────────────────────
  pitch: PitchData | null;
  setPitch: (pitch: PitchData) => void;

  // ── Analysis ───────────────────────────────────────────────────
  analysis: StartupAnalysis | null;
  setAnalysis: (analysis: StartupAnalysis) => void;

  // ── Shark Answers ──────────────────────────────────────────────
  sharkAnswers: Record<string, string>;
  setSharkAnswer: (sharkId: string, answer: string) => void;
  clearSharkAnswers: () => void;

  // ── Feedback ───────────────────────────────────────────────────
  feedback: SharkFeedback[];
  setFeedback: (feedback: SharkFeedback[]) => void;

  // ── Offers ─────────────────────────────────────────────────────
  currentOffers: CurrentOffers;
  setCurrentOffer: (sharkId: string, amount: number, equity: number) => void;
  initOffersFromFeedback: (feedback: SharkFeedback[]) => void;

  // ── Negotiation ────────────────────────────────────────────────
  chatHistory: NegotiationState;
  addMessage: (sharkId: string, message: ChatMessage) => void;
  setChatHistory: (sharkId: string, messages: ChatMessage[]) => void;

  // ── Loading ────────────────────────────────────────────────────
  loadingAnalysis: boolean;
  loadingFeedback: boolean;
  loadingNegotiation: boolean;
  setLoading: (key: "analysis" | "feedback" | "negotiation", value: boolean) => void;

  // ── Reset ──────────────────────────────────────────────────────
  resetAll: () => void;
}

const initialState = {
  pitch: null,
  analysis: null,
  sharkAnswers: {},
  feedback: [],
  currentOffers: {},
  chatHistory: {},
  loadingAnalysis: false,
  loadingFeedback: false,
  loadingNegotiation: false,
};

export const usePitchPilotStore = create<PitchPilotStore>()(
  persist(
    (set) => ({
      ...initialState,

      setPitch: (pitch) => set({ pitch }),

      setAnalysis: (analysis) => set({ analysis }),

      setSharkAnswer: (sharkId, answer) =>
        set((state) => ({
          sharkAnswers: { ...state.sharkAnswers, [sharkId]: answer },
        })),

      clearSharkAnswers: () => set({ sharkAnswers: {} }),

      setFeedback: (feedback) => set({ feedback }),

      setCurrentOffer: (sharkId, amount, equity) =>
        set((state) => ({
          currentOffers: {
            ...state.currentOffers,
            [sharkId]: { amount, equity },
          },
        })),

      initOffersFromFeedback: (feedback) => {
        const offers: CurrentOffers = {};
        feedback.forEach((f) => {
          if (f.offer.investing) {
            offers[f.id] = { amount: f.offer.amount, equity: f.offer.equity };
          }
        });
        set({ currentOffers: offers });
      },

      addMessage: (sharkId, message) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [sharkId]: [...(state.chatHistory[sharkId] || []), message],
          },
        })),

      setChatHistory: (sharkId, messages) =>
        set((state) => ({
          chatHistory: { ...state.chatHistory, [sharkId]: messages },
        })),

      setLoading: (key, value) => {
        const keyMap = {
          analysis: "loadingAnalysis",
          feedback: "loadingFeedback",
          negotiation: "loadingNegotiation",
        } as const;
        set({ [keyMap[key]]: value });
      },

      resetAll: () => set(initialState),
    }),
    {
      name: "pitchpilot-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
