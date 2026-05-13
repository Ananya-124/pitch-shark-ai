from fastapi import APIRouter, HTTPException
from models.schemas import NegotiationRequest, NegotiationResponse
from services.ai_orchestrator import run_negotiation
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/negotiation", response_model=NegotiationResponse)
async def negotiate(request: NegotiationRequest):
    """
    Generate a negotiation response from an AI shark.
    Detects and returns revised offers when the shark changes terms.
    """
    try:
        result = await run_negotiation(
            pitch=request.pitch,
            analysis=request.analysis,
            shark_id=request.shark_id,
            current_offer=request.current_offer,
            feedback=request.feedback,
            chat_history=request.chat_history,
            user_message=request.user_message,
        )
        return NegotiationResponse(**result)
    except Exception as e:
        logger.error(f"Negotiation failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Negotiation failed: {str(e)}"
        )
