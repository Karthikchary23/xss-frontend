import { NextResponse } from "next/server";

export function middleware(req) {
  const idToken = req.cookies.get("token"); 
  console.log(idToken); // Log the idToken for debugging
  const url = req.nextUrl.pathname; // Get the current path

  if (idToken && (url === "/" || url === "/login")) {
    // If idToken is present and accessing root or login, redirect to /home
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!idToken && url === "/home") {
    // If no idToken and trying to access /home, redirect to /login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/", "/home","/login"], // Apply middleware to root and /home paths
};