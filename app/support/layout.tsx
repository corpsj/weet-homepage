import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진행 과정과 확인사항",
  description:
    "처음 준비하는 이동식주택도 막막하지 않도록 위트의 구매 과정, FAQ, A/S 안내를 정리했습니다.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    url: "/support",
    title: "진행 과정과 확인사항",
    description:
      "처음 준비하는 이동식주택도 막막하지 않도록 위트의 구매 과정, FAQ, A/S 안내를 정리했습니다.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
