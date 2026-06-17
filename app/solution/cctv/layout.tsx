import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "안심 출입 옵션",
  description:
    "위트(WEET) 안심 출입 옵션. CCTV, 스마트 도어락, 센서등, 출입 알림을 보안 코어로 설계합니다.",
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
          { name: "운영 솔루션", path: "/solution" },
          { name: "안심 출입 옵션", path: "/solution/cctv" },
        ]}
      />
      {children}
    </>
  );
}
