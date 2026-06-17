import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "원격 준비 옵션",
  description:
    "위트(WEET) 원격 준비 옵션. 조명, 냉난방, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 설계합니다.",
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
          { name: "운영 솔루션", path: "/solution" },
          { name: "원격 준비 옵션", path: "/solution/iot" },
        ]}
      />
      {children}
    </>
  );
}
