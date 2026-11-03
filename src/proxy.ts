import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;

    if(!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
    "/profile",
    "/my-books",
    "/borrows/path",
    "/add-books",
    "/books/:id",
],
};