"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { V2_NAV_ITEMS } from '@/lib/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export function HeaderV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY >= 50);

      if (currentScrollY < 50) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const headerClass = cn(
    'fixed top-0 left-0 right-0 w-full transition-all duration-300 z-50',
    isScrolled
      ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
      : 'bg-background/80 backdrop-blur-sm',
    isHidden ? '-translate-y-full' : 'translate-y-0'
  );

  const headerHeight = isScrolled ? 'h-16' : 'h-20';

  return (
    <header className={headerClass}>
      <div className={cn(
        'mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-between transition-all duration-300',
        headerHeight
      )}>
        {/* Logo */}
        <Link
          href="/home"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          aria-label="위트 홈으로 가기"
        >
          <div
            ref={logoRef}
            data-easter-egg="logo"
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-[#2D2D2A] text-xs leading-none cursor-pointer"
          >
            weet:)
          </div>
          <span className="hidden sm:block font-semibold text-foreground text-sm tracking-tight">
            시스템건축
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {V2_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-sm font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent',
                        isActive
                          ? 'text-primary border-b-2 border-primary rounded-none'
                          : 'text-foreground/80 hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/support-v2"
            className="inline-flex items-center justify-center bg-primary text-[#2D2D2A] rounded-full px-5 py-2.5 text-sm font-semibold min-h-[44px] hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            상담 신청
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="lg:hidden w-11 h-11 flex items-center justify-center text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label="메뉴 열기"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 bg-background">
            <div className="flex flex-col h-full">
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <Link
                  href="/home"
                  className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-[#2D2D2A] text-xs">
                    weet:)
                  </div>
                  <span className="font-semibold text-foreground text-sm">시스템건축</span>
                </Link>
                <SheetClose asChild>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors"
                    aria-label="메뉴 닫기"
                  >
                    <X size={20} />
                  </button>
                </SheetClose>
              </div>

              {/* Sheet Nav */}
              <nav className="flex flex-col flex-1 overflow-y-auto px-4 py-4" aria-label="모바일 메뉴">
                {V2_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center min-h-[56px] px-3 text-base font-medium rounded-lg transition-colors border-b border-border/50 last:border-0',
                          isActive
                            ? 'text-primary bg-primary/5'
                            : 'text-foreground hover:text-primary hover:bg-primary/5'
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Sheet CTA */}
              <div className="px-6 py-6 border-t border-border">
                <SheetClose asChild>
                  <Link
                    href="/support-v2"
                    className="flex items-center justify-center w-full bg-primary text-[#2D2D2A] rounded-full py-4 text-base font-semibold min-h-[52px] hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    상담 신청
                  </Link>
                </SheetClose>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  카카오톡 · 전화 · 이메일 상담 가능
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
