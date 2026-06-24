'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Instagram, Carrot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useModalDismiss } from '@/components/customize/lib/hooks';

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
      { name: '솔루션', href: '/solution' },
      { name: '시큐리티', href: '/solution/cctv' },
      { name: '네트워크', href: '/solution/network' },
      { name: 'IoT', href: '/solution/iot' },
      { name: '에너지', href: '/solution/energy' },
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
      { name: '무엇을 도와드릴까요?', href: '/support#permits' },
      { name: '구매과정', href: '/support#process' },
      { name: 'QnA', href: '/support#faq' },
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
      { name: 'Solutions', href: '/solution' },
      { name: 'Security', href: '/solution/cctv' },
      { name: 'Network', href: '/solution/network' },
      { name: 'IoT', href: '/solution/iot' },
      { name: 'Energy', href: '/solution/energy' },
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
      { name: 'How can we help?', href: '/support#permits' },
      { name: 'Purchase Process', href: '/support#process' },
      { name: 'QnA', href: '/support#faq' },
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
      { name: 'Soluciones', href: '/solution' },
      { name: 'Seguridad', href: '/solution/cctv' },
      { name: 'Red', href: '/solution/network' },
      { name: 'IoT', href: '/solution/iot' },
      { name: 'Energía', href: '/solution/energy' },
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
      { name: '¿Cómo podemos ayudar?', href: '/support#permits' },
      { name: 'Proceso de compra', href: '/support#process' },
      { name: 'Preguntas frecuentes', href: '/support#faq' },
      { name: 'Servicio posventa', href: '/support#as' },
    ],
  },
];

const orderLabel = { KO: '주문하기', EN: 'Order', ES: 'Pedir' } as const;

// KO 모드에서 영문 브랜드 라벨에 한글 병기(드롭다운 캡션). 레이아웃 영향 없는 패널 안에서만 노출.
const KO_GLOSS: Record<string, string> = {
  BESPOKE: '비스포크',
  SOLUTION: '솔루션',
};

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
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const { language } = useLanguage();
  const pathname = usePathname() ?? '/';

  const navigation = { KO: navigationKo, EN: navigationEn, ES: navigationEs }[language];

  // 데스크톱 메가메뉴: Escape / 바깥 클릭으로 닫기 (열려 있을 때만 리스너 등록).
  // (라우트 이동 시 닫기는 각 링크 onClick에서 setOpenDesktop(null)로 처리)
  useEffect(() => {
    if (!openDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDesktop(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDesktop(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [openDesktop]);

  const isActive = useCallback(
    (href: string) => {
      const base = href.split('#')[0]; // anchor가 붙은 href는 경로만 비교
      if (base === '/') return pathname === '/';
      return pathname === base || pathname.startsWith(base + '/');
    },
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

          {/* 데스크톱 내비 (<1024px 숨김) — hover/focus/클릭으로 열리는 메가메뉴 */}
          <nav
            ref={navRef}
            aria-label="주 메뉴"
            className="hidden items-center gap-[clamp(14px,1.8vw,28px)] lg:flex"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);
              const open = openDesktop === item.name;
              const menuId = `megamenu-${item.href.replace(/\W+/g, '-')}`;
              const gloss = language === 'KO' ? KO_GLOSS[item.name] : undefined;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDesktop(item.name)}
                  onMouseLeave={() => setOpenDesktop((cur) => (cur === item.name ? null : cur))}
                  onFocus={() => setOpenDesktop(item.name)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenDesktop((cur) => (cur === item.name ? null : cur));
                    }
                  }}
                >
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={item.href}
                      onClick={() => setOpenDesktop(null)}
                      className={cn(
                        'whitespace-nowrap text-[14px] font-medium transition-colors hover:text-weet-gold-deep',
                        active ? 'text-weet-gold-deep' : 'text-weet-sub',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenDesktop(open ? null : item.name)}
                      aria-expanded={open}
                      aria-controls={menuId}
                      aria-label={`${item.name} 하위 메뉴 ${open ? '닫기' : '열기'}`}
                      className="rounded-[4px] p-0.5 text-weet-sub transition-colors hover:text-weet-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
                    >
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        id={menuId}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded-card border border-weet-line bg-weet-card p-2 shadow-weet-float"
                      >
                        {gloss && (
                          <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wide text-weet-muted">
                            {gloss}
                          </p>
                        )}
                        <ul className="flex flex-col">
                          {item.submenu.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={() => setOpenDesktop(null)}
                                className="block whitespace-nowrap rounded-[6px] px-3 py-2 text-[13px] text-weet-sub transition-colors hover:bg-weet-paper-alt hover:text-weet-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* 데스크톱 우측: 언어 + CTA */}
          <div className="hidden items-center gap-[18px] lg:flex">
            <LanguageToggle />
            <Link
              href="/customize"
              className="rounded-[4px] bg-weet-ink px-[18px] py-[10px] text-[13px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              {orderLabel[language]}
            </Link>
          </div>

          {/* 모바일 우측: CTA + 햄버거 (≤860px 표시) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/customize"
              className="inline-flex h-9 items-center justify-center rounded-[4px] bg-weet-ink px-3.5 text-[12px] font-semibold leading-none text-weet-paper"
            >
              {orderLabel[language]}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-md text-weet-ink transition-colors hover:bg-weet-paper-alt"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== 모바일 풀스크린 메뉴 (Escape·포커스 트랩·스크롤 락은 useModalDismiss가 처리) ===== */}
      {mobileMenuOpen && (
        <MobileMenu
          navigation={navigation}
          language={language}
          isActive={isActive}
          expandedMenu={expandedMenu}
          setExpandedMenu={setExpandedMenu}
          onClose={closeMobile}
        />
      )}
    </>
  );
}

function MobileMenu({
  navigation,
  language,
  isActive,
  expandedMenu,
  setExpandedMenu,
  onClose,
}: {
  navigation: NavItem[];
  language: 'KO' | 'EN' | 'ES';
  isActive: (href: string) => boolean;
  expandedMenu: string | null;
  setExpandedMenu: (v: string | null) => void;
  onClose: () => void;
}) {
  // ESC 닫기 + body 스크롤 락 + 포커스 트랩 + 초기 포커스 + 복귀. (소비처 패턴과 동일)
  useModalDismiss(onClose);
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="주 메뉴"
      className="animate-fade-in fixed inset-0 z-[100] overflow-y-auto bg-weet-paper text-weet-ink lg:hidden"
    >
      <div className="sticky top-0 flex items-center justify-between border-b border-weet-line bg-weet-paper px-[5vw] py-4">
        <Link href="/" onClick={onClose} aria-label="위트(weet) 홈">
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
          onClick={onClose}
          aria-label="메뉴 닫기"
          className="rounded-full p-2 text-weet-ink transition-colors hover:bg-weet-paper-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
        >
          <X className="h-7 w-7" />
        </button>
      </div>

      <nav className="px-[5vw] py-8" aria-label="모바일 메뉴">
        <Link
          href="/customize"
          onClick={onClose}
          className="mb-8 flex w-full items-center justify-center rounded-[6px] bg-weet-gold py-4 text-lg font-semibold text-weet-ink transition-colors hover:bg-weet-gold-deep"
        >
          {orderLabel[language]}
        </Link>

        {navigation.map((item) => {
          const open = expandedMenu === item.name;
          const menuId = `m-megamenu-${item.href.replace(/\W+/g, '-')}`;
          return (
            <div key={item.href} className="mb-7 last:mb-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onClose}
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
                  aria-label={`${item.name} 하위 메뉴 ${open ? '닫기' : '열기'}`}
                  aria-expanded={open}
                  aria-controls={menuId}
                  className="p-1.5 text-weet-sub focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
                >
                  <ChevronDown className={cn('h-5 w-5 transition-transform duration-300', open && 'rotate-180')} />
                </button>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    id={menuId}
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
                          onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
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
  );
}
