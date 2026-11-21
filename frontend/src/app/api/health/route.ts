import { NextResponse } from "next/server";
import { resolveBackendUrl } from "@/lib/backend-url";

export const dynamic = "force-dynamic";

/** Comprueba que la API del mismo contenedor responde (Railway monolito). */
export async function GET() {
  const base = resolveBackendUrl();
  try {
    const res = await fetch(`${base}/api/health`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json(
      { status: "unreachable", api: base },
      { status: 503 },
    );
  }
}