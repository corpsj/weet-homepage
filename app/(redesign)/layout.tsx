import type { Metadata } from 'next'
import { HeaderV2 } from '@/components/layout/HeaderV2'
import { FooterV2 } from '@/components/layout/FooterV2'
import { PageTransition } from '@/components/ui/PageTransition'
import { KakaoProvider } from '@/components/providers/KakaoProvider'
import { Toaster } from '@/components/ui/sonner'
import { FloatingKakaoCTA } from '@/components/ui/FloatingKakaoCTA'
import { AIChatbot } from '@/components/ui/AIChatbot'
import { EasterEggs } from '@/components/ui/EasterEggs'

export const metadata: Metadata = {
  title: {
    default: 'weet:) | 시스템건축',
    template: '%s | weet:) 시스템건축',
  },
  description: '시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업 위트',
}

export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <KakaoProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-[#2D2D2A] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        본문으로 건너뛰기
      </a>
      <HeaderV2 />
      <main id="main-content" className="min-h-screen pt-20">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <FooterV2 />
      <FloatingKakaoCTA />
      <AIChatbot />
      <EasterEggs />
      <Toaster />
    </KakaoProvider>
  )
}
