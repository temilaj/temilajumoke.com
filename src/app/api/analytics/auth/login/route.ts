import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    const expectedKey = process.env.ANALYTICS_API_KEY;

    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Set secure HTTP-only cookie for authentication
    const cookieStore = await cookies();
    cookieStore.set('analytics_auth', apiKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics Auth] Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
