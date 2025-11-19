"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[123px]">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-[120px] h-[120px] md:w-[164px] md:h-[149px] bg-yellow-400 rounded-full flex items-center justify-center relative -my-6 md:-my-8">
              <span className="text-[24px] md:text-[32px] font-bold text-black">weet:)</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-12">
            <Link
              href="/modular"
              className="text-[14px] xl:text-[16px] font-medium hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              모듈러건축 소개
            </Link>
            <Link
              href="/products"
              className="text-[14px] xl:text-[16px] font-medium hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              제품 소개
            </Link>
            <Link
              href="/bespoke"
              className="text-[14px] xl:text-[16px] font-medium hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              BESPOKE
            </Link>
            <Link
              href="/solution"
              className="text-[14px] xl:text-[16px] font-medium hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              SOLUTION
            </Link>
            <Link
              href="/company"
              className="text-[14px] xl:text-[16px] font-medium hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              회사소개
            </Link>
            <Link
              href="/support"
              className="text-[14px] xl:text-[16px] font-medium hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              고객지원
            </Link>
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4 xl:space-x-6">
            <a
              href="#"
              className="text-[12px] xl:text-[14px] hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              N blog
            </a>
            <a
              href="#"
              className="text-[12px] xl:text-[14px] hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              📷 instagram
            </a>
            <a
              href="#"
              className="text-[12px] xl:text-[14px] hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              ▶ youtube
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/modular"
                className="text-[14px] font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                모듈러건축 소개
              </Link>
              <Link
                href="/products"
                className="text-[14px] font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                제품 소개
              </Link>
              <Link
                href="/bespoke"
                className="text-[14px] font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                BESPOKE
              </Link>
              <Link
                href="/solution"
                className="text-[14px] font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SOLUTION
              </Link>
              <Link
                href="/company"
                className="text-[14px] font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                회사소개
              </Link>
              <Link
                href="/support"
                className="text-[14px] font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                고객지원
              </Link>

              {/* Mobile Social Links */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 md:hidden">
                <a href="#" className="text-[12px] hover:text-yellow-400 transition-colors">
                  N blog
                </a>
                <a href="#" className="text-[12px] hover:text-yellow-400 transition-colors">
                  📷 instagram
                </a>
                <a href="#" className="text-[12px] hover:text-yellow-400 transition-colors">
                  ▶ youtube
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
