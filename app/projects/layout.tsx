import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const base = buildPageMetadata({
  title: "이동식주택 시공 사례·제작 현장 기록",
  description:
    "위트(weet) 이동식주택의 시공 사례와 공장 제작·운송·설치 현장 기록입니다. 검증된 사례만 공개하며, 용접·단열·도장부터 현장 설치까지 실제 작업 과정을 확인하세요.",
  path: "/projects",
});

// The `/projects/[id]` detail route is a grandchild of the root layout, so the
// root template ("%s | 위트(weet)") does not reach it. Defining the template
// here lets the detail page's plain-string title gain the brand suffix while the
// listing page keeps its own title via `default`. (review backlog F20)
export const metadata: Metadata = {
  ...base,
  // `default` omits the brand suffix — the root template appends it for the
  // /projects listing; the `template` here adds it to /projects/[id] children.
  title: {
    default: "이동식주택 시공 사례·제작 현장 기록",
    template: "%s | 위트(weet)",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
