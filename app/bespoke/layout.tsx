import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BESPOKE",
  description:
    "위트(WEET)의 BESPOKE는 아이디어를 현실로 만드는 맞춤형 모듈러 솔루션입니다. 용도·예산·일정에 맞춰 1:1로 제안합니다.",
  alternates: {
    canonical: "/bespoke",
  },
  openGraph: {
    url: "/bespoke",
    title: "BESPOKE",
    description:
      "위트(WEET)의 BESPOKE는 아이디어를 현실로 만드는 맞춤형 모듈러 솔루션입니다. 용도·예산·일정에 맞춰 1:1로 제안합니다.",
  },
};

export default function BespokeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

