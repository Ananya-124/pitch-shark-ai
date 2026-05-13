from fastapi import APIRouter, HTTPException
from models.schemas import PitchData, StartupAnalysis
from services.ai_orchestrator import run_analysis
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/analyze", response_model=StartupAnalysis)
async def analyze_startup(pitch: PitchData):
    """
    Analyze a startup pitch and return scoring, SWOT, and investment metrics.
    """
    try:
        result = await run_analysis(pitch)
        return StartupAnalysis(**result)
    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
