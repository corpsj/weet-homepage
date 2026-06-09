import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "에너지 스택 옵션",
  description:
    "위트(WEET) 에너지 스택 옵션. 태양광, ESS, EV 충전기, 전력 부하 설계를 모듈러 공간 목적에 맞춰 구성합니다.",
  alternates: {
    canonical: "/solution/energy",
  },
  openGraph: {
    url: "/solution/energy",
    title: "에너지 스택 옵션",
    description:
      "위트(WEET) 에너지 스택 옵션. 태양광, ESS, EV 충전기, 전력 부하 설계를 모듈러 공간 목적에 맞춰 구성합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SolutionDesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
