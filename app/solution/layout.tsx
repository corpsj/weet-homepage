import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "운영 솔루션",
  description:
    "위트(WEET)의 운영 솔루션. 보안, 네트워크, 원격 제어, 에너지 스택을 모듈러 공간 목적에 맞춰 설계합니다.",
  alternates: {
    canonical: "/solution",
  },
  openGraph: {
    url: "/solution",
    title: "운영 솔루션",
    description:
      "위트(WEET)의 운영 솔루션. 보안, 네트워크, 원격 제어, 에너지 스택을 모듈러 공간 목적에 맞춰 설계합니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SolutionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
