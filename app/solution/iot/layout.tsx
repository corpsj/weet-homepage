import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "IoT 옵션",
  description:
    "위트(WEET) IoT 옵션. 조명, 냉난방, 환기, 도어 상태를 도착 시간에 맞춰 자동으로 준비되게 설계합니다. 문을 열면 이미 쾌적한 집.",
  path: "/solution/iot",
});

export default function SolutionIotLayout({
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
          { name: "IoT 옵션", path: "/solution/iot" },
        ]}
      />
      {children}
    </>
  );
}
