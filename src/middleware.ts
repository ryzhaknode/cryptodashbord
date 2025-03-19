import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse {
    const tokenObj = req.cookies.get("auth_token");
    const token: string | undefined = tokenObj?.value;

    console.log(`middleware-token: ${token}`);

    const isAuthPage = req.nextUrl.pathname === "/auth";

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
        matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
};