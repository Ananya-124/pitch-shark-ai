import os
import logging
import google.generativeai as genai
from models.schemas import PitchData, StartupAnalysis, SharkFeedback, ChatMessage, CurrentOffer
from utils.prompts import (
    build_analyze_prompt,
    build_feedback_prompt,
    build_negotiation_system_prompt,
    build_negotiation_messages,
)
from utils.json_parser import safe_parse_json, extract_new_offer

logger = logging.getLogger(__name__)

_model = None


def get_model():
    global _model
    if _model is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not set in environment")
        genai.configure(api_key=api_key)
        _model = genai.GenerativeModel("gemini-1.5-flash")
    return _model


async def analyze_with_gemini(pitch: PitchData) -> dict:
    model = get_model()
    prompt = build_analyze_prompt(pitch)
    response = model.generate_content(prompt)
    return safe_parse_json(response.text)


async def feedback_with_gemini(
    pitch: PitchData,
    analysis: StartupAnalysis,
    answers: dict[str, str],
) -> dict:
    model = get_model()
    prompt = build_feedback_prompt(pitch, analysis, answers)
    response = model.generate_content(prompt)
    return safe_parse_json(response.text)


async def negotiate_with_gemini(
    pitch: PitchData,
    analysis: StartupAnalysis,
    shark_id: str,
    current_offer: CurrentOffer | None,
    feedback: SharkFeedback,
    chat_history: list[ChatMessage],
    user_message: str,
) -> dict:
    model = get_model()
    system = build_negotiation_system_prompt(
        pitch, analysis, shark_id, current_offer, feedback
    )
    msgs = build_negotiation_messages(chat_history, user_message)

    # Build full prompt for Gemini (no native system prompt in all versions)
    full_prompt = f"{system}\n\nConversation so far:\n"
    for msg in msgs[:-1]:
        role = "Founder" if msg["role"] == "user" else "You (Shark)"
        full_prompt += f"{role}: {msg['content']}\n"
    full_prompt += f"\nFounder's latest message: {user_message}\n\nYour response:"

    response = model.generate_content(full_prompt)
    reply = response.text.strip()
    new_offer = extract_new_offer(reply)

    return {
        "reply": reply,
        "new_offer": {"amount": new_offer["amount"], "equity": new_offer["equity"]}
        if new_offer
        else None,
    }
