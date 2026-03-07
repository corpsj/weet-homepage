import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { COMPANY, BRAND_V2 } from '@/lib/constants';
import { V2_NAV_ITEMS } from '@/lib/navigation';

export function FooterV2() {
  const supportItems = [
    { label: `전화: ${COMPANY.phone}`, href: COMPANY.phoneHref, external: false },
    { label: `이메일: ${COMPANY.email}`, href: COMPANY.emailHref, external: false },
    { label: '카카오톡 상담', href: 'https://pf.kakao.com/_xnxkxnxn', external: true },
  ];

  const socialItems = [
    { label: '인스타그램', href: COMPANY.instagram },
    { label: '네이버 블로그', href: COMPANY.blog },
    { label: '당근마켓', href: COMPANY.daangn },
  ];

  return (
    <footer className="w-full bg-[#2D2D2A] text-white/90">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-14 md:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link
              href="/home"
              className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-[#2D2D2A] text-xs">
                weet:)
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                {BRAND_V2.concept}
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {BRAND_V2.tagline}
            </p>
            <div className="text-white/40 text-xs leading-relaxed space-y-1">
              <p>{COMPANY.nameShort}</p>
              <p>사업자등록번호 {COMPANY.businessNumber}</p>
              <p>{COMPANY.addressShort}</p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">메뉴</h3>
            <ul className="flex flex-col gap-2">
              {V2_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors min-h-[36px] inline-flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">고객지원</h3>
            <ul className="flex flex-col gap-2">
              {supportItems.map((item) =>
                item.external ? (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-primary transition-colors min-h-[36px] inline-flex items-center"
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-white/70 hover:text-primary transition-colors min-h-[36px] inline-flex items-center"
                    >
                      {item.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">소셜</h3>
            <ul className="flex flex-col gap-2">
              {socialItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-primary transition-colors min-h-[36px] inline-flex items-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-10 opacity-20" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>Copyright &copy; {new Date().getFullYear()} weet:) All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              개인정보 처리방침
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
