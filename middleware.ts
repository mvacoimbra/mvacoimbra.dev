import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/((?!api|admin|_payload-demo|my-route|_next|favicon|favicon.ico|.*\\..*).*)',
  ],
}
