import uuid

from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session

from app.config import settings
from app.db import SessionLocal, get_db
from app.mail import send_lead_email
from app.models import Lead
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


@router.post("/contact", response_model=ContactOut, status_code=201)
def create_contact(
    payload: ContactIn,
    background: BackgroundTasks,
    db: Session = Depends(get_db),
) -> ContactOut:
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
