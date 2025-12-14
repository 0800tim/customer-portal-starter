import { NextRequest, NextResponse } from 'next/server'
import { aiva } from '@/lib/aiva'
import { createSession, setSessionCookie } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(new URL('/login?error=missing_token', request.url))
    }

    // Verify magic link token with AIVA
    const { customerId, email } = await aiva.auth.verifyMagicLink(token)

    // Create session token
    const sessionToken = await createSession(customerId, email)

    // Set session cookie
    await setSessionCookie(sessionToken)

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=invalid_token', request.url))
  }
}
