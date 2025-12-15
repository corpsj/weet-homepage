import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고객지원",
  description:
    "위트(WEET) 고객지원: 구매 방법, 방문 예약, 상담·견적 문의, Q/A, A/S까지 한 번에 안내합니다.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    url: "/support",
    title: "고객지원",
    description:
      "위트(WEET) 고객지원: 구매 방법, 방문 예약, 상담·견적 문의, Q/A, A/S까지 한 번에 안내합니다.",
  },
};

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

