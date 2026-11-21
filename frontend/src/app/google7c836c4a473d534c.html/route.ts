const BODY = "google-site-verification: google7c836c4a473d534c.html";

export const dynamic = "force-static";

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}