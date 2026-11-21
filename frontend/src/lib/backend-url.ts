/** Base URL del servicio FastAPI (sin barra final). Solo servidor. */
export function resolveBackendUrl(): string {
  const configured = process.env.API_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const privateHost =
    process.env.API_RAILWAY_PRIVATE_DOMAIN?.trim() ||
    process.env.BACKEND_RAILWAY_PRIVATE_DOMAIN?.trim();
  if (privateHost) {
    const port =
      process.env.API_PORT?.trim() ||
      process.env.BACKEND_PORT?.trim() ||
      "8000";
    return `http://${privateHost}:${port}`;
  }

  return "http://127.0.0.1:8000";
}