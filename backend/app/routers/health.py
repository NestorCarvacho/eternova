from fastapi import APIRouter, HTTPException
from sqlalchemy import text

from app.db import engine

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except Exception:
        raise HTTPException(status_code=503, detail="database unavailable") from None
    return {"status": "ok"}
