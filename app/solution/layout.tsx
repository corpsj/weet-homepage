import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOLUTION",
  description:
    "위트(WEET)가 제안하는 통합 라이프스타일 솔루션. 시큐리티·네트워크·IoT·디자인까지 안전하고 편리한 일상을 위한 솔루션을 확인하세요.",
  alternates: {
    canonical: "/solution",
  },
  openGraph: {
    url: "/solution",
    title: "SOLUTION",
    description:
      "위트(WEET)가 제안하는 통합 라이프스타일 솔루션. 시큐리티·네트워크·IoT·디자인까지 안전하고 편리한 일상을 위한 솔루션을 확인하세요.",
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
