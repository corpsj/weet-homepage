import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "시큐리티",
  description:
    "위트(WEET) 시큐리티 옵션. 집을 지키는 눈 — CCTV, 스마트락, 동작 감지 조명을 한 번에 설계해 멀리 떨어진 세컨하우스도 스마트폰으로 출입과 주변을 확인합니다.",
  path: "/solution/cctv",
});

export default function SolutionCctvLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", path: "/" },
          { name: "솔루션", path: "/solution" },
          { name: "시큐리티", path: "/solution/cctv" },
        ]}
      />
      {children}
    </>
  );
}
