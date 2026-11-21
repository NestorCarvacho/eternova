import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.config import settings
from app.db import SessionLocal, get_db
from app.mail import send_lead_email
from app.models import Lead
from app.rate_limit import allow_contact
from app.schemas import ContactIn, ContactOut

router = APIRouter()


def deliver(lead_id: uuid.UUID) -> None:
    db = SessionLocal()
    try:
        lead = db.get(Lead, lead_id)
        if lead is None:
            return
        lead.email_status = send_lead_email(lead)
        db.commit()
    finally:
        db.close()


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    if forwarded:
        return forwarded
    if request.client:
        return request.client.host
    return "unknown"


@router.post("/contact", response_model=ContactOut, status_code=201)
def create_contact(
    payload: ContactIn,
    request: Request,
    background: BackgroundTasks,
    db: Session = Depends(get_db),
) -> ContactOut:
    ip = client_ip(request)
    if ip not in ("127.0.0.1", "::1") and not allow_contact(ip):
        raise HTTPException(status_code=429, detail="too_many_requests")
    lead = Lead(
        id=uuid.uuid4(),
        name=payload.name,
        email=str(payload.email),
        phone=payload.phone,
        message=payload.message,
        plan=payload.plan,
        locale=payload.locale,
        email_status="pending" if settings.mail_enabled else "skipped",
    )
    db.add(lead)
    db.commit()
    if settings.mail_enabled:
        background.add_task(deliver, lead.id)
    return ContactOut(id=str(lead.id), status="received")
