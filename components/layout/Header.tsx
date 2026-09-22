'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useModalDismiss } from '@/components/customize/lib/hooks';

const navigationKo = [
  {
    name: '모듈러건축 소개',
    href: '/modular',
    width: 145,
    submenu: [
      { name: '모듈러건축이란?', href: '/modular#what-is-modular' },
      { name: '모듈러 형태', href: '/modular#modular-types' },
      { name: '사전제작 탈현장 건설', href: '/modular#prefabrication' },
      { name: 'OSC', href: '/modular#osc' },
      { name: '조립방식의 건축', href: '/modular#assembly' },
    ],
  },
  {
    name: '제품 소개',
    href: '/products',
    width: 75,
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
    width: 100,
    submenu: [
      { name: 'BESPOKE 란?', href: '/bespoke#what-is-bespoke' },
      { name: '제안 예시', href: '/bespoke#examples' },
    ],
  },
  {
    name: '주문제작',
    href: '/customize',
    width: 85,
    submenu: [],
  },
  {
    name: 'SOLUTION',
    href: '/solution',
    width: 155,
    submenu: [
      { name: '시큐리티', href: '/solution/cctv' },
      { name: '네트워크', href: '/solution/network' },
      { name: 'IoT', href: '/solution/iot' },
      { name: '에너지', href: '/solution/energy' },
    ],
  },
  {
    name: '회사소개',
    href: '/company',
    width: 85,
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
    width: 75,
    submenu: [
      { name: '무엇을 도와드릴까요?', href: '/support#help' },
      { name: '구매과정', href: '/support#process' },
      { name: '비용 안내', href: '/guides/mobile-home-cost' },
      { name: 'QnA', href: '/support#qa' },
      { name: 'A/S', href: '/support#as' },
    ],
  },
];

const navigationEn = [
  {
    name: 'About Modular',
    href: '/modular',
    width: 145,
    submenu: [
      { name: 'What is Modular?', href: '/modular#what-is-modular' },
      { name: 'Modular Types', href: '/modular#modular-types' },
      { name: 'Prefabrication', href: '/modular#prefabrication' },
      { name: 'OSC', href: '/modular#osc' },
      { name: 'Assembly', href: '/modular#assembly' },
    ],
  },
  {
    name: 'Products',
    href: '/products',
    width: 75,
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
    width: 100,
    submenu: [
      { name: 'What is BESPOKE?', href: '/bespoke#what-is-bespoke' },
      { name: 'Examples', href: '/bespoke#examples' },
    ],
  },
  {
    name: 'Customize',
    href: '/customize',
    width: 85,
    submenu: [],
  },
  {
    name: 'SOLUTION',
    href: '/solution',
    width: 155,
    submenu: [
      { name: 'Security', href: '/solution/cctv' },
      { name: 'Network Solution', href: '/solution/network' },
      { name: 'Smart Home (IoT)', href: '/solution/iot' },
      { name: 'Design Consulting', href: '/solution/design' },
    ],
  },
  {
    name: 'Company',
    href: '/company',
    width: 85,
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
    width: 75,
    submenu: [
      { name: 'How can we help?', href: '/support#help' },
      { name: 'Purchase Process', href: '/support#process' },
      { name: 'Costs (Korean)', href: '/guides/mobile-home-cost' },
      { name: 'QnA', href: '/support#qa' },
      { name: 'A/S', href: '/support#as' },
    ],
  },
];

const spanishLabels: Record<string, string> = {
  '/modular': 'Construcción modular', '/products': 'Productos', '/customize': 'Personalizar', '/company': 'Empresa', '/support': 'Soporte',
  '/modular#what-is-modular': '¿Qué es?', '/modular#modular-types': 'Tipos de módulos', '/modular#prefabrication': 'Prefabricación', '/modular#assembly': 'Montaje',
  '/projects': 'Proyectos', '/bespoke#what-is-bespoke': '¿Qué es BESPOKE?', '/bespoke#examples': 'Ejemplos',
  '/solution/cctv': 'Seguridad', '/solution/network': 'Red', '/solution/energy': 'Energía',
  '/company#philosophy': 'Filosofía', '/company#ci': 'Identidad', '/company#crew': 'Equipo', '/company#factory': 'Fábrica', '/company#gallery': 'Galería',
  '/support#help': 'Ayuda', '/support#process': 'Proceso', '/support#qa': 'Preguntas', '/support#as': 'Posventa', '/guides/mobile-home-cost': 'Costes (coreano)',
};
const navigationEs = navigationEn.map((item) => ({ ...item, name: spanishLabels[item.href] ?? item.name, submenu: item.submenu.map((sub) => ({ ...sub, name: spanishLabels[sub.href] ?? sub.name })) }));

type NavItem = (typeof navigationKo)[number];

function MobileMenu({ navigation, onClose }: { navigation: NavItem[]; onClose: () => void }) {
  useModalDismiss(onClose);
  return (
    <div role="dialog" aria-modal="true" aria-label="전체 메뉴" className="fixed inset-0 z-[100] overflow-y-auto bg-white px-6 pb-10 pt-5 text-black xl:hidden">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-2xl font-bold">weet:)</span>
        <button type="button" onClick={onClose} aria-label="메뉴 닫기" className="flex h-12 w-12 items-center justify-center"><X /></button>
      </div>
      <nav aria-label="모바일 주 메뉴" className="divide-y divide-gray-200">
        {navigation.map((item) => <div key={item.href} className="py-5">
          <Link href={item.href} onClick={onClose} className={`inline-flex min-h-11 items-center text-xl font-bold ${item.href === '/customize' ? 'bg-primary px-4' : ''}`}>{item.name}</Link>
          {item.submenu.length > 0 && <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">{item.submenu.map((sub) => <Link key={sub.href} href={sub.href} onClick={onClose} className="inline-flex min-h-11 items-center text-sm text-gray-600 hover:text-black">{sub.name}</Link>)}</div>}
        </div>)}
      </nav>
    </div>
  );
}

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const navigation = language === 'KO' ? navigationKo : language === 'ES' ? navigationEs : navigationEn;
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEffect(() => {
    const resize = () => { if (window.innerWidth >= 1280) setMenuOpen(false); };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white text-black" onMouseLeave={() => setMegaOpen(false)} onKeyDown={(event) => { if (event.key === 'Escape') setMegaOpen(false); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMegaOpen(false); }}>
        <div className="mx-auto flex h-[105px] max-w-[1600px] items-center justify-between gap-6 px-5 md:px-8 xl:h-[110px] xl:px-12">
          <Link href="/" aria-label="위트 홈" className="relative block h-20 w-20 shrink-0 xl:h-[90px] xl:w-[90px]"><Image src="/images/logo_new.webp" alt="위트(weet) 로고" fill sizes="90px" className="object-contain" priority /></Link>
          <nav aria-label="주 메뉴" className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-8" onMouseEnter={() => setMegaOpen(true)} onFocus={() => setMegaOpen(true)}>
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMegaOpen(false)} className={`inline-flex min-h-11 items-center whitespace-nowrap text-sm font-bold underline-offset-4 hover:underline ${item.href === '/customize' ? 'bg-primary px-3' : ''}`}>{item.name}</Link>)}
          </nav>
          <div className="flex shrink-0 flex-col items-end gap-3">
            <div className="hidden gap-4 text-xs font-bold xl:flex"><a href="https://blog.naver.com/we-et" target="_blank" rel="noopener noreferrer">N blog</a><a href="https://www.instagram.com/weet_kr/" target="_blank" rel="noopener noreferrer">Instagram</a></div>
            <div className="flex items-center gap-1">{(['KO', 'EN', 'ES'] as const).map((lang) => <button key={lang} type="button" aria-pressed={language === lang} onClick={() => setLanguage(lang)} className={`min-h-11 min-w-9 px-1 text-xs ${language === lang ? 'font-bold text-black underline underline-offset-4' : 'text-gray-600'}`}>{lang}</button>)}<button type="button" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기" aria-expanded={menuOpen} className="ml-1 flex h-11 w-11 items-center justify-center xl:hidden"><Menu /></button></div>
          </div>
        </div>
        {megaOpen && <nav aria-label="상세 메뉴" className="absolute inset-x-0 top-full hidden border-y border-gray-300 bg-[#EBEBEB] px-12 py-7 shadow-sm xl:block"><div className="mx-auto grid max-w-[1300px] grid-cols-7 gap-5">{navigation.map((item) => <div key={item.href}><Link onClick={() => setMegaOpen(false)} href={item.href} className="mb-3 block font-bold text-sm">{item.name}</Link><div className="space-y-1">{item.submenu.map((sub) => <Link key={sub.href} href={sub.href} onClick={() => setMegaOpen(false)} className="block py-2 text-[13px] leading-5 text-gray-700 hover:underline">{sub.name}</Link>)}</div></div>)}</div></nav>}
      </header>
      {menuOpen && <MobileMenu navigation={navigation} onClose={closeMenu} />}
    </>
  );
}
