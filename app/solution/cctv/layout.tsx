import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시큐리티 솔루션",
  description:
    "위트(WEET) 시큐리티 솔루션으로 공간과 자산을 24시간 안전하게 지키세요. CCTV부터 출입 감시까지 맞춤 보안 구성을 제공합니다.",
  alternates: {
    canonical: "/solution/cctv",
  },
  openGraph: {
    url: "/solution/cctv",
    title: "시큐리티 솔루션",
    description:
      "위트(WEET) 시큐리티 솔루션으로 공간과 자산을 24시간 안전하게 지키세요. CCTV부터 출입 감시까지 맞춤 보안 구성을 제공합니다.",
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
