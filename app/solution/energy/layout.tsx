import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "에너지",
  description:
    "위트(WEET) 에너지 옵션. 지붕 일체형 태양광, 가정용 ESS, EV 충전기로 전기요금과 정전 걱정을 줄여 스스로 전기를 만드는 세컨하우스를 설계합니다.",
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
          { name: "솔루션", path: "/solution" },
          { name: "에너지", path: "/solution/energy" },
        ]}
      />
      {children}
    </>
  );
}
