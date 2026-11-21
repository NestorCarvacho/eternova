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

## Animación

El pack [web-animation-skills](https://github.com/iart-ai/web-animation-skills) está en `.agents/skills/` (sub-skills `gsap-web`, `micro-interaction`, `accessible-animation`, etc.). En el front, el home usa `RevealOnView`, `StaggerChildren` y utilidades CSS (`motion-press`) con soporte de `prefers-reduced-motion`.

## Railway

En Railway, el servicio de la raíz publica **sitio + API de contacto** en un solo contenedor (`railway.toml` → `deploy/Dockerfile.railway`). La API escucha en `127.0.0.1:8000` y Next en el puerto público; no hace falta `API_URL` en el front.

Opcional: API en un segundo servicio con `backend/railway.toml` y `deploy/Dockerfile.frontend` en el sitio; entonces define `API_URL` hacia la API.

Agrega **PostgreSQL** al proyecto y referencia `DATABASE_URL` en el servicio `eternova`. Variables de **correo** (`SMTP_HOST`, `CONTACT_TO`, etc.): ver `deploy/railway-variables.md`.

Los teléfonos y precios salen de la propuesta visual y hay que confirmarlos.
