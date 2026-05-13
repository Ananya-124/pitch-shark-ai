import os
import logging
import anthropic
from models.schemas import PitchData, StartupAnalysis, SharkFeedback, ChatMessage, CurrentOffer
from utils.prompts import (
    build_analyze_prompt,
    build_feedback_prompt,
    build_negotiation_system_prompt,
    build_negotiation_messages,
)
from utils.json_parser import safe_parse_json, extract_new_offer

logger = logging.getLogger(__name__)

_client = None


def get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY not set in environment")
        _client = anthropic.Anthropic(api_key=api_key)
    return _client


async def analyze_with_anthropic(pitch: PitchData) -> dict:
    client = get_client()
    prompt = build_analyze_prompt(pitch)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1200,
        messages=[{"role": "user", "content": prompt}],
    )
    return safe_parse_json(response.content[0].text)


async def feedback_with_anthropic(
    pitch: PitchData,
    analysis: StartupAnalysis,
    answers: dict[str, str],
) -> dict:
    client = get_client()
    prompt = build_feedback_prompt(pitch, analysis, answers)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1800,
        messages=[{"role": "user", "content": prompt}],
    )
    return safe_parse_json(response.content[0].text)


async def negotiate_with_anthropic(
    pitch: PitchData,
    analysis: StartupAnalysis,
    shark_id: str,
    current_offer: CurrentOffer | None,
    feedback: SharkFeedback,
    chat_history: list[ChatMessage],
    user_message: str,
) -> dict:
    client = get_client()
    system = build_negotiation_system_prompt(
        pitch, analysis, shark_id, current_offer, feedback
    )
    msgs = build_negotiation_messages(chat_history, user_message)

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=300,
        system=system,
        messages=msgs,
    )
    reply = response.content[0].text.strip()
    new_offer = extract_new_offer(reply)

    return {
        "reply": reply,
        "new_offer": {"amount": new_offer["amount"], "equity": new_offer["equity"]}
        if new_offer
        else None,
    }
