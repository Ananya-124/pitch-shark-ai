from pydantic import BaseModel, Field
from typing import Literal, Optional


# ── Pitch ─────────────────────────────────────────────────────────────────────
class PitchData(BaseModel):
    name: str = Field(..., min_length=1, description="Startup name")
    domain: str = Field(..., description="Industry domain e.g. HealthTech")
    problem: str = Field(..., min_length=10, description="Problem statement")
    solution: str = Field(..., min_length=10, description="Solution description")
    audience: str = Field(..., description="Target audience")
    model: str = Field(..., description="Business model")
    competitors: str = Field(..., description="Main competitors")
    ask: str = Field(..., description="Funding ask in Lakhs (string)")


# ── Analysis ──────────────────────────────────────────────────────────────────
class SwotAnalysis(BaseModel):
    strengths: list[str]
    weaknesses: list[str]
    opportunities: list[str]
    threats: list[str]


class StartupAnalysis(BaseModel):
    score: int = Field(..., ge=0, le=100)
    risk_level: Literal["Low", "Medium", "High", "Very High"]
    market_potential: Literal["Low", "Medium", "High", "Very High"]
    investment_probability: int = Field(..., ge=0, le=100)
    scalability_score: int = Field(..., ge=0, le=100)
    summary: str
    swot: SwotAnalysis
    scalability_note: str
    recommendation: str


# ── Feedback ──────────────────────────────────────────────────────────────────
SharkId = Literal["finance", "tech", "marketing", "risk"]
ReactionType = Literal["Impressed", "Skeptical", "Interested", "Cautious", "Excited"]


class InvestorOffer(BaseModel):
    amount: int = Field(..., description="Amount in Lakhs")
    equity: int = Field(..., description="Equity percentage")
    investing: bool


class SharkFeedback(BaseModel):
    id: SharkId
    reaction: ReactionType
    confidence: int = Field(..., ge=0, le=100)
    comment: str
    strengths: list[str]
    concerns: list[str]
    offer: InvestorOffer


class FeedbackRequest(BaseModel):
    pitch: PitchData
    analysis: StartupAnalysis
    answers: dict[str, str]  # shark_id -> answer


class FeedbackResponse(BaseModel):
    sharks: list[SharkFeedback]


# ── Negotiation ───────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: Literal["user", "shark"]
    text: str
    timestamp: Optional[str] = None


class CurrentOffer(BaseModel):
    amount: int
    equity: int


class NegotiationRequest(BaseModel):
    pitch: PitchData
    analysis: StartupAnalysis
    shark_id: SharkId
    current_offer: Optional[CurrentOffer] = None
    feedback: SharkFeedback
    chat_history: list[ChatMessage]
    user_message: str


class NegotiationResponse(BaseModel):
    reply: str
    new_offer: Optional[CurrentOffer] = None
