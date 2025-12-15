import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "모듈러 건축이란?",
  description:
    "위트(WEET)가 설명하는 모듈러 건축: 하이브리드 모듈 타입, 프리패브리케이션, OSC, 조립식 건축까지 핵심 개념을 한눈에 확인하세요.",
  alternates: {
    canonical: "/modular",
  },
  openGraph: {
    url: "/modular",
    title: "모듈러 건축이란?",
    description:
      "위트(WEET)가 설명하는 모듈러 건축: 하이브리드 모듈 타입, 프리패브리케이션, OSC, 조립식 건축까지 핵심 개념을 한눈에 확인하세요.",
  },
};

export default function ModularLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

