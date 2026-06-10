import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "모듈러주택 공장 제작·설치 과정",
  description:
    "이동식주택이 공장에서 제작되어 현장에 설치되기까지 — 위트(weet)의 모듈러 건축 공정을 단계별로 소개합니다. 공장 제작, 운송, 크레인 설치, 입주 후 관리까지 확인하세요.",
  alternates: {
    canonical: "/modular",
  },
  openGraph: {
    url: "/modular",
    title: "모듈러주택 공장 제작·설치 과정 | 위트(weet)",
    description:
      "이동식주택이 공장에서 제작되어 현장에 설치되기까지의 공정을 단계별로 소개합니다.",
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
