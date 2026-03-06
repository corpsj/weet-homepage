import { HeaderV2 } from '@/components/layout/HeaderV2';
import { FooterV2 } from '@/components/layout/FooterV2';
import { FloatingKakaoCTA } from '@/components/ui/FloatingKakaoCTA';
import { AIChatbot } from '@/components/ui/AIChatbot';

export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderV2 />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <FooterV2 />
      <FloatingKakaoCTA />
      <AIChatbot />
    </>
  );
}
