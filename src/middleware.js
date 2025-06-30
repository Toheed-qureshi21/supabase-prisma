import { NextResponse } from "next/server";
import {verifyTokens } from "./utils/verify-token";


export default async function middleware(req) {
    const PUBLIC_PATHS = ["/signup", "/login"];
    const url = req.nextUrl.clone();

    const isPublic = PUBLIC_PATHS.some((path) => url.pathname.startsWith(path));

    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;
    
    
    

    if (isPublic) {
        return NextResponse.next(); // allow access
    }

    if (!accessToken && refreshToken) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
    
    try {
        const payload = await verifyTokens(accessToken);
        const refreshPayload = await verifyTokens(refreshToken)
        
        
        const requestHeaders = new Headers(req.headers);
        
        requestHeaders.set("x-user-id", payload?.sub); 
       

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (err) {
        console.error("❌ Invalid access token", err);
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ["/", "/api/tasks","/api/getProfile"],
};
