from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./data/eternova.db"
    cors_origins: str = "http://localhost:3000,http://localhost"
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = ""
    contact_to: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def mail_enabled(self) -> bool:
        return bool(self.smtp_host and self.contact_to)


settings = Settings()

if settings.database_url.startswith("sqlite:///./"):
    Path("data").mkdir(parents=True, exist_ok=True)
