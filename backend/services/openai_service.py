import os
import logging
from openai import AsyncOpenAI
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


def get_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY not set in environment")
        _client = AsyncOpenAI(api_key=api_key)
    return _client


async def analyze_with_openai(pitch: PitchData) -> dict:
    client = get_client()
    prompt = build_analyze_prompt(pitch)
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=1200,
    )
    return safe_parse_json(response.choices[0].message.content)


async def feedback_with_openai(
    pitch: PitchData,
    analysis: StartupAnalysis,
    answers: dict[str, str],
) -> dict:
    client = get_client()
    prompt = build_feedback_prompt(pitch, analysis, answers)
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=1800,
    )
    return safe_parse_json(response.choices[0].message.content)


async def negotiate_with_openai(
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

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": system}] + msgs,
        temperature=0.7,
        max_tokens=300,
    )
    reply = response.choices[0].message.content.strip()
    new_offer = extract_new_offer(reply)

    return {
        "reply": reply,
        "new_offer": {"amount": new_offer["amount"], "equity": new_offer["equity"]}
        if new_offer
        else None,
    }
