'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Carrot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const navigationKo = [
  {
    name: '모듈러건축 소개',
    href: '/modular',
    width: 145,
    submenu: [
      { name: '모듈러 건축이란?', href: '/modular#what-is-modular' },
      { name: '공장 제작', href: '/modular#factory-precision' },
      { name: '운송 및 조립', href: '/modular#transport-install' },
      { name: '생활과 운영', href: '/modular#interior-comfort' },
      { name: '미래 확장/이동', href: '/modular#flexible-commercial' },
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
    width: 155,
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
      { name: 'Factory Precision', href: '/modular#factory-precision' },
      { name: 'Transport & Install', href: '/modular#transport-install' },
      { name: 'Living Comfort', href: '/modular#interior-comfort' },
      { name: 'Future Expansion', href: '/modular#flexible-commercial' },
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
    width: 155,
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
      { name: 'QnA', href: '/support#qa' },
      { name: 'A/S', href: '/support#as' },
    ],
  },
];

const navigationEs = [
  {
    name: 'Sobre Modular',
    href: '/modular',
    width: 145,
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
    width: 75,
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
    width: 100,
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
    width: 155,
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
    width: 85,
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
    width: 75,
    submenu: [
      { name: '¿Cómo podemos ayudar?', href: '/support#help' },
      { name: 'Proceso de compra', href: '/support#process' },
      { name: 'Preguntas frecuentes', href: '/support#qa' },
      { name: 'Servicio posventa', href: '/support#as' },
    ],
  },
];

export default function Header() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage } = useLanguage();

  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigation = { KO: navigationKo, EN: navigationEn, ES: navigationEs }[language];

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleMegaMenuEnter = useCallback(() => {
    setShowMegaMenu(true);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setShowMegaMenu(false);
      setActiveMenu(null);
    }
  }, []);

  const handleMenuHover = useCallback((menuName: string) => {
    setActiveMenu(menuName);
    setShowMegaMenu(true);
  }, []);

  const handleNavBlur = useCallback(() => {
    // Defer so the newly-focused element settles, then close only if focus
    // has left the header entirely (covers tabbing between the nav and the
    // mega-menu panel, which live in separate DOM subtrees).
    window.setTimeout(() => {
      const header = headerRef.current;
      if (header && !header.contains(document.activeElement)) {
        setShowMegaMenu(false);
        setActiveMenu(null);
      }
    }, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-transform duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
        onMouseLeave={handleMegaMenuLeave}
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Main Header */}
          <div className="relative flex items-center h-[70px] md:h-[80px] lg:h-[80px] px-4 md:px-8 lg:px-[64px]">
            {/* Logo */}
            <Link href="/" className="absolute left-4 md:left-8 lg:left-[64px] top-1/2 -translate-y-1/2 xl:static xl:transform-none">
              <div className="w-[60px] h-[60px] relative select-none">
                <Image
                  src="/images/logo_new.webp"
                  alt="위트(weet) 로고"
                  fill
                  sizes="60px"
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
            </Link>

            {/* Mobile Right Side */}
            <div className="xl:hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] flex items-center gap-2">
              <Link
                href="/customize"
                className="flex h-9 items-center justify-center whitespace-nowrap rounded-sm bg-[#FEBD16] px-3.5 text-[13px] font-bold text-[#2f3432] shadow-[0_8px_18px_rgba(254,189,22,0.22)] transition-colors hover:bg-[#E2A80F] md:h-10 md:px-4"
              >
                {{ KO: '주문하기', EN: 'Order', ES: 'Pedir' }[language]}
              </Link>
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors active:bg-gray-200"
                aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                type="button"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden xl:flex absolute left-[140px] right-[330px] top-0 bottom-0 items-center justify-center pointer-events-none"
              onMouseEnter={handleMegaMenuEnter}
              onFocus={handleMegaMenuEnter}
              onBlur={handleNavBlur}
            >
              <div className="flex pointer-events-auto gap-[clamp(28px,3.1vw,58px)] pb-[70px] -mb-[70px]">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => handleMenuHover(item.name)}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      aria-expanded={showMegaMenu && activeMenu === item.name}
                      aria-controls={`megamenu-${item.href}`}
                      onFocus={() => handleMenuHover(item.name)}
                      className="relative inline-block text-[#2f3432] font-bold text-[15px] hover:text-[#0d6e66] transition-colors whitespace-nowrap group"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className={cn(
                        "absolute bottom-[2px] left-0 right-0 h-[8px] bg-primary transition-all duration-200 -z-0",
                        activeMenu === item.name ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      )} />
                    </Link>
                  </div>
                ))}
              </div>
            </nav>

            {/* Desktop Right Side Content */}
            <div className="hidden xl:flex absolute right-[64px] top-1/2 -translate-y-1/2 items-center gap-4">
              {/* Secondary utilities: social + language in one compact row */}
              <div className="flex items-center gap-3 text-gray-600">
                <Link href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0d6e66] transition-colors" aria-label="Daangn">
                  <Carrot className="w-[14px] h-[14px]" />
                </Link>
                <Link href="https://blog.naver.com/we-et" target="_blank" rel="noopener noreferrer" className="hover:text-[#0d6e66] transition-colors font-bold text-[13px] leading-none" aria-label="Naver Blog">
                  N
                </Link>
                <Link href="https://www.instagram.com/weet_kr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0d6e66] transition-colors" aria-label="Instagram">
                  <Instagram className="w-[14px] h-[14px]" />
                </Link>
                <span aria-hidden="true" className="h-3.5 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5 text-[11px] font-medium">
                  <button
                    type="button"
                    aria-label="한국어로 보기"
                    aria-pressed={language === 'KO'}
                    onClick={() => setLanguage('KO')}
                    className={cn("transition-colors", language === 'KO' ? "font-bold text-[#2f3432]" : "text-gray-600 hover:text-[#0d6e66]")}
                  >
                    KO
                  </button>
                  <span aria-hidden="true" className="text-gray-200">|</span>
                  <button
                    type="button"
                    aria-label="View in English"
                    aria-pressed={language === 'EN'}
                    onClick={() => setLanguage('EN')}
                    className={cn("transition-colors", language === 'EN' ? "font-bold text-[#2f3432]" : "text-gray-600 hover:text-[#0d6e66]")}
                  >
                    EN
                  </button>
                  <span aria-hidden="true" className="text-gray-200">|</span>
                  <button
                    type="button"
                    aria-label="Ver en español"
                    aria-pressed={language === 'ES'}
                    onClick={() => setLanguage('ES')}
                    className={cn("transition-colors", language === 'ES' ? "font-bold text-[#2f3432]" : "text-gray-600 hover:text-[#0d6e66]")}
                  >
                    ES
                  </button>
                </div>
              </div>
              {/* Primary CTA */}
              <Link
                href="/customize"
                className="flex h-10 items-center justify-center rounded-sm bg-[#FEBD16] px-6 text-[14px] font-bold text-[#2f3432] shadow-[0_10px_24px_rgba(254,189,22,0.24)] transition-colors hover:bg-[#E2A80F] whitespace-nowrap"
              >
                {{ KO: '주문하기', EN: 'Order', ES: 'Pedir' }[language]}
              </Link>
            </div>

          </div>

          {/* Mega Menu Dropdown */}
          {showMegaMenu && (
            <div
              className="hidden xl:block absolute left-0 right-0 z-40 pointer-events-none"
              style={{ top: '80px' }}
            >
              <div className="flex justify-center w-full">
                <div
                  className="flex py-6 gap-[clamp(28px,3.1vw,58px)] pl-[60px] pr-[220px] rounded-b-md shadow-sm pointer-events-auto bg-gray-50 border-t border-gray-100"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onFocus={handleMegaMenuEnter}
                  onBlur={handleNavBlur}
                >
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      id={`megamenu-${item.href}`}
                      className="flex flex-col items-start"
                    >
                      {/* Invisible Placeholder for Alignment */}
                      <div className="text-[15px] font-bold invisible h-0 mb-5 overflow-hidden">{item.name}</div>

                      {/* Submenu Items */}
                      <div className="relative w-0">
                        <div className="w-max flex flex-col items-start gap-3">
                          {item.submenu.map((subitem, idx) => (
                            <Link
                              key={idx}
                              href={subitem.href}
                              onFocus={() => handleMenuHover(item.name)}
                              className="relative inline-block text-[13px] text-gray-600 hover:text-[#0d6e66] transition-colors group"
                            >
                              <span className="relative z-10">{subitem.name}</span>
                              <span className="absolute bottom-[1px] left-0 right-0 h-[6px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Full Screen Mobile Menu - Rendered via Portal */}
      {typeof document !== 'undefined' && mobileMenuOpen && createPortal(
        <div id="mobile-menu" className="xl:hidden fixed inset-0 bg-white z-[100] overflow-y-auto animate-fade-in">
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link href="/" onClick={handleMobileMenuClose}>
              <div className="w-[60px] h-[60px] relative select-none">
                <Image
                  src="/images/logo_new.webp"
                  alt="위트(weet) 로고"
                  fill
                  sizes="60px"
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </Link>
            <button
              onClick={handleMobileMenuClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="메뉴 닫기"
              type="button"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Menu Content */}
          <nav className="px-6 py-8">
            <Link
              href="/customize"
              onClick={handleMobileMenuClose}
              className="flex items-center justify-center w-full py-4 mb-8 bg-[#FEBD16] text-[#2f3432] rounded-md font-bold text-lg hover:bg-[#E2A80F] transition-colors shadow-sm"
            >
              {{ KO: '주문하기', EN: 'Order', ES: 'Pedir' }[language]}
            </Link>
            {navigation.map((item, index) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = expandedMenu === item.name;

              return (
                <div
                  key={item.name}
                  className="mb-8 last:mb-0"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {hasSubmenu ? (
                    <>
                      <button
                        onClick={() => setExpandedMenu(isExpanded ? null : item.name)}
                        className="flex items-center justify-between w-full text-left mb-3"
                        type="button"
                      >
                        <span className="block text-lg md:text-xl font-bold text-[#2f3432] hover:text-[#0d6e66] transition-colors">
                          {item.name}
                        </span>
                        {hasSubmenu && (
                          <ChevronDown
                            className={cn(
                              "w-6 h-6 text-[#2f3432] transition-transform duration-300",
                              isExpanded && "rotate-180"
                            )}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && hasSubmenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 space-y-2 pb-2">
                              {item.submenu.map((subitem, idx) => (
                                <Link
                                  key={idx}
                                  href={subitem.href}
                                  onClick={handleMobileMenuClose}
                                  className="block text-sm md:text-base text-gray-600 hover:text-[#0d6e66] transition-colors py-1"
                                >
                                  {subitem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleMobileMenuClose}
                      className="block text-lg md:text-xl font-bold text-[#2f3432] hover:text-[#0d6e66] transition-colors mb-3"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="px-6 pb-8 space-y-6">
            {/* Language Selector */}
            {/* Language Selector */}
            <div className="flex items-center gap-3 text-xs font-medium">
              <button
                type="button"
                aria-label="한국어로 보기"
                aria-pressed={language === 'KO'}
                onClick={() => setLanguage('KO')}
                className={cn("font-bold transition-colors", language === 'KO' ? "text-[#2f3432]" : "text-gray-600 hover:text-[#0d6e66]")}
              >
                KO
              </button>
              <span aria-hidden="true" className="text-gray-300">|</span>
              <button
                type="button"
                aria-label="View in English"
                aria-pressed={language === 'EN'}
                onClick={() => setLanguage('EN')}
                className={cn("font-bold transition-colors", language === 'EN' ? "text-[#2f3432]" : "text-gray-600 hover:text-[#0d6e66]")}
              >
                EN
              </button>
              <span aria-hidden="true" className="text-gray-300">|</span>
              <button
                type="button"
                aria-label="Ver en español"
                aria-pressed={language === 'ES'}
                onClick={() => setLanguage('ES')}
                className={cn("font-bold transition-colors", language === 'ES' ? "text-[#2f3432]" : "text-gray-600 hover:text-[#0d6e66]")}
              >
                ES
              </button>
            </div>            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <Link
                href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-[#0d6e66] transition-colors"
                onClick={handleMobileMenuClose}
              >
                <Carrot className="w-5 h-5" />
                <span className="text-[12px] font-bold">당근</span>
              </Link>
              <Link
                href="https://blog.naver.com/we-et"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-[#0d6e66] transition-colors"
                onClick={handleMobileMenuClose}
              >
                <span className="text-xl font-bold">N</span>
                <span className="text-[12px] font-bold">blog</span>
              </Link>
              <Link
                href="https://www.instagram.com/weet_kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-[#0d6e66] transition-colors"
                onClick={handleMobileMenuClose}
              >
                <Instagram className="w-5 h-5" />
                <span className="text-[12px] font-bold">Instagram</span>
              </Link>

            </div>

            {/* Footer Text */}
            <p className="text-xs text-gray-500 pt-4">
              WE make dreams comE True
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
