"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Instagram, Youtube, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "모듈러건축 소개", href: "/modular" },
    { name: "제품 소개", href: "/products" },
    { name: "BESPOKE", href: "/bespoke" },
    { name: "SOLUTION", href: "/solution" },
    { name: "회사소개", href: "/company" },
    { name: "고객지원", href: "/support" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[123px]">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-[120px] h-[120px] md:w-[164px] md:h-[149px] bg-yellow-400 rounded-full flex items-center justify-center relative -my-6 md:-my-8 z-20">
              <span className="text-[24px] md:text-[32px] font-bold text-black">weet:)</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] xl:text-[16px] font-medium transition-all whitespace-nowrap relative py-2
                  ${pathname === item.href ? "text-black font-bold" : "text-gray-600 hover:text-yellow-500"}`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-[3px] bg-yellow-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side: Social & CTA */}
          <div className="hidden md:flex items-center space-x-4 xl:space-x-6">
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-green-500"
                aria-label="Naver Blog"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-pink-500"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-500"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
            
            <Link 
              href="/reservation"
              className="bg-black text-white px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              상담 예약
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100 absolute left-0 right-0 top-[100px] shadow-lg"
            >
              <nav className="flex flex-col p-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[16px] font-medium py-2 border-b border-gray-50
                      ${pathname === item.href ? "text-yellow-500 font-bold" : "text-gray-700"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 flex flex-col space-y-4">
                  <Link
                    href="/reservation"
                    className="bg-black text-white text-center py-3 rounded-lg font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    상담 예약하기
                  </Link>
                  
                  <div className="flex justify-center space-x-6 pt-2">
                    <a href="#" className="text-gray-500 hover:text-green-500">
                      <MessageCircle size={24} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-pink-500">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-red-500">
                      <Youtube size={24} />
                    </a>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
