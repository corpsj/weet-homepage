import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "끊김 없는 연결 옵션",
  description:
    "위트(WEET) 네트워크 옵션. 산속·외진 부지의 세컨하우스도 집 전체 와이파이와 위성·LTE 백업으로 어느 방에서든 끊김 없이 연결합니다.",
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
          { name: "솔루션", path: "/solution" },
          { name: "네트워크", path: "/solution/network" },
        ]}
      />
      {children}
    </>
  );
}
