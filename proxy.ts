import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './app/lib/jwt';

const PROTECTED_ROUTES = ['/properties/add'];

async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get('session')?.value ?? '';
  const claims = token ? await verifyJwt(token) : null;

  if (!claims) {
    const url = new URL('/login', req.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/properties/add'],
};

export default proxy;
