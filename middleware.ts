import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith('/admin') && !req.nextauth.token) {
            return NextResponse.rewrite(
                new URL('/login?message=u r not logged in', req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ((token) => {
                /**
                 * if return true, allow access
                 * if false, redirect to login page
                 */
                // return true if token exists
                return !!token;
            })
        }
    }


)

export const config = {
    matcher: [
        '/admin/:path*'
    ],
}