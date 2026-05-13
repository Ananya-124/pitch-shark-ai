"""
PitchPilot AI — FastAPI Backend
================================
AI-powered startup evaluation and investor simulation platform.

Run with:
    uvicorn main:app --reload --port 8000

Environment:
    Copy .env.example to .env and configure AI_PROVIDER + API keys.
"""
import os
import logging
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routes import analyze_router, feedback_router, negotiation_router

# ── Logging ────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


# ── Lifespan ───────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    provider = os.getenv("AI_PROVIDER", "mock")
    logger.info(f"🚀 PitchPilot AI backend starting — AI provider: {provider.upper()}")
    yield
    logger.info("🛑 PitchPilot AI backend shutting down")


# ── App ────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="PitchPilot AI API",
    description="AI-powered startup evaluation and investor simulation platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── CORS ───────────────────────────────────────────────────────────────────
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ─────────────────────────────────────────────────────────────────
app.include_router(analyze_router, tags=["Analysis"])
app.include_router(feedback_router, tags=["Investor Feedback"])
app.include_router(negotiation_router, tags=["Negotiation"])


# ── Health ─────────────────────────────────────────────────────────────────
@app.get("/health", tags=["Health"])
async def health_check():
    return JSONResponse({
        "status": "ok",
        "service": "PitchPilot AI",
        "version": "1.0.0",
        "provider": os.getenv("AI_PROVIDER", "mock"),
    })


@app.get("/", tags=["Root"])
async def root():
    return JSONResponse({
        "message": "Welcome to PitchPilot AI API",
        "docs": "/docs",
        "health": "/health",
        "endpoints": [
            "POST /analyze",
            "POST /investor-feedback",
            "POST /negotiation",
        ],
    })


# ── Entry point ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        log_level="info",
    )
