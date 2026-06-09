import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "현장 완성 옵션",
  description:
    "위트(WEET) 현장 완성 옵션. 외장재, 간판 위치, 데크 동선, 조경과 배수 마감을 브랜드와 상권에 맞춥니다.",
  alternates: {
    canonical: "/solution/design",
  },
  openGraph: {
    url: "/solution/design",
    title: "현장 완성 옵션",
    description:
      "위트(WEET) 현장 완성 옵션. 외장재, 간판 위치, 데크 동선, 조경과 배수 마감을 브랜드와 상권에 맞춥니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SolutionDesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
