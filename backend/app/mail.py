import logging
import smtplib
from email.message import EmailMessage

from app.config import settings
from app.models import Lead

logger = logging.getLogger("eternova")


def _single_line(value: str) -> str:
    return value.replace("\r", " ").replace("\n", " ").strip()


def send_lead_email(lead: Lead) -> str:
    if not settings.mail_enabled:
        return "skipped"

    message = EmailMessage()
    message["Subject"] = f"Eternova: {_single_line(lead.name)}"
    message["From"] = settings.smtp_from or settings.smtp_user or "noreply@eternova.local"
    message["To"] = settings.contact_to
    message.set_content(
        "\n".join(
            [
                f"Nombre: {lead.name}",
                f"Correo: {lead.email}",
                f"Teléfono: {lead.phone}",
                f"Plan: {lead.plan or '-'}",
                f"Idioma: {lead.locale}",
                "",
                lead.message,
            ]
        )
    )

    try:
        if settings.smtp_use_ssl or settings.smtp_port == 465:
            with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
                if settings.smtp_user:
                    smtp.login(settings.smtp_user, settings.smtp_password)
                smtp.send_message(message)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
                if settings.smtp_use_tls:
                    smtp.starttls()
                if settings.smtp_user:
                    smtp.login(settings.smtp_user, settings.smtp_password)
                smtp.send_message(message)
        return "sent"
    except Exception as exc:
        logger.error("lead email failed id=%s error=%s", lead.id, type(exc).__name__)
        return "failed"
