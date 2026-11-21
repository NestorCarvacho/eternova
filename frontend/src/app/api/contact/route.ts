import { NextRequest, NextResponse } from "next/server";
import { resolveBackendUrl } from "@/lib/backend-url";

export const dynamic = "force-dynamic";

/** Proxy de diagnóstico al mismo endpoint que usa el formulario. */
export async function POST(request: NextRequest) {
  const base = resolveBackendUrl();
  const body = await request.text();
  try {
    const res = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-forwarded-for": request.headers.get("x-forwarded-for") ?? "diagnostic",
      },
      body,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "unreachable", api: base }, { status: 503 });
  }
}