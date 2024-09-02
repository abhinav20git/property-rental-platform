import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export async function middleware(request) {
  const traditionalUser = getCookie('traditionalUser', { req: request });
  const OAuthUser = getCookie('authjs.session-token', { req: request });

  console.log('Traditional User:', traditionalUser);
  console.log('OAuth User:', OAuthUser);

  // const isAuth = traditionalUser || OAuthUser;

  // Redirect to home if logged in and trying to access signin/signup
  // if (isAuth && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup')) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // // Redirect to home if not logged in and trying to access protected routes
  // if (!isAuth && (request.nextUrl.pathname === '/manage-account' || request.nextUrl.pathname === '/cart')) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}
