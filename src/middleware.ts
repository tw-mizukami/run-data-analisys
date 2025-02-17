import { NextRequest, NextResponse } from "next/server"
import { i18n } from "./i18n-config";
import Negotiator from "negotiator";

import { match as matchLocale } from "@formatjs/intl-localematcher"

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: string[] = i18n.locales || [];
    if (locales.length === 0) {
        console.error("i18n.locales is empty or undefined");
        return i18n.defaultLocale;
    }

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale
}

export function middleware(request: NextRequest)
{
    const pathname = request.nextUrl.pathname;

    // 特定のルートを除外 (APIルートなど)
    if (pathname.startsWith("/api")) {
        return NextResponse.next(); // APIルートはそのまま通過
    }
    
    if (["/favicon.ico"].includes(pathname)) return;

    const haslocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}`)
    )

    if (!haslocale) {
        const locale = getLocale(request);
        
        const targetUrl = new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${(pathname)}`,
            request.url,
        )

        return NextResponse.redirect(targetUrl);
    }
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
}