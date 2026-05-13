from models.schemas import PitchData, StartupAnalysis, SharkFeedback, ChatMessage, CurrentOffer

SHARK_PROFILES = {
    "finance": {
        "name": "Finance Shark",
        "role": "Valuation & ROI Expert",
        "personality": "data-driven, number-focused, direct, obsessed with margins and returns. You always want to know CAC, LTV, burn rate, and path to profitability.",
    },
    "tech": {
        "name": "Tech Shark",
        "role": "Scalability & Innovation Expert",
        "personality": "technical, analytical, skeptical of non-tech answers. You probe architecture decisions, infrastructure costs, and technical moat depth.",
    },
    "marketing": {
        "name": "Growth Shark",
        "role": "GTM & Brand Strategist",
        "personality": "brand-obsessed, growth-focused, creative. You care about viral loops, customer acquisition channels, brand positioning, and network effects.",
    },
    "risk": {
        "name": "Risk Shark",
        "role": "Risk & Sustainability Analyst",
        "personality": "risk-averse, challenging, devil's advocate. You probe competitive moats, regulatory risks, sustainability, and execution vulnerabilities.",
    },
}


def build_analyze_prompt(pitch: PitchData) -> str:
    return f"""You are a top-tier startup analyst at a premier venture capital firm.
Analyze this startup pitch and return ONLY valid JSON — no markdown, no preamble, no explanation.

Startup Details:
- Name: {pitch.name}
- Domain: {pitch.domain}
- Problem: {pitch.problem}
- Solution: {pitch.solution}
- Target Audience: {pitch.audience}
- Business Model: {pitch.model}
- Competitors: {pitch.competitors}
- Funding Ask: ₹{pitch.ask} Lakhs

Be honest, rigorous, and investor-grade in your assessment. Return exactly:
{{
  "score": <integer 0-100>,
  "risk_level": "<Low|Medium|High|Very High>",
  "market_potential": "<Low|Medium|High|Very High>",
  "investment_probability": <integer 0-100>,
  "scalability_score": <integer 0-100>,
  "summary": "<2-3 sentence honest executive summary>",
  "swot": {{
    "strengths": ["<point>", "<point>", "<point>"],
    "weaknesses": ["<point>", "<point>", "<point>"],
    "opportunities": ["<point>", "<point>"],
    "threats": ["<point>", "<point>"]
  }},
  "scalability_note": "<1-2 sentences on scalability potential>",
  "recommendation": "<one strong actionable recommendation sentence>"
}}"""


def build_feedback_prompt(
    pitch: PitchData,
    analysis: StartupAnalysis,
    answers: dict[str, str],
) -> str:
    answers_block = "\n".join(
        [f"- {shark_id.title()} Shark answer: {ans}"
         for shark_id, ans in answers.items()]
    )

    return f"""You are simulating 4 AI shark investors on a startup pitch show.
Return ONLY valid JSON — no markdown, no preamble, no explanation.

Startup: {pitch.name} ({pitch.domain})
Score: {analysis.score}/100 | Risk: {analysis.risk_level} | Market: {analysis.market_potential}
Funding Ask: ₹{pitch.ask} Lakhs

Founder answers to each shark:
{answers_block}

For each shark, generate a realistic funding decision based on the founder's answers.
Be tough but fair. Make confidence scores reflect the quality of the answers.
Return exactly:
{{
  "sharks": [
    {{
      "id": "finance",
      "reaction": "<Impressed|Skeptical|Interested|Cautious|Excited>",
      "confidence": <integer 0-100>,
      "comment": "<2-3 sentence investor-style comment referencing the answers>",
      "strengths": ["<specific strength from answers>", "<another strength>"],
      "concerns": ["<specific concern from answers>", "<another concern>"],
      "offer": {{
        "amount": <integer lakhs — 0 if not investing>,
        "equity": <integer percent — 0 if not investing>,
        "investing": <true|false>
      }}
    }},
    {{ "id": "tech", ... same structure ... }},
    {{ "id": "marketing", ... same structure ... }},
    {{ "id": "risk", ... same structure ... }}
  ]
}}

Guidelines for offers:
- Finance Shark: invests if financials are clear, offers 40-80% of ask for 8-15% equity
- Tech Shark: invests if tech is solid, offers 40-70% of ask for 8-12% equity
- Growth Shark: invests if GTM is clear, offers 30-60% of ask for 12-18% equity
- Risk Shark: invests only if risks are well-addressed, offers 25-50% of ask for 15-20% equity
- If answers are weak, set investing: false"""


def build_negotiation_system_prompt(
    pitch: PitchData,
    analysis: StartupAnalysis,
    shark_id: str,
    current_offer: CurrentOffer | None,
    feedback: SharkFeedback,
) -> str:
    profile = SHARK_PROFILES.get(shark_id, SHARK_PROFILES["finance"])
    offer_str = (
        f"₹{current_offer.amount} Lakhs for {current_offer.equity}% equity"
        if current_offer
        else "no offer currently (you previously passed)"
    )

    return f"""You are {profile['name']}, a {profile['role']} on PitchPilot AI — a Shark Tank-style show.

You are negotiating with the founder of {pitch.name} ({pitch.domain}).
Startup score: {analysis.score}/100.
Your current position: {offer_str}.

Your personality: {profile['personality']}

Your prior feedback on this startup:
- Reaction: {feedback.reaction}
- Confidence: {feedback.confidence}%
- Comment: {feedback.comment}
- Strengths you see: {', '.join(feedback.strengths)}
- Your concerns: {', '.join(feedback.concerns)}

Negotiation rules:
1. Stay firmly in character — be tough but realistic
2. You CAN revise your offer if the founder makes genuinely compelling arguments
3. If you revise, state: "NEW OFFER: ₹X Lakhs for Y% equity" (exactly this format)
4. Counter with milestones, board seats, or pro-rata rights as leverage
5. Respond in 2-4 sentences maximum
6. Reference specific things the founder says
7. Never break character"""


def build_negotiation_messages(
    chat_history: list[ChatMessage],
    user_message: str,
) -> list[dict]:
    """Convert chat history to LLM message format."""
    messages = []

    for msg in chat_history[-8:]:  # last 8 messages for context
        role = "user" if msg.role == "user" else "assistant"
        messages.append({"role": role, "content": msg.text})

    # Ensure alternating roles (LLM requirement)
    if messages and messages[0]["role"] == "assistant":
        messages.insert(0, {"role": "user", "content": "Begin the negotiation."})

    messages.append({"role": "user", "content": user_message})
    return messages
