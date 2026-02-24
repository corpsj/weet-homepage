import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "디자인 솔루션",
  description:
    "위트(WEET) 디자인 솔루션으로 공간의 완성도를 높이세요. 목적과 브랜드에 맞춘 컨셉·마감·동선을 제안합니다.",
  alternates: {
    canonical: "/solution/design",
  },
  openGraph: {
    url: "/solution/design",
    title: "디자인 솔루션",
    description:
      "위트(WEET) 디자인 솔루션으로 공간의 완성도를 높이세요. 목적과 브랜드에 맞춘 컨셉·마감·동선을 제안합니다.",
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
