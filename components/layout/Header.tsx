'use client';

import { useState, useEffect, useCallback } from 'react';
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
      { name: '보안', href: '/solution/cctv' },
      { name: '통신망', href: '/solution/network' },
      { name: '원격 제어', href: '/solution/iot' },
      { name: '브랜드/현장 디자인', href: '/solution/design' },
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
      { name: 'Security', href: '/solution/cctv' },
      { name: 'Network', href: '/solution/network' },
      { name: 'Remote Control', href: '/solution/iot' },
      { name: 'Brand & Site Fit', href: '/solution/design' },
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

export default function Header() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage } = useLanguage();

  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const navigation = language === 'KO' ? navigationKo : navigationEn;

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
                className="flex items-center justify-center px-3 md:px-4 py-1.5 md:py-2 bg-gray-900 text-white rounded text-[12px] md:text-[13px] font-bold hover:bg-gray-800 transition-colors whitespace-nowrap"
                aria-label={language === 'KO' ? '주문하기' : 'Order'}
              >
                {language === 'KO' ? '주문하기' : 'Order'}
              </Link>
              <button
                onClick={handleMobileMenuToggle}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors active:bg-gray-200"
                aria-label="Toggle mobile menu"
                type="button"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden xl:flex absolute left-[140px] right-[280px] top-0 bottom-0 items-center justify-center pointer-events-none"
              onMouseEnter={handleMegaMenuEnter}
            >
              <div className="flex pointer-events-auto gap-[60px] pb-[70px] -mb-[70px]">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => handleMenuHover(item.name)}
                  >
                    <Link
                      href={item.href}
                      className="relative inline-block text-black font-bold text-[15px] hover:text-gray-700 transition-colors whitespace-nowrap group"
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
            <div className="hidden xl:flex absolute right-[64px] top-1/2 -translate-y-1/2 items-center gap-6">
              {/* Primary CTA */}
              <Link
                href="/customize"
                className="flex items-center justify-center px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-sm text-[13px] font-bold hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap"
                aria-label={language === 'KO' ? '주문하기' : 'Configure'}
              >
                {language === 'KO' ? '주문하기' : 'Configure'}
              </Link>

              {/* Social Icons & Language Switcher Block */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Link href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/" target="_blank" className="hover:text-gray-800 transition-colors" aria-label="Daangn">
                    <Carrot className="w-[14px] h-[14px]" />
                  </Link>
                  <Link href="https://blog.naver.com/we-et" target="_blank" className="hover:text-gray-800 transition-colors font-bold text-[14px] leading-none" aria-label="Naver Blog">
                    N
                  </Link>
                  <Link href="https://www.instagram.com/weet_kr/" target="_blank" className="hover:text-gray-800 transition-colors" aria-label="Instagram">
                    <Instagram className="w-[14px] h-[14px]" />
                  </Link>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-medium">
                  <button
                    onClick={() => setLanguage('KO')}
                    className={cn("transition-colors", language === 'KO' ? "text-gray-800 font-bold" : "text-gray-300 hover:text-gray-500")}
                  >
                    KO
                  </button>
                  <span className="text-gray-200">|</span>
                  <button
                    onClick={() => setLanguage('EN')}
                    className={cn("transition-colors", language === 'EN' ? "text-gray-800 font-bold" : "text-gray-300 hover:text-gray-500")}
                  >
                    EN
                  </button>
                </div>
              </div>
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
                  className="flex py-6 gap-[60px] pl-[60px] pr-[180px] rounded-b-md shadow-sm pointer-events-auto bg-gray-50 border-t border-gray-100"
                  onMouseEnter={() => setShowMegaMenu(true)}
                >
                  {navigation.map((item) => (
                    <div
                      key={item.name}
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
                              className="relative inline-block text-[13px] text-gray-600 hover:text-black transition-colors group"
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
        <div className="xl:hidden fixed inset-0 bg-white z-[100] overflow-y-auto animate-fade-in">
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
              className="flex items-center justify-center w-full py-4 mb-8 bg-gray-900 text-white rounded-md font-bold text-lg hover:bg-gray-800 transition-colors shadow-sm"
            >
              {language === 'KO' ? '모델 구성하기' : 'Configure Model'}
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
                        <span className="block text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors">
                          {item.name}
                        </span>
                        {hasSubmenu && (
                          <ChevronDown
                            className={cn(
                              "w-6 h-6 text-black transition-transform duration-300",
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
                                  className="block text-sm md:text-base text-gray-600 hover:text-black transition-colors py-1"
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
                      className="block text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors mb-3"
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
                onClick={() => setLanguage('KO')}
                className={cn("font-bold transition-colors", language === 'KO' ? "text-black" : "text-gray-400 hover:text-black")}
              >
                KO
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={cn("font-bold transition-colors", language === 'EN' ? "text-black" : "text-gray-400 hover:text-black")}
              >
                EN
              </button>
            </div>            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <Link
                href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={handleMobileMenuClose}
              >
                <Carrot className="w-5 h-5" />
                <span className="text-[12px] font-bold">당근</span>
              </Link>
              <Link
                href="https://blog.naver.com/we-et"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={handleMobileMenuClose}
              >
                <span className="text-xl font-bold">N</span>
                <span className="text-[12px] font-bold">blog</span>
              </Link>
              <Link
                href="https://www.instagram.com/weet_kr/"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={handleMobileMenuClose}
              >
                <Instagram className="w-5 h-5" />
                <span className="text-[12px] font-bold">Instagram</span>
              </Link>

            </div>

            {/* Footer Text */}
            <p className="text-xs text-gray-400 pt-4">
              WE make dreams comE True
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
