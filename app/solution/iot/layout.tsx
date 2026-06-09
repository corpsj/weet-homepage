import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "원격 준비 옵션",
  description:
    "위트(WEET) 원격 준비 옵션. 조명, 냉난방, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 설계합니다.",
  alternates: {
    canonical: "/solution/iot",
  },
  openGraph: {
    url: "/solution/iot",
    title: "원격 준비 옵션",
    description:
      "위트(WEET) 원격 준비 옵션. 조명, 냉난방, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 설계합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SolutionIotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
