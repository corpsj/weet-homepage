'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Instagram, Youtube, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: '모듈러건축 소개',
    href: '/modular',
    submenu: [
      '모듈러건축이란?',
      '모듈러 형태',
      '사전제작 탈현장 건설',
      'OSC',
      '조립방식의 건축',
    ],
  },
  {
    name: '제품 소개',
    href: '/products',
    submenu: [
      'S',
      'M',
      'L',
      'XL',
      'Solution',
      'Design',
    ],
  },
  {
    name: 'BESPOKE',
    href: '/bespoke',
    submenu: [
      'BESPOKE 란?',
      '제안 예시',
    ],
  },
  {
    name: 'SOLUTION',
    href: '/solution',
    submenu: [
      'CCTV (보안 솔루션)',
      '인터넷 솔루션',
      '스마트 홈 솔루션',
      '디자인 컨설팅 솔루션',
    ],
  },
  {
    name: '회사소개',
    href: '/company',
    submenu: [
      '우리의 철학',
      '기업 CI',
      '위트 크루',
      '위트 펙토리',
    ],
  },
  {
    name: '고객지원',
    href: '/support',
    submenu: [
      '구매방법',
      '방문예약',
      '상담문의',
      '견적문의',
      'Q/A',
      'A/S',
    ],
  },
];

const languages = ['KR', 'EN', 'ES'];

export default function Header() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState('KR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to show/hide header (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      // Only hide header on desktop (lg and above)
      if (window.innerWidth < 1024) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setIsVisible(false);
        setShowMegaMenu(false);
        setActiveMenu(null);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) {
          setShowMegaMenu(false);
          setActiveMenu(null);
        }
      }}
    >
      <div className="max-w-[1920px] mx-auto">
        {/* Main Header */}
        <div className="relative flex items-center h-[100px] md:h-[140px] lg:h-[180px] px-4 md:px-8 lg:px-[64px]">
          {/* Logo */}
          <Link href="/" className="absolute left-4 md:left-8 lg:left-[64px] top-1/2 -translate-y-1/2 lg:static lg:transform-none">
            <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] lg:w-[140px] lg:h-[140px] relative">
              <Image
                src="/images/logo/weet-logo.png"
                alt="Weet Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Mobile Menu Button - Right Side */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] p-2 hover:bg-gray-100 rounded-md transition-colors active:bg-gray-200"
            aria-label="Toggle mobile menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Language Selector - Top Right (Desktop) */}
          <div className="hidden lg:block absolute right-[64px] top-[30px]">
            <div className="flex items-center space-x-1 text-sm font-medium">
              {languages.map((lang, idx) => (
                <span key={lang} className="flex items-center">
                  <button
                    onClick={() => setCurrentLang(lang)}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-[75px] w-full mt-[50px]">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  setShowMegaMenu(true);
                  setActiveMenu(item.name);
                }}
              >
                <Link
                  href={item.href}
                  className="relative inline-block text-black font-bold text-[18px] hover:text-gray-700 transition-colors whitespace-nowrap"
                >
                  {item.name}
                  <span className={cn(
                    "absolute bottom-[-2px] left-0 right-0 h-[8px] bg-primary transition-all duration-200 -z-10",
                    activeMenu === item.name ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  )} />
                </Link>

                {/* Individual Dropdown Menu */}
                {showMegaMenu && (
                  <div className="absolute top-full left-0 pt-6 z-50">
                    <div className="space-y-2">
                      {item.submenu.map((subitem, idx) => (
                        <Link
                          key={idx}
                          href={`${item.href}#${subitem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block whitespace-nowrap text-[14px] text-gray-700 hover:text-black transition-colors"
                        >
                          {subitem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Social Icons - Desktop only */}
          <div className="hidden lg:flex absolute right-[64px] bottom-[30px] items-center space-x-4">
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

          {/* Language Selector - Mobile/Tablet - Moved below hamburger */}
          <div className="lg:hidden absolute right-4 md:right-8 bottom-4">
            <div className="flex items-center space-x-1 text-xs md:text-sm font-medium">
              {languages.map((lang, idx) => (
                <span key={lang} className="flex items-center">
                  <button
                    onClick={() => setCurrentLang(lang)}
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

        {/* Dropdown Background */}
        {showMegaMenu && (
          <div className="hidden lg:block absolute left-0 right-0 top-full bg-gray-200 shadow-lg z-30 h-[200px]"></div>
        )}
      </div>

      {/* Full Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-[100] overflow-y-auto animate-fade-in">
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-[60px] h-[60px] relative">
                <Image
                  src="/images/logo/weet-logo.png"
                  alt="Weet Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-2xl md:text-3xl font-bold text-black mb-3 hover:text-gray-600 transition-colors"
                >
                  {item.name}
                </Link>

                {/* Submenu - Always Visible */}
                <div className="ml-4 space-y-2">
                  {item.submenu.map((subitem, idx) => (
                    <Link
                      key={idx}
                      href={`${item.href}#${subitem.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base md:text-lg text-gray-600 hover:text-black transition-colors py-1"
                    >
                      {subitem}
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
                  onClick={() => setCurrentLang(lang)}
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
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl font-bold">N</span>
                <span className="text-sm">blog</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setMobileMenuOpen(false)}
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
        </div>
      )}
    </header>
  );
}
