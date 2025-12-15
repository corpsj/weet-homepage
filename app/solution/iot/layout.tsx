import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IoT 솔루션",
  description:
    "위트(WEET) IoT 솔루션으로 더 똑똑한 공간을 만드세요. 센서·제어·자동화를 통해 편의성과 효율을 높입니다.",
  alternates: {
    canonical: "/solution/iot",
  },
  openGraph: {
    url: "/solution/iot",
    title: "IoT 솔루션",
    description:
      "위트(WEET) IoT 솔루션으로 더 똑똑한 공간을 만드세요. 센서·제어·자동화를 통해 편의성과 효율을 높입니다.",
  },
};

export default function SolutionIotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

