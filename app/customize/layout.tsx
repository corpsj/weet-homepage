import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "주문하기",
  description: "위트 이동식주택을 필요한 크기와 옵션으로 직접 구성하고 주문 요청을 남겨보세요.",
};

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
