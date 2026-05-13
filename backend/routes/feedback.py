from fastapi import APIRouter, HTTPException
from models.schemas import FeedbackRequest, FeedbackResponse
from services.ai_orchestrator import run_feedback
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/investor-feedback", response_model=FeedbackResponse)
async def get_investor_feedback(request: FeedbackRequest):
    """
    Generate investor feedback from all 4 AI sharks based on pitch and answers.
    """
    try:
        result = await run_feedback(
            pitch=request.pitch,
            analysis=request.analysis,
            answers=request.answers,
        )
        return FeedbackResponse(**result)
    except Exception as e:
        logger.error(f"Feedback generation failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Feedback generation failed: {str(e)}"
        )
