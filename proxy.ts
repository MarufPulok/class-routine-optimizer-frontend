import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define public paths that should NOT be protected by proxy
const PUBLIC_PATHS = ['/login', '/register'];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

async function authProxy(req: NextRequestWithAuth) {
  const isPublic = isPublicPath(req.nextUrl.pathname);
  const token = req.nextauth.token;

  // Handle public paths first
  if (isPublic) {
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export default withAuth(authProxy, {
  callbacks: {
    authorized: async () => true,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth routes)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

