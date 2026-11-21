import re
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

PLANS = {"cremacion-basica", "cremacion-signature", "cremacion-vip"}


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=30)
    message: str = Field(min_length=10, max_length=2000)
    plan: str | None = Field(default=None, max_length=40)
    locale: Literal["es", "en", "fr", "it", "pt"] = "es"

    @field_validator("name", "phone", "message")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()

    @field_validator("phone")
    @classmethod
    def phone_shape(cls, value: str) -> str:
        digits = re.sub(r"\D", "", value)
        if len(digits) < 8 or len(digits) > 15 or not re.fullmatch(r"[0-9+().\-\s]+", value):
            raise ValueError("invalid phone")
        return value

    @field_validator("plan")
    @classmethod
    def known_plan(cls, value: str | None) -> str | None:
        if value and value not in PLANS:
            raise ValueError("invalid plan")
        return value


class ContactOut(BaseModel):
    id: str
    status: str
