import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "끊김 없는 연결 옵션",
  description:
    "위트(WEET) 연결 옵션. POS, 예약, 게스트 Wi-Fi, 원격 장비망을 목적별 네트워크 패브릭으로 분리합니다.",
  path: "/solution/network",
});

export default function SolutionNetworkLayout({
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
          { name: "끊김 없는 연결 옵션", path: "/solution/network" },
        ]}
      />
      {children}
    </>
  );
}
