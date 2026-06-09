import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프리미엄 모듈러 건축",
  description:
    "위트(WEET)의 프리미엄 모듈러 건축. 공장 제작의 정밀함, 예측 가능한 일정, 운송과 크레인 조립을 통한 혁신적인 공간 솔루션을 경험하세요.",
  alternates: {
    canonical: "/modular",
  },
  openGraph: {
    url: "/modular",
    title: "프리미엄 모듈러 건축",
    description:
      "위트(WEET)의 프리미엄 모듈러 건축. 공장 제작의 정밀함, 예측 가능한 일정, 운송과 크레인 조립을 통한 혁신적인 공간 솔루션을 경험하세요.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ModularLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
