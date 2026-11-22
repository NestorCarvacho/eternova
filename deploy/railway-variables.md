# Variables en Railway (servicio `eternova`)

Tras el deploy con `deploy/Dockerfile.railway`, la API corre en el mismo contenedor (`API_URL` ya va en `http://127.0.0.1:8000`).

## Obligatorio para datos persistentes

1. En el proyecto: **+ New** → **Database** → **PostgreSQL**.
2. En el servicio **eternova** → **Variables** → **Add Reference**:
   - `DATABASE_URL` ← `${{Postgres.DATABASE_URL}}` (o el nombre de tu plugin Postgres).

Sin Postgres, los mensajes se guardan en SQLite dentro del contenedor y se pierden al redesplegar.

## Sitio público y SEO

```env
NEXT_PUBLIC_SITE_URL=https://eternova-production.up.railway.app
```

Si no la defines, el sitemap y `robots.txt` usan `RAILWAY_PUBLIC_DOMAIN` (ya funciona en producción).

- **Sitemap:** `https://eternova-production.up.railway.app/sitemap.xml`
- **Robots:** `https://eternova-production.up.railway.app/robots.txt`

En [Google Search Console](https://search.google.com/search-console) → Sitemaps → añade la URL del sitemap.

## Correo (formulario → bandeja)

| Variable | Descripción |
|----------|-------------|
| `SMTP_HOST` | p. ej. `smtp.gmail.com`, `smtp.office365.com` |
| `SMTP_PORT` | `587` (TLS) o `465` (SSL) |
| `SMTP_USER` | usuario SMTP |
| `SMTP_PASSWORD` | contraseña o *app password* |
| `CONTACT_TO` | correo donde recibes los leads |
| `SMTP_FROM` | opcional; suele ser el mismo que `SMTP_USER` |
| `SMTP_USE_SSL` | `true` solo con puerto 465 |

Hasta que `SMTP_HOST` y `CONTACT_TO` estén definidos, el formulario **sí guarda** el mensaje en la base; el correo queda en `skipped`.

## Gmail (ejemplo)

- Cuenta con verificación en dos pasos.
- App password en Google → `SMTP_PASSWORD`.
- `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USE_TLS=true`.