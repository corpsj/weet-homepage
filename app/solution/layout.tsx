import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "솔루션",
    description:
      "위트(WEET) 솔루션. 시큐리티, 네트워크, IoT, 에너지를 모듈러 주택의 생활 목적에 맞춰 설계합니다.",
    path: "/solution",
  }),
  // `default` must NOT pre-include the brand suffix: this layout is a direct
  // child of the root layout, whose template ("%s | 위트(weet)") is applied on
  // top of it. The `template` here adds the suffix to the /solution/* children.
  title: { default: "솔루션", template: "%s | 위트(weet)" },
};

export default function SolutionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
