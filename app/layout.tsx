import type { Metadata } from "next";
import { Noto_Sans_KR, Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
});

const metadataBase = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
})();

const defaultTitle = "위트(weet) — 이동식주택·모듈러주택 제작 전문";
const defaultDescription =
  "공장에서 제작해 현장에 설치하는 이동식주택 전문 기업 위트(weet). 3x6·3x9 모듈러주택을 직접 구성하고 기본 가격을 확인한 뒤, 운반·설치 조건까지 투명하게 상담받으세요.";
const siteOrigin = metadataBase.origin;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: "%s | 위트(weet)",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "위트",
    "weet",
    "이동식주택",
    "이동식주택 가격",
    "이동식주택 제작",
    "모듈러주택",
    "농막",
    "농촌체류형 쉼터",
    "세컨하우스",
    "소형주택",
    "유닛하우스",
    "프리패브",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "위트(weet)",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/OG_LOGO.webp",
        alt: "위트(weet)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/OG_LOGO.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
        ? {
          "naver-site-verification":
            process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
        }
        : {}),
    },
  },
};

import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const enableVercelAnalytics =
  process.env.VERCEL === "1" || process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true";


import { getSiteSettings } from "@/lib/site-settings.server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const organizationId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: "위트",
      legalName: "주식회사 위트",
      alternateName: ["weet", "위트(weet)"],
      url: siteOrigin,
      logo: `${siteOrigin}/images/company/weet-logo.webp`,
      sameAs: [
        "https://www.instagram.com/weet_kr/",
        "https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+82-10-9645-2348",
          contactType: "customer service",
          areaServed: "KR",
          availableLanguage: ["ko", "en"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: siteOrigin,
      name: "위트(weet)",
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteOrigin}/#localbusiness`,
      name: "위트(weet)",
      description: "이동식주택·모듈러주택 제작 전문 기업",
      url: siteOrigin,
      telephone: "+82-10-9645-2348",
      address: {
        "@type": "PostalAddress",
        streetAddress: "대동면 금산길 205-27",
        addressLocality: "함평군",
        addressRegion: "전라남도",
        addressCountry: "KR",
      },
      parentOrganization: {
        "@id": organizationId,
      },
    },
  ];

  return (
    <html lang="ko" data-scroll-behavior="smooth" className={cn("font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <ClientLayout settings={siteSettings}>{children}</ClientLayout>
        </LanguageProvider>
        {enableVercelAnalytics && <Analytics />}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
