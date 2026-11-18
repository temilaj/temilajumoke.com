import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ANALYTICS_AUTH_COOKIE } from '@/lib/analytics/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ANALYTICS_AUTH_COOKIE);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics Auth] Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
