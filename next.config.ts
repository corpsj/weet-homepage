import type { NextConfig } from "next";

const enableHttpsOnlyHeaders =
  process.env.VERCEL === '1' || process.env.ENABLE_HTTPS_ONLY_HEADERS === 'true';

// NOTE (F31): `'unsafe-inline'` is retained for script-src on purpose. Removing it
// would require either a per-request nonce — which forces every page to render
// dynamically and would undo the static/ISR caching added for the public pages
// (F12) — or static hashes, which cannot cover the inline bootstrap scripts that
// GTM/GA (@next/third-parties) and Microsoft Clarity (whose snippet interpolates a
// runtime env id) inject. Eliminating it cleanly needs a deliberate analytics
// re-architecture (e.g. nonce-based CSP with analytics moved behind it) and is
// tracked as a follow-up rather than bundled here. `'unsafe-eval'` is already
// dev-only, and script sources are otherwise restricted to an explicit allowlist.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  process.env.NODE_ENV !== 'production' ? "'unsafe-eval'" : '',
  'https://www.googletagmanager.com',
  'https://www.clarity.ms',
  'https://scripts.clarity.ms',
].filter(Boolean).join(' ');

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://scontent.cdninstagram.com https://*.cdninstagram.com https://*.fbcdn.net https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://*.supabase.in https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com",
  "worker-src 'self' blob:",
  "media-src 'self' data: blob:",
  "manifest-src 'self'",
  enableHttpsOnlyHeaders ? "upgrade-insecure-requests" : '',
].filter(Boolean).join('; ');

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  ...(enableHttpsOnlyHeaders
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  // 개발 인디케이터(좌하단 N 위젯)가 /customize 모바일 하단 고정 견적 바를 덮어 가격 가독성을 해치므로 비활성화한다.
  devIndicators: false,
  images: {
    // Global loader: bypass Vercel's image optimizer (which 402s when quota is
    // exhausted) and route Supabase images through Supabase's render transform. (F01)
    loaderFile: './lib/image/supabase-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.in',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  async redirects() {
    return [
      // Deprecated stray solution route (was an in-component redirect cloning
      // Energy metadata) — permanently send to the solution hub. (F05)
      { source: '/solution/design', destination: '/solution', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
