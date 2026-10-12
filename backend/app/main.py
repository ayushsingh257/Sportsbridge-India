"""Main FastAPI application entrypoint for Bharat Sports Grant."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Bharat Sports Grant API",
    description="API gateway for Indian sports scholarship and athlete development platform",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root metadata endpoint."""
    return {
        "name": "Bharat Sports Grant API",
        "status": "online",
        "version": "0.1.0",
    }


@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint for platform monitoring."""
    return {
        "status": "healthy",
        "service": "api",
        "phase": 1,
    }
