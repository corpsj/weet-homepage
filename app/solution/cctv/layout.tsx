import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "안심 출입 옵션",
  description:
    "위트(WEET) 안심 출입 옵션. CCTV, 스마트 도어락, 센서등, 출입 알림을 현장 운영 흐름에 맞춰 설계합니다.",
  alternates: {
    canonical: "/solution/cctv",
  },
  openGraph: {
    url: "/solution/cctv",
    title: "안심 출입 옵션",
    description:
      "위트(WEET) 안심 출입 옵션. CCTV, 스마트 도어락, 센서등, 출입 알림을 현장 운영 흐름에 맞춰 설계합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SolutionCctvLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
