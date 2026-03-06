import { HeaderV2 } from '@/components/layout/HeaderV2';
import { FooterV2 } from '@/components/layout/FooterV2';

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
    </>
  );
}
