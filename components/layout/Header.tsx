'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Instagram, Carrot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type NavItem = { name: string; href: string; submenu: { name: string; href: string }[] };

const navigationKo: NavItem[] = [
  {
    name: '모듈러건축',
    href: '/modular',
    submenu: [
      { name: '모듈러 건축이란?', href: '/modular#what-is-modular' },
      { name: '공장 제작', href: '/modular#factory-precision' },
      { name: '운송 및 조립', href: '/modular#transport-install' },
      { name: '생활과 운영', href: '/modular#interior-comfort' },
      { name: '미래 확장/이동', href: '/modular#flexible-commercial' },
    ],
  },
  {
    name: '제품소개',
    href: '/products',
    submenu: [
      { name: 'S', href: '/products#s' },
      { name: 'M', href: '/products#m' },
      { name: 'L', href: '/products#l' },
      { name: 'XL', href: '/products#xl' },
      { name: '프로젝트', href: '/projects' },
    ],
  },
  {
    name: 'BESPOKE',
    href: '/bespoke',
    submenu: [
      { name: '상업 공간 맞춤 솔루션', href: '/bespoke#what-is-bespoke' },
      { name: '카페/매장', href: '/bespoke#small-cafe' },
      { name: '팝업/쇼룸', href: '/bespoke#popup-store' },
      { name: '숙박/워크스페이스', href: '/bespoke#accommodation' },
      { name: '스마트팜/랩', href: '/bespoke#smart-farm' },
    ],
  },
  {
    name: 'SOLUTION',
    href: '/solution',
    submenu: [
      { name: '운영 솔루션', href: '/solution' },
      { name: 'Security Core', href: '/solution/cctv' },
      { name: 'Network Fabric', href: '/solution/network' },
      { name: 'Control Layer', href: '/solution/iot' },
      { name: 'Energy Stack', href: '/solution/energy' },
    ],
  },
  {
    name: '회사소개',
    href: '/company',
    submenu: [
      { name: '우리의 철학', href: '/company#philosophy' },
      { name: '기업 CI', href: '/company#ci' },
      { name: '위트 크루', href: '/company#crew' },
      { name: '위트 팩토리', href: '/company#factory' },
      { name: '위트 갤러리', href: '/company#gallery' },
    ],
  },
  {
    name: '고객지원',
    href: '/support',
    submenu: [
      { name: '무엇을 도와드릴까요?', href: '/support#help' },
      { name: '구매과정', href: '/support#process' },
      { name: 'QnA', href: '/support#qa' },
      { name: 'A/S', href: '/support#as' },
    ],
  },
];

const navigationEn: NavItem[] = [
  {
    name: 'About Modular',
    href: '/modular',
    submenu: [
      { name: 'What is Modular?', href: '/modular#what-is-modular' },
      { name: 'Factory Precision', href: '/modular#factory-precision' },
      { name: 'Transport & Install', href: '/modular#transport-install' },
      { name: 'Living Comfort', href: '/modular#interior-comfort' },
      { name: 'Future Expansion', href: '/modular#flexible-commercial' },
    ],
  },
  {
    name: 'Products',
    href: '/products',
    submenu: [
      { name: 'S', href: '/products#s' },
      { name: 'M', href: '/products#m' },
      { name: 'L', href: '/products#l' },
      { name: 'XL', href: '/products#xl' },
      { name: 'Projects', href: '/projects' },
    ],
  },
  {
    name: 'BESPOKE',
    href: '/bespoke',
    submenu: [
      { name: 'Commercial Custom Solution', href: '/bespoke#what-is-bespoke' },
      { name: 'Cafe & Store', href: '/bespoke#small-cafe' },
      { name: 'Pop-up & Showroom', href: '/bespoke#popup-store' },
      { name: 'Stay & Workspace', href: '/bespoke#accommodation' },
      { name: 'Smart Farm & Lab', href: '/bespoke#smart-farm' },
    ],
  },
  {
    name: 'SOLUTION',
    href: '/solution',
    submenu: [
      { name: 'Operational Packages', href: '/solution' },
      { name: 'Secure Access', href: '/solution/cctv' },
      { name: 'Stable Connection', href: '/solution/network' },
      { name: 'Remote Ready', href: '/solution/iot' },
      { name: 'Energy Stack', href: '/solution/energy' },
    ],
  },
  {
    name: 'Company',
    href: '/company',
    submenu: [
      { name: 'Our Philosophy', href: '/company#philosophy' },
      { name: 'Corporate CI', href: '/company#ci' },
      { name: 'weet Crew', href: '/company#crew' },
      { name: 'weet Factory', href: '/company#factory' },
      { name: 'weet Gallery', href: '/company#gallery' },
    ],
  },
  {
    name: 'Support',
    href: '/support',
    submenu: [
      { name: 'How can we help?', href: '/support#help' },
      { name: 'Purchase Process', href: '/support#process' },
      { name: 'QnA', href: '/support#qa' },
      { name: 'A/S', href: '/support#as' },
    ],
  },
];

const navigationEs: NavItem[] = [
  {
    name: 'Sobre Modular',
    href: '/modular',
    submenu: [
      { name: '¿Qué es lo modular?', href: '/modular#what-is-modular' },
      { name: 'Precisión de fábrica', href: '/modular#factory-precision' },
      { name: 'Transporte e instalación', href: '/modular#transport-install' },
      { name: 'Confort de vida', href: '/modular#interior-comfort' },
      { name: 'Expansión futura', href: '/modular#flexible-commercial' },
    ],
  },
  {
    name: 'Productos',
    href: '/products',
    submenu: [
      { name: 'S', href: '/products#s' },
      { name: 'M', href: '/products#m' },
      { name: 'L', href: '/products#l' },
      { name: 'XL', href: '/products#xl' },
      { name: 'Proyectos', href: '/projects' },
    ],
  },
  {
    name: 'BESPOKE',
    href: '/bespoke',
    submenu: [
      { name: 'Solución comercial a medida', href: '/bespoke#what-is-bespoke' },
      { name: 'Café y tienda', href: '/bespoke#small-cafe' },
      { name: 'Pop-up y showroom', href: '/bespoke#popup-store' },
      { name: 'Alojamiento y espacio de trabajo', href: '/bespoke#accommodation' },
      { name: 'Granja inteligente y laboratorio', href: '/bespoke#smart-farm' },
    ],
  },
  {
    name: 'SOLUTION',
    href: '/solution',
    submenu: [
      { name: 'Paquetes operativos', href: '/solution' },
      { name: 'Secure Access', href: '/solution/cctv' },
      { name: 'Stable Connection', href: '/solution/network' },
      { name: 'Remote Ready', href: '/solution/iot' },
      { name: 'Energy Stack', href: '/solution/energy' },
    ],
  },
  {
    name: 'Empresa',
    href: '/company',
    submenu: [
      { name: 'Nuestra filosofía', href: '/company#philosophy' },
      { name: 'CI corporativa', href: '/company#ci' },
      { name: 'weet Crew', href: '/company#crew' },
      { name: 'weet Factory', href: '/company#factory' },
      { name: 'weet Gallery', href: '/company#gallery' },
    ],
  },
  {
    name: 'Soporte',
    href: '/support',
    submenu: [
      { name: '¿Cómo podemos ayudar?', href: '/support#help' },
      { name: 'Proceso de compra', href: '/support#process' },
      { name: 'Preguntas frecuentes', href: '/support#qa' },
      { name: 'Servicio posventa', href: '/support#as' },
    ],
  },
];

const orderLabel = { KO: '주문하기', EN: 'Order', ES: 'Pedir' } as const;

function LanguageToggle({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const { language, setLanguage } = useLanguage();
  const langs: { code: 'KO' | 'EN' | 'ES'; aria: string }[] = [
    { code: 'KO', aria: '한국어로 보기' },
    { code: 'EN', aria: 'View in English' },
    { code: 'ES', aria: 'Ver en español' },
  ];
  return (
    <div className={cn('flex items-center font-semibold', size === 'lg' ? 'gap-2 text-[13px]' : 'gap-1.5 text-[12px]')}>
      {langs.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-weet-line">|</span>}
          <button
            type="button"
            aria-label={l.aria}
            aria-pressed={language === l.code}
            onClick={() => setLanguage(l.code)}
            className={cn(
              'transition-colors',
              language === l.code ? 'text-weet-ink' : 'text-weet-muted hover:text-weet-gold-deep',
            )}
          >
            {l.code}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { language } = useLanguage();
  const pathname = usePathname() ?? '/';

  const navigation = { KO: navigationKo, EN: navigationEn, ES: navigationEs }[language];

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  );

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      {/* ===== 웜 시스템 헤더 (sticky, paper/blur) ===== */}
      <header className="sticky top-0 z-50 border-b border-weet-line bg-weet-paper/[0.88] backdrop-blur-md supports-[backdrop-filter]:bg-weet-paper/[0.78]">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-[5vw]">
          {/* 워드마크 */}
          <Link href="/" aria-label="위트(weet) 홈" className="shrink-0">
            <Image
              src="/images/handoff/weet-wordmark.webp"
              alt="weet"
              width={406}
              height={123}
              priority
              className="h-[24px] w-auto md:h-[26px]"
            />
          </Link>

          {/* 데스크톱 내비 (≤860px 숨김) */}
          <nav className="hidden items-center gap-[clamp(20px,2.4vw,30px)] min-[861px]:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'whitespace-nowrap text-[14px] font-medium transition-colors hover:text-weet-gold-deep',
                    active ? 'text-weet-gold-deep' : 'text-weet-sub',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 데스크톱 우측: 언어 + CTA */}
          <div className="hidden items-center gap-[18px] min-[861px]:flex">
            <LanguageToggle />
            <Link
              href="/customize"
              className="rounded-[4px] bg-weet-ink px-[18px] py-[10px] text-[13px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              {orderLabel[language]}
            </Link>
          </div>

          {/* 모바일 우측: CTA + 햄버거 (≤860px 표시) */}
          <div className="flex items-center gap-2 min-[861px]:hidden">
            <Link
              href="/customize"
              className="rounded-[4px] bg-weet-ink px-3.5 py-2 text-[12px] font-semibold text-weet-paper"
            >
              {orderLabel[language]}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="rounded-md p-2 text-weet-ink transition-colors hover:bg-weet-paper-alt"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== 모바일 풀스크린 메뉴 ===== */}
      {typeof document !== 'undefined' &&
        mobileMenuOpen &&
        createPortal(
          <div
            id="mobile-menu"
            className="animate-fade-in fixed inset-0 z-[100] overflow-y-auto bg-weet-paper text-weet-ink min-[861px]:hidden"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-weet-line bg-weet-paper px-[5vw] py-4">
              <Link href="/" onClick={closeMobile} aria-label="위트(weet) 홈">
                <Image
                  src="/images/handoff/weet-wordmark.webp"
                  alt="weet"
                  width={406}
                  height={123}
                  className="h-[24px] w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="메뉴 닫기"
                className="rounded-full p-2 text-weet-ink transition-colors hover:bg-weet-paper-alt"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav className="px-[5vw] py-8">
              <Link
                href="/customize"
                onClick={closeMobile}
                className="mb-8 flex w-full items-center justify-center rounded-[6px] bg-weet-gold py-4 text-lg font-semibold text-weet-ink transition-colors hover:bg-weet-gold-deep"
              >
                {orderLabel[language]}
              </Link>

              {navigation.map((item) => {
                const open = expandedMenu === item.name;
                return (
                  <div key={item.href} className="mb-7 last:mb-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className={cn(
                          'text-xl font-semibold transition-colors hover:text-weet-gold-deep',
                          isActive(item.href) ? 'text-weet-gold-deep' : 'text-weet-ink',
                        )}
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedMenu(open ? null : item.name)}
                        aria-label={`${item.name} 하위 메뉴`}
                        aria-expanded={open}
                        className="p-1.5 text-weet-sub"
                      >
                        <ChevronDown className={cn('h-5 w-5 transition-transform duration-300', open && 'rotate-180')} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-3 flex flex-col gap-2.5 border-l border-weet-line pl-4">
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={closeMobile}
                                className="text-[14px] text-weet-sub transition-colors hover:text-weet-gold-deep"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="space-y-6 px-[5vw] pb-10">
              <LanguageToggle size="lg" />
              <div className="flex items-center gap-5 border-t border-weet-line pt-5 text-weet-sub">
                <Link
                  href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-1.5 transition-colors hover:text-weet-gold-deep"
                  aria-label="당근"
                >
                  <Carrot className="h-5 w-5" />
                  <span className="text-[12px] font-semibold">당근</span>
                </Link>
                <Link
                  href="https://blog.naver.com/we-et"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-1.5 transition-colors hover:text-weet-gold-deep"
                  aria-label="네이버 블로그"
                >
                  <span className="text-lg font-bold leading-none">N</span>
                  <span className="text-[12px] font-semibold">blog</span>
                </Link>
                <Link
                  href="https://www.instagram.com/weet_kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-1.5 transition-colors hover:text-weet-gold-deep"
                  aria-label="인스타그램"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-[12px] font-semibold">Instagram</span>
                </Link>
              </div>
              <p className="text-[12px] text-weet-muted">WE make dreams comE True</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
