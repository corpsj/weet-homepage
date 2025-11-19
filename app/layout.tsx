import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "weet:) - We make dreams come true",
  description: "모듈러 건축 전문 기업 위트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={geist.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[100px] md:pt-[140px] lg:pt-[180px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
