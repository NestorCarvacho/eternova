# Eternova

Sitio público de coordinación de cremación, con front en Next.js y API en FastAPI.

## Páginas

Inicio, servicios, detalle de cada plan, proceso, preguntas frecuentes, crematorios, sobre Eternova, contacto y privacidad. Español en la raíz e inglés en `/en`.

## Desarrollo local

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

El front llama a `API_URL` (por defecto `http://127.0.0.1:8000`). En local la API usa SQLite en `backend/data`.

## Docker

Desde la raíz del repositorio:

```bash
docker compose up --build
```

El sitio queda en `http://localhost`. `/api/health` responde desde la API. Postgres, el back y el front van en contenedores distintos; Caddy publica el puerto 80.

La clave de Postgres del Compose es solo para desarrollo. Cámbiala antes de publicar. El aviso por correo se activa con `SMTP_HOST` y `CONTACT_TO` en el servicio `backend`.

Los teléfonos y precios salen de la propuesta visual y hay que confirmarlos.
