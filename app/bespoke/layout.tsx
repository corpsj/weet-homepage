import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BESPOKE 상업 공간 맞춤 솔루션",
  description:
    "위트(WEET)의 상업 공간 맞춤 솔루션. 카페, 팝업스토어, 워크스페이스, 숙박 시설 등 비즈니스 목적에 맞춘 프리미엄 모듈러 공간을 제안합니다.",
  alternates: {
    canonical: "/bespoke",
  },
  openGraph: {
    url: "/bespoke",
    title: "BESPOKE 상업 공간 맞춤 솔루션",
    description:
      "위트(WEET)의 상업 공간 맞춤 솔루션. 카페, 팝업스토어, 워크스페이스, 숙박 시설 등 비즈니스 목적에 맞춘 프리미엄 모듈러 공간을 제안합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BespokeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
