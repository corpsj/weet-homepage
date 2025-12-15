import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "네트워크 솔루션",
  description:
    "위트(WEET) 네트워크 솔루션으로 안정적인 인터넷 환경을 구축하세요. 공간 특성에 맞춘 라우팅·배선·장비 구성을 제안합니다.",
  alternates: {
    canonical: "/solution/network",
  },
  openGraph: {
    url: "/solution/network",
    title: "네트워크 솔루션",
    description:
      "위트(WEET) 네트워크 솔루션으로 안정적인 인터넷 환경을 구축하세요. 공간 특성에 맞춘 라우팅·배선·장비 구성을 제안합니다.",
  },
};

export default function SolutionNetworkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

