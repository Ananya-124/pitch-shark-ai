"""
AI Orchestrator — routes to configured AI provider.
Set AI_PROVIDER in .env to: groq | gemini | openai | anthropic | mock
"""
import os
import logging
from models.schemas import (
    PitchData, StartupAnalysis, SharkFeedback,
    ChatMessage, CurrentOffer,
)

logger = logging.getLogger(__name__)


def get_provider() -> str:
    return os.getenv("AI_PROVIDER", "groq").lower()


async def run_analysis(pitch: PitchData) -> dict:
    provider = get_provider()
    logger.info(f"Analysis — provider: {provider}")
    try:
        if provider == "groq":
            from services.groq_service import analyze_with_groq
            return await analyze_with_groq(pitch)
        elif provider == "gemini":
            from services.gemini_service import analyze_with_gemini
            return await analyze_with_gemini(pitch)
        elif provider == "openai":
            from services.openai_service import analyze_with_openai
            return await analyze_with_openai(pitch)
        elif provider == "anthropic":
            from services.anthropic_service import analyze_with_anthropic
            return await analyze_with_anthropic(pitch)
        else:
            from services.mock_service import get_mock_analysis
            return get_mock_analysis(pitch)
    except Exception as e:
        logger.error(f"Provider {provider} failed — analysis: {e}. Using mock.")
        from services.mock_service import get_mock_analysis
        return get_mock_analysis(pitch)


async def run_feedback(
    pitch: PitchData,
    analysis: StartupAnalysis,
    answers: dict[str, str],
) -> dict:
    provider = get_provider()
    logger.info(f"Feedback — provider: {provider}")
    try:
        if provider == "groq":
            from services.groq_service import feedback_with_groq
            return await feedback_with_groq(pitch, analysis, answers)
        elif provider == "gemini":
            from services.gemini_service import feedback_with_gemini
            return await feedback_with_gemini(pitch, analysis, answers)
        elif provider == "openai":
            from services.openai_service import feedback_with_openai
            return await feedback_with_openai(pitch, analysis, answers)
        elif provider == "anthropic":
            from services.anthropic_service import feedback_with_anthropic
            return await feedback_with_anthropic(pitch, analysis, answers)
        else:
            from services.mock_service import get_mock_feedback
            return get_mock_feedback(pitch, analysis)
    except Exception as e:
        logger.error(f"Provider {provider} failed — feedback: {e}. Using mock.")
        from services.mock_service import get_mock_feedback
        return get_mock_feedback(pitch, analysis)


async def run_negotiation(
    pitch: PitchData,
    analysis: StartupAnalysis,
    shark_id: str,
    current_offer: CurrentOffer | None,
    feedback: SharkFeedback,
    chat_history: list[ChatMessage],
    user_message: str,
) -> dict:
    provider = get_provider()
    logger.info(f"Negotiation — provider: {provider}, shark: {shark_id}")
    try:
        if provider == "groq":
            from services.groq_service import negotiate_with_groq
            return await negotiate_with_groq(
                pitch, analysis, shark_id, current_offer,
                feedback, chat_history, user_message
            )
        elif provider == "gemini":
            from services.gemini_service import negotiate_with_gemini
            return await negotiate_with_gemini(
                pitch, analysis, shark_id, current_offer,
                feedback, chat_history, user_message
            )
        elif provider == "openai":
            from services.openai_service import negotiate_with_openai
            return await negotiate_with_openai(
                pitch, analysis, shark_id, current_offer,
                feedback, chat_history, user_message
            )
        elif provider == "anthropic":
            from services.anthropic_service import negotiate_with_anthropic
            return await negotiate_with_anthropic(
                pitch, analysis, shark_id, current_offer,
                feedback, chat_history, user_message
            )
        else:
            from services.mock_service import get_mock_negotiation_reply
            return get_mock_negotiation_reply(user_message, shark_id)
    except Exception as e:
        logger.error(f"Provider {provider} failed — negotiation: {e}. Using mock.")
        from services.mock_service import get_mock_negotiation_reply
        return get_mock_negotiation_reply(user_message, shark_id)