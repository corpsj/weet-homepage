import Link from 'next/link';
import { ArrowLeft, PhoneCall } from 'lucide-react';

export function ConfiguratorAppBar({ contactPhone }: { contactPhone?: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-weet-line bg-weet-surface/95 px-4 backdrop-blur md:h-16 md:px-6">
      <Link
        href="/"
        aria-label="위트 홈으로"
        className="inline-flex items-center gap-2 rounded-md text-sm font-bold text-weet-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        WEET
      </Link>
      <div className="text-center">
        <p className="text-sm font-black text-weet-ink">위트 맞춤제작</p>
        <p className="text-xs text-weet-muted">나만의 위트 만들기</p>
      </div>
      {contactPhone ? (
        <a
          href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
          aria-label="전화 상담"
          className="inline-flex h-9 w-14 items-center justify-center gap-1 rounded-md text-weet-forest transition-colors hover:bg-weet-forest/10"
        >
          <PhoneCall className="h-4 w-4" />
        </a>
      ) : (
        <div className="w-14" />
      )}
    </header>
  );
}
