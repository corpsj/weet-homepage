import type { NextConfig } from "next";

const enableHttpsOnlyHeaders =
  process.env.VERCEL === '1' || process.env.ENABLE_HTTPS_ONLY_HEADERS === 'true';

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
  // 개발 인디케이터(좌하단 N 위젯)가 /customize 모바일 하단 고정 견적 바를 덮어 가격 가독성을 해치므로 비활성화한다.
  devIndicators: false,
  images: {
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
