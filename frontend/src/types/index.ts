// ─── Pitch Types ───────────────────────────────────────────────────────────
export interface PitchData {
  name: string;
  domain: string;
  problem: string;
  solution: string;
  audience: string;
  model: string;
  competitors: string;
  ask: string;
}

// ─── Analysis Types ─────────────────────────────────────────────────────────
export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface StartupAnalysis {
  score: number;
  risk_level: "Low" | "Medium" | "High" | "Very High";
  market_potential: "Low" | "Medium" | "High" | "Very High";
  investment_probability: number;
  scalability_score: number;
  summary: string;
  swot: SwotAnalysis;
  scalability_note: string;
  recommendation: string;
}

// ─── Shark Types ─────────────────────────────────────────────────────────────
export type SharkId = "finance" | "tech" | "marketing" | "risk";

export interface Shark {
  id: SharkId;
  name: string;
  emoji: string;
  color: string;
  role: string;
  tags: string[];
  question: string;
  personality: string;
}

// ─── Investor Feedback Types ─────────────────────────────────────────────────
export type ReactionType =
  | "Impressed"
  | "Skeptical"
  | "Interested"
  | "Cautious"
  | "Excited";

export interface InvestorOffer {
  amount: number;
  equity: number;
  investing: boolean;
}

export interface SharkFeedback {
  id: SharkId;
  reaction: ReactionType;
  confidence: number;
  comment: string;
  strengths: string[];
  concerns: string[];
  offer: InvestorOffer;
}

// ─── Negotiation Types ───────────────────────────────────────────────────────
export interface ChatMessage {
  role: "user" | "shark";
  text: string;
  timestamp?: string;
}

export interface CurrentOffer {
  amount: number;
  equity: number;
}

export interface NegotiationState {
  [sharkId: string]: ChatMessage[];
}

export interface CurrentOffers {
  [sharkId: string]: CurrentOffer;
}

// ─── API Request/Response Types ──────────────────────────────────────────────
export interface AnalyzeRequest {
  name: string;
  domain: string;
  problem: string;
  solution: string;
  audience: string;
  model: string;
  competitors: string;
  ask: string;
}

export interface FeedbackRequest {
  pitch: PitchData;
  analysis: StartupAnalysis;
  answers: Record<SharkId, string>;
}

export interface NegotiationRequest {
  pitch: PitchData;
  analysis: StartupAnalysis;
  shark_id: SharkId;
  current_offer: CurrentOffer | null;
  feedback: SharkFeedback;
  chat_history: ChatMessage[];
  user_message: string;
}

export interface NegotiationResponse {
  reply: string;
  new_offer: CurrentOffer | null;
}

// ─── UI State Types ──────────────────────────────────────────────────────────
export type AppStep =
  | "landing"
  | "pitch"
  | "analysis"
  | "investors"
  | "results"
  | "negotiation";

export interface LoadingState {
  analysis: boolean;
  feedback: boolean;
  negotiation: boolean;
}
