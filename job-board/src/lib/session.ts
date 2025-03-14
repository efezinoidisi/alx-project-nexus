'use server';

import { SessionPayload } from '@/interfaces';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import 'server-only';

const secretKey = process.env.SECRET_KEY;

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    console.log('failed to verify session', error);

    return undefined;
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  });
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function getSession() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get('session')?.value;

  if (!cookie) return null;

  const session = await decrypt(cookie);

  return session as SessionPayload;
}
