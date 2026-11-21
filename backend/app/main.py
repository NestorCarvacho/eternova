import logging
from contextlib import asynccontextmanager
from pathlib import Path

from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import contact, health

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("eternova")


def migrate() -> None:
    root = Path(__file__).resolve().parents[1]
    config = Config(str(root / "alembic.ini"))
    config.set_main_option("script_location", str(root / "alembic"))
    command.upgrade(config, "head")


@asynccontextmanager
async def lifespan(_: FastAPI):
    migrate()
    logger.info("database ready")
    yield


app = FastAPI(title="Eternova API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["content-type", "accept"],
)
app.include_router(health.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
