import json
import re
import logging

logger = logging.getLogger(__name__)


def clean_json_string(text: str) -> str:
    """Strip markdown fences and extra whitespace from LLM JSON output."""
    text = text.strip()
    # Remove ```json ... ``` or ``` ... ```
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return text.strip()


def safe_parse_json(text: str) -> dict:
    """Parse JSON from LLM response with cleanup and error handling."""
    try:
        cleaned = clean_json_string(text)
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}\nRaw text: {text[:500]}")
        raise ValueError(f"Failed to parse JSON from LLM response: {e}")


def extract_new_offer(text: str) -> dict | None:
    """
    Extract a revised offer from negotiation reply.
    Looks for pattern: NEW OFFER: ₹X Lakhs for Y% equity
    """
    pattern = r"NEW OFFER:\s*₹?(\d+(?:\.\d+)?)\s*Lakh[s]?\s*for\s*(\d+(?:\.\d+)?)%"
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        amount = round(float(match.group(1)))
        equity = round(float(match.group(2)))
        return {"amount": amount, "equity": equity}
    return None
