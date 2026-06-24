import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "이동식주택 인허가·비용·진행 과정 안내",
  description:
    "농막·농촌체류형 쉼터 인허가 구분, 운반·설치 비용 구성, 구매 과정과 A/S까지 — 이동식주택을 준비할 때 실제로 궁금한 질문에 답합니다. 상담 신청도 이 페이지에서 바로 가능합니다.",
  path: "/support",
});

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
