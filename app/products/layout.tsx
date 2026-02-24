import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제품 소개",
  description:
    "위트(WEET)의 모듈러 제품 라인업을 확인하세요. S/M/L/XL부터 Solution까지 용도와 규모에 맞는 제품을 제안합니다.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    url: "/products",
    title: "제품 소개",
    description:
      "위트(WEET)의 모듈러 제품 라인업을 확인하세요. S/M/L/XL부터 Solution까지 용도와 규모에 맞는 제품을 제안합니다.",
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
