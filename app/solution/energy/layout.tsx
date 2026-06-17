import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "에너지 스택 옵션",
  description:
    "위트(WEET) 에너지 스택 옵션. 태양광, ESS, EV 충전기, 전력 부하 설계를 모듈러 공간 목적에 맞춰 구성합니다.",
  path: "/solution/energy",
});

export default function SolutionEnergyLayout({
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
          { name: "에너지 스택 옵션", path: "/solution/energy" },
        ]}
      />
      {children}
    </>
  );
}
