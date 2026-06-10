import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이동식주택·소형주택 제품 라인업",
  description:
    "농막 규모의 3x3·3x6부터 세컨하우스용 3x9, 모듈 조합 주택까지 — 위트(weet) 이동식주택 라인업을 용도와 크기별로 확인하세요. 기준 모델 가격은 맞춤 구성에서 공개됩니다.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    url: "/products",
    title: "이동식주택·소형주택 제품 라인업 | 위트(weet)",
    description:
      "농막 규모의 3x3·3x6부터 세컨하우스용 3x9, 모듈 조합 주택까지 용도와 크기별 라인업을 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
