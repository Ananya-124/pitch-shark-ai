from models.schemas import PitchData, StartupAnalysis, SwotAnalysis


def get_mock_analysis(pitch: PitchData) -> dict:
    ask = int(pitch.ask) if pitch.ask.isdigit() else 50
    return {
        "score": 72,
        "risk_level": "Medium",
        "market_potential": "High",
        "investment_probability": 68,
        "scalability_score": 78,
        "summary": f"{pitch.name} addresses a genuine market gap with a differentiated approach. The founding vision is compelling but execution risk remains moderate. Revenue model clarity and competitive moat need strengthening before Series A.",
        "swot": {
            "strengths": [
                "Clear problem-solution fit with validated pain points",
                "Scalable business model with recurring revenue potential",
                "Large total addressable market with growth tailwinds",
            ],
            "weaknesses": [
                "Early-stage without meaningful revenue validation",
                "Competitive market with well-funded incumbents",
                "Execution team needs strengthening in key areas",
            ],
            "opportunities": [
                "Emerging market tailwinds and digital transformation wave",
                "AI-first transformation creating new market categories",
            ],
            "threats": [
                "Well-funded competitors with distribution advantages",
                "Regulatory uncertainty in the target sector",
            ],
        },
        "scalability_note": "The model can scale 10x with additional engineering investment and geographic expansion into Tier-2 markets.",
        "recommendation": "Pursue a seed round targeting strategic investors with sector expertise and strong portfolio synergies.",
    }


def get_mock_feedback(pitch: PitchData, analysis: StartupAnalysis) -> dict:
    ask = int(pitch.ask) if pitch.ask.isdigit() else 50
    return {
        "sharks": [
            {
                "id": "finance",
                "reaction": "Interested",
                "confidence": 72,
                "comment": "The unit economics show promise but need tightening. Revenue clarity is key before scaling. I see potential if margins can be defended.",
                "strengths": [
                    "Revenue model is logical and scalable",
                    "Market size is substantial with good TAM",
                ],
                "concerns": [
                    "CAC/LTV ratio unclear — needs clarification",
                    "Path to profitability needs a concrete timeline",
                ],
                "offer": {
                    "amount": round(ask * 0.7),
                    "equity": 12,
                    "investing": True,
                },
            },
            {
                "id": "tech",
                "reaction": "Impressed",
                "confidence": 85,
                "comment": "Technically sound approach with genuine differentiation. The architecture can scale. I'm impressed by the engineering-first thinking.",
                "strengths": [
                    "Solid technical foundation and architecture",
                    "AI-first approach creates genuine defensibility",
                ],
                "concerns": [
                    "Infrastructure costs at scale need modeling",
                    "Talent acquisition in competitive engineering market",
                ],
                "offer": {
                    "amount": round(ask * 0.6),
                    "equity": 10,
                    "investing": True,
                },
            },
            {
                "id": "marketing",
                "reaction": "Cautious",
                "confidence": 58,
                "comment": "GTM strategy needs sharper definition. Customer acquisition plan lacks specificity. I want to see a viral loop before committing.",
                "strengths": [
                    "Brand narrative is compelling and differentiated",
                    "Target segment is well-defined and reachable",
                ],
                "concerns": [
                    "No clear viral growth mechanism defined",
                    "CAC may be prohibitively high without organic channels",
                ],
                "offer": {"amount": 0, "equity": 0, "investing": False},
            },
            {
                "id": "risk",
                "reaction": "Skeptical",
                "confidence": 45,
                "comment": "Competitive moat is unclear. With well-funded players in this space, differentiation must be crystallized before I write a check.",
                "strengths": [
                    "Team passion and founder conviction is evident",
                    "Problem being solved is real and urgent",
                ],
                "concerns": [
                    "Competitive moat is dangerously thin",
                    "Regulatory risk appears underestimated",
                ],
                "offer": {"amount": 0, "equity": 0, "investing": False},
            },
        ]
    }


def get_mock_negotiation_reply(user_message: str, shark_id: str) -> dict:
    replies = {
        "finance": "The numbers need to work on my end too. I can consider a slight revision if you provide clear revenue projections for the next 18 months. My position remains firm until I see that data.",
        "tech": "Your technical architecture is interesting, but I need more clarity on the scalability bottlenecks. If you can address the infrastructure cost question, I might revisit the terms.",
        "marketing": "I appreciate your growth thinking, but viral loops don't happen by accident. Show me a concrete acquisition playbook and I'll reconsider my position.",
        "risk": "The competitive risk is real and you haven't fully addressed it. Give me one defensible moat that competitors can't replicate in 12 months and we can talk.",
    }
    return {
        "reply": replies.get(shark_id, "Interesting point. Let me think about that. The fundamentals of my position remain, but I'm open to further discussion."),
        "new_offer": None,
    }
