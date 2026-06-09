import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "끊김 없는 연결 옵션",
  description:
    "위트(WEET) 연결 옵션. POS, 예약, 게스트 Wi-Fi, 원격 장비망을 목적별 네트워크 패브릭으로 분리합니다.",
  alternates: {
    canonical: "/solution/network",
  },
  openGraph: {
    url: "/solution/network",
    title: "끊김 없는 연결 옵션",
    description:
      "위트(WEET) 연결 옵션. POS, 예약, 게스트 Wi-Fi, 원격 장비망을 목적별 네트워크 패브릭으로 분리합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SolutionNetworkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
