'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

const navigation = [
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
      { name: 'Solution', href: '/products#solution' },
      { name: 'Design', href: '/products#design' },
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
    name: 'SOLUTION',
    href: '/solution',
    width: 155,
    submenu: [
      { name: 'CCTV (보안 솔루션)', href: '/solution/cctv' },
      { name: '인터넷 솔루션', href: '/solution/network' },
      { name: '스마트 홈 솔루션', href: '/solution/iot' },
      { name: '디자인 컨설팅 솔루션', href: '/solution/design' },
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
      { name: '위트 펙토리', href: '/company#factory' },
    ],
  },
  {
    name: '고객지원',
    href: '/support',
    width: 75,
    submenu: [
      { name: '구매방법', href: '/support#purchase' },
      { name: '방문예약', href: '/support#reservation' },
      { name: '상담문의', href: '/support#consultation' },
      { name: '견적문의', href: '/support#quote' },
      { name: 'Q/A', href: '/support#qa' },
      { name: 'A/S', href: '/support#as' },
    ],
  },
];

const languages = ['KR', 'EN', 'ES'];

export default function Header() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState('KR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

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
  }, []);

  const handleLangChange = useCallback((lang: string) => {
    setCurrentLang(lang);
  }, []);

  useEffect(() => {
    setMounted(true);
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
          <div className="relative flex items-center h-[70px] md:h-[90px] lg:h-[110px] px-4 md:px-8 lg:px-[64px]">
            {/* Logo */}
            <Link href="/" className="absolute left-4 md:left-8 lg:left-[64px] top-1/2 -translate-y-1/2 lg:static lg:transform-none">
              <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[90px] lg:h-[90px] relative select-none">
                <Image
                  src="/images/logo_new.png"
                  alt="Weet Logo"
                  fill
                  sizes="(max-width: 768px) 50px, (max-width: 1024px) 70px, 90px"
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
            </Link>

            {/* Mobile Menu Button - Right Side */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] p-2 hover:bg-gray-100 rounded-md transition-colors active:bg-gray-200"
              aria-label="Toggle mobile menu"
              type="button"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex absolute left-0 right-0 top-0 bottom-0 items-center justify-center pointer-events-none pr-[120px]"
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
                      className="relative inline-block text-black font-bold text-[18px] hover:text-gray-700 transition-colors whitespace-nowrap group"
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

            {/* Social Icons - Desktop only */}
            <div className="hidden lg:flex absolute right-[64px] top-[40%] -translate-y-1/2 items-center space-x-4">
              <Link
                href="https://blog.naver.com"
                target="_blank"
                className="text-sm font-normal hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <span className="text-[20px] font-bold">N</span>
                <span className="text-[14px]">blog</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-sm font-normal hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <Instagram className="w-[18px] h-[18px]" />
                <span className="text-[14px]">instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="text-sm font-normal hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <Youtube className="w-[18px] h-[18px]" />
                <span className="text-[14px]">youtube</span>
              </Link>
            </div>

            {/* Language Selector - Top Right (Desktop) - Moved below SNS */}
            <div className="hidden lg:block absolute right-[64px] top-[65%]">
              <div className="flex items-center space-x-1 text-[10px] font-medium">
                {languages.map((lang, idx) => (
                  <span key={lang} className="flex items-center">
                    <button
                      onClick={() => handleLangChange(lang)}
                      className={cn(
                        'hover:text-gray-700 transition-colors',
                        currentLang === lang ? 'text-black font-bold' : 'text-gray-400'
                      )}
                    >
                      {lang}
                    </button>
                    {idx < languages.length - 1 && (
                      <span className="mx-1 text-gray-300">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Language Selector - Mobile/Tablet - Moved below hamburger */}
            <div className="lg:hidden absolute right-4 md:right-8 bottom-4">
              <div className="flex items-center space-x-1 text-xs md:text-sm font-medium">
                {languages.map((lang, idx) => (
                  <span key={lang} className="flex items-center">
                    <button
                      onClick={() => handleLangChange(lang)}
                      className={cn(
                        'hover:text-gray-700 transition-colors',
                        currentLang === lang ? 'text-black font-bold' : 'text-gray-600'
                      )}
                    >
                      {lang}
                    </button>
                    {idx < languages.length - 1 && (
                      <span className="mx-1 text-gray-600">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          {showMegaMenu && (
            <div
              className="hidden lg:block absolute left-0 right-0 z-40 pointer-events-none"
              style={{ top: '110px' }}
            >
              <div className="flex justify-center w-full pr-[120px]">
                <div
                  className="flex py-6 gap-[60px] px-[60px] rounded-b-2xl shadow-sm pointer-events-auto"
                  style={{ backgroundColor: '#EBEBEB' }}
                  onMouseEnter={() => setShowMegaMenu(true)}
                >
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-start"
                    >
                      {/* Invisible Placeholder for Alignment */}
                      <div className="text-[18px] font-bold invisible h-0 mb-5 overflow-hidden">{item.name}</div>

                      {/* Submenu Items */}
                      <div className="relative w-0">
                        <div className="w-max flex flex-col items-start gap-3">
                          {item.submenu.map((subitem, idx) => (
                            <Link
                              key={idx}
                              href={subitem.href}
                              className="relative inline-block text-[14px] text-gray-600 hover:text-black transition-colors group"
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
      {mounted && mobileMenuOpen && createPortal(
        <div className="lg:hidden fixed inset-0 bg-white z-[100] overflow-y-auto animate-fade-in">
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link href="/" onClick={handleMobileMenuClose}>
              <div className="w-[60px] h-[60px] relative select-none">
                <Image
                  src="/images/logo_new.png"
                  alt="Weet Logo"
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
            {navigation.map((item, index) => (
              <div
                key={item.name}
                className="mb-8 last:mb-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Main Menu Item */}
                <Link
                  href={item.href}
                  onClick={handleMobileMenuClose}
                  className="block text-2xl md:text-3xl font-bold text-black mb-3 hover:text-gray-600 transition-colors"
                >
                  {item.name}
                </Link>

                {/* Submenu - Always Visible */}
                <div className="ml-4 space-y-2">
                  {item.submenu.map((subitem, idx) => (
                    <Link
                      key={idx}
                      href={subitem.href}
                      onClick={handleMobileMenuClose}
                      className="block text-base md:text-lg text-gray-600 hover:text-black transition-colors py-1"
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="px-6 pb-8 space-y-6">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Language:</span>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all',
                    currentLang === lang
                      ? 'bg-primary text-black'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <Link
                href="https://blog.naver.com"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={handleMobileMenuClose}
              >
                <span className="text-xl font-bold">N</span>
                <span className="text-sm">blog</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={handleMobileMenuClose}
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={handleMobileMenuClose}
              >
                <Youtube className="w-5 h-5" />
                <span className="text-sm">YouTube</span>
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
