import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "운영 솔루션",
    description:
      "위트(WEET)의 운영 솔루션. 보안, 네트워크, 원격 제어, 에너지 스택을 모듈러 공간 목적에 맞춰 설계합니다.",
    path: "/solution",
  }),
  // `default` must NOT pre-include the brand suffix: this layout is a direct
  // child of the root layout, whose template ("%s | 위트(weet)") is applied on
  // top of it. The `template` here adds the suffix to the /solution/* children.
  title: { default: "운영 솔루션", template: "%s | 위트(weet)" },
};

export default function SolutionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
