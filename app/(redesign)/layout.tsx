import dynamic from 'next/dynamic';
import { HeaderV2 } from '@/components/layout/HeaderV2';
import { FooterV2 } from '@/components/layout/FooterV2';
import { PageTransition } from '@/components/ui/PageTransition';

const FloatingKakaoCTA = dynamic(() =>
  import('@/components/ui/FloatingKakaoCTA').then((m) => m.FloatingKakaoCTA),
);

const AIChatbot = dynamic(() =>
  import('@/components/ui/AIChatbot').then((m) => m.AIChatbot),
);

export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderV2 />
      <main id="main-content" className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <FooterV2 />
      <FloatingKakaoCTA />
      <AIChatbot />
    </>
  );
}
