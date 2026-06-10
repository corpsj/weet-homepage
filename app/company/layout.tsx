import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개 — 이동식주택 제작 기업 위트",
  description:
    "전남 함평의 자체 공장에서 이동식주택을 제작하는 위트(weet)를 소개합니다. 철학과 비전, 위트 크루, 위트 팩토리의 실제 모습을 확인하세요.",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    url: "/company",
    title: "회사소개 — 이동식주택 제작 기업 위트(weet)",
    description:
      "전남 함평의 자체 공장에서 이동식주택을 제작하는 위트(weet)의 철학과 팀, 공장을 소개합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
