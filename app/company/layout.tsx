import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "위트(WEET)의 철학과 비전, 위트 크루와 위트 팩토리를 소개합니다. 모듈러 건축 전문 기업 위트의 이야기를 확인하세요.",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    url: "/company",
    title: "회사소개",
    description:
      "위트(WEET)의 철학과 비전, 위트 크루와 위트 팩토리를 소개합니다. 모듈러 건축 전문 기업 위트의 이야기를 확인하세요.",
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
