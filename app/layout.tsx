import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const metadataBase = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
})();

const defaultTitle = "위트(WEET) - 모듈러 건축 전문 기업";
const defaultDescription = "모듈러 건축 전문 기업 위트(WEET)";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: "%s | 위트(WEET)",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "위트",
    "WEET",
    "weet",
    "모듈러 건축",
    "모듈러주택",
    "프리패브",
    "유닛하우스",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "위트(WEET)",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/company/weet-logo.png",
        width: 512,
        height: 512,
        alt: "위트(WEET) 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/company/weet-logo.png"],
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

import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
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
