import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커스터마이징",
  description: "위트 모듈러 커스터마이징 - 나만의 공간을 만들어보세요",
};

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
