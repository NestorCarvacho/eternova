import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { isLocale } from "@/lib/locales";

const LOCALE_HEADER = "x-next-intl-locale";

function prefixed(pathname: string, locale: string) {
  return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
}

export default function middleware(request: NextRequest) {
  const marked = request.headers.get(LOCALE_HEADER);
  if (marked && isLocale(marked)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const foreign = routing.locales.find(
    (locale) => locale !== routing.defaultLocale && prefixed(pathname, locale),
  );

  if (foreign) {
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, foreign);
    return NextResponse.next({ request: { headers } });
  }

  if (prefixed(pathname, routing.defaultLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, routing.defaultLocale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
