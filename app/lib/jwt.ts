'use server';

import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { User } from './auth/auth-types';

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
const ISSUER = process.env.JWT_ISSUER ?? 'app';
const AUDIENCE = process.env.JWT_AUDIENCE ?? 'web';

export async function signUserJwt(user: User, maxAgeSec = 60 * 60 * 24 * 7) {
  return await new SignJWT(user as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSec}s`)
    .sign(secret);
}

export async function verifyJwt(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const { id, name, email } = payload as unknown as User;
    if (!id || !name || !email) return null;
    return {
      id: String(id),
      name: String(name),
      email: String(email),
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(
  token: string,
  maxAgeSec = 60 * 60 * 24 * 7
) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSec,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
