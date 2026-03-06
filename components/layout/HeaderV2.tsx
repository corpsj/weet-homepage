"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { zIndex } from '@/lib/design-tokens';

const navItems = [
  { href: '/modular-v2', label: '모듈러건축 소개' },
  { href: '/products-v2', label: '제품 소개' },
  { href: '/bespoke-v2', label: 'BESPOKE' },
  { href: '/solution-v2', label: 'SOLUTION' },
  { href: '/company-v2', label: '회사소개' },
  { href: '/support-v2', label: '고객지원' },
];

export function HeaderV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY >= 50);

      if (currentScrollY < 50) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const headerClass = cn(
    'fixed top-0 left-0 right-0 w-full transition-all duration-300',
    isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 text-gray-900' : 'bg-transparent text-gray-900',
    isHidden ? '-translate-y-full' : 'translate-y-0'
  );

  return (
    <>
      <header 
        className={headerClass}
        style={{ zIndex: zIndex.header }}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 h-[64px] lg:h-[72px] flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md min-h-[44px] min-w-[44px]"
            aria-label="위트 홈으로 가기"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center font-bold text-black text-sm lg:text-base">
              weet:)
            </div>
          </Link>

          <nav aria-label="메인 메뉴" className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary min-h-[44px] flex items-center",
                  pathname === item.href ? "text-primary" : "text-current"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/support-v2"
              className="bg-primary text-black rounded-full px-6 py-2.5 font-medium min-h-[44px] flex items-center justify-center hover:bg-[#E5A410] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              상담 신청
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden w-[44px] h-[44px] flex items-center justify-center text-current focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="메뉴 열기"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white"
            style={{ zIndex: zIndex.mobileMenu }}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메인 메뉴"
          >
            <div className="flex flex-col h-full px-4 pt-4 pb-8">
              <div className="flex items-center justify-between h-[64px] mb-8">
                <Link 
                  href="/" 
                  className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md min-h-[44px] min-w-[44px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-black text-sm">
                    weet:)
                  </div>
                </Link>
                <button
                  type="button"
                  className="w-[44px] h-[44px] flex items-center justify-center text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="메뉴 닫기"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-xl font-semibold h-[56px] flex items-center border-b border-gray-100",
                      pathname === item.href ? "text-primary" : "text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <Link
                  href="/support-v2"
                  className="bg-primary text-black rounded-full w-full py-4 text-lg font-medium min-h-[44px] flex items-center justify-center hover:bg-[#E5A410] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  상담 신청
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
