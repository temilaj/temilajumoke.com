import { cookies } from 'next/headers';

export async function isAnalyticsAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('analytics_auth');

  if (!authCookie) {
    return false;
  }

  const expectedKey = process.env.ANALYTICS_API_KEY;
  return authCookie.value === expectedKey;
}
