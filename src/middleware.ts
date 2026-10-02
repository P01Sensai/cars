import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic in-memory rate limiting store (Note: In a serverless environment like Vercel, this resets frequently. For production, use Upstash Redis)
const ipRateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute per IP

export function middleware(request: NextRequest) {
  // Only apply rate limiting to the chat API
  if (request.nextUrl.pathname.startsWith('/api/chat')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    
    const now = Date.now();
    const requestData = ipRateLimitMap.get(ip);

    if (!requestData) {
      ipRateLimitMap.set(ip, { count: 1, timestamp: now });
    } else {
      const timePassed = now - requestData.timestamp;

      if (timePassed < RATE_LIMIT_WINDOW_MS) {
        if (requestData.count >= MAX_REQUESTS_PER_WINDOW) {
          return new NextResponse(
            JSON.stringify({ error: 'Too Many Requests. Please wait a moment before asking another question.' }),
            { 
              status: 429, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
        }
        requestData.count++;
      } else {
        // Reset window
        ipRateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    }
  }

  // Add a security header in middleware as well for good measure
  const response = NextResponse.next();
  response.headers.set('X-API-Version', 'v1');
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
