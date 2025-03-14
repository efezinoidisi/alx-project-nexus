import { NextRequest, NextResponse } from 'next/server';
import { SessionPayload } from './interfaces';
import { api } from './lib/api';
import { encrypt, getSession } from './lib/session';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const session = await getSession();

  if (!session?.user) {
    const redirectUrl = new URL('/login', request.url);

    redirectUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next();

  const expires = new Date(session.expiresAt);

  const isTokenExpired = session.expiresAt && Date.now() > expires.getTime();

  if (isTokenExpired) {
    try {
      const res = await api.post('/auth/refresh/', {
        refresh_token: session.refreshToken,
      });

      if (!res.data.access_token) {
        throw new Error('Invalid refresh token');
      }

      const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

      const newSessionPayload: SessionPayload = {
        ...session,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        expiresAt,
      };

      const newSession = await encrypt(newSessionPayload);

      response.cookies.set({
        name: 'session',
        value: newSession,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      console.log('refreshed');
    } catch (error) {
      console.log(error);
    }
  }
  return response;
}

export const config = {
  matcher: ['/job/:id/apply'],
};
