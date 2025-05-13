import { type NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, getApps, cert } from "firebase-admin/app"

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}")

  initializeApp({
    credential: cert(serviceAccount),
  })
}

export async function middleware(request: NextRequest) {
  const auth = getAuth()
  const db = getFirestore()

  // Get session cookie
  const sessionCookie = request.cookies.get("session")?.value || ""

  // If no session cookie, redirect to login
  if (!sessionCookie) {
    // Determine which login page to redirect to based on the path
    if (request.nextUrl.pathname.startsWith("/sponsor")) {
      return NextResponse.redirect(new URL("/sponsorlogin", request.url))
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true)
    const uid = decodedClaims.uid

    // Get user role from Firestore
    const userDoc = await db.collection("users").doc(uid).get()

    if (!userDoc.exists) {
      throw new Error("User not found")
    }

    const userData = userDoc.data()
    const userRole = userData?.role

    // Check if user has the correct role for the requested path
    if (request.nextUrl.pathname.startsWith("/sponsor") && userRole !== "sponsor") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (
      !request.nextUrl.pathname.startsWith("/sponsor") &&
      (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/profile")) &&
      userRole !== "student"
    ) {
      return NextResponse.redirect(new URL("/sponsorlogin", request.url))
    }

    // User is authenticated and has the correct role
    return NextResponse.next()
  } catch (error) {
    // Invalid session cookie
    // Determine which login page to redirect to based on the path
    if (request.nextUrl.pathname.startsWith("/sponsor")) {
      return NextResponse.redirect(new URL("/sponsorlogin", request.url))
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/sponsor/:path*"],
}
