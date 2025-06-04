import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { tokens } from "./constants/tokens.constant";

export function middleware(request: NextRequest) {
    const { url, cookies } = request;

    if (url === "http://localhost:3000/") {
        return NextResponse.redirect(new URL("/auth/login", url));
    }

    const accessToken = cookies.get(tokens.ACCESS_TOKEN)?.value;

    const isAuthPage = url.includes("/auth");

    const isMainPage = url.includes("/i");

    if (isAuthPage && accessToken) {
        return NextResponse.rewrite(new URL("/i", url));
    }

    if (isMainPage && !accessToken) {
        return NextResponse.rewrite(new URL("/auth/login", url));
    }

    return NextResponse.next();
}
