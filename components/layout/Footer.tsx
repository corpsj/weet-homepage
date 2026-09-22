'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Carrot } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';
import { telHref } from '@/lib/site-settings';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { language } = useLanguage();
  return (
    <footer className="bg-primary pt-[19px] pb-4 md:pt-[27px] md:pb-6">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
        <div className="flex flex-col xl:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3 flex-shrink-0 pb-2 transform-none">
            <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
              <Image
                src="/images/company/weet-logo.webp"
                alt="위트(weet) 로고"
                fill
                sizes="(max-width: 768px) 100px, 120px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Center - Company Info */}
          <div className="flex-1 space-y-1 md:ml-4 pb-1">
            <h3 className="text-[20px] md:text-[28px] font-bold text-black font-sans leading-none mb-2">
              WE make dreams comE True
            </h3>
            <div className="text-[11px] md:text-[12px] text-black leading-relaxed font-medium">
              <p className="mb-3 text-sm"><Link href="/customize" className="mr-4 underline underline-offset-4">맞춤 구성</Link><Link href="/guides/mobile-home-cost" className="mr-4 underline underline-offset-4">비용 안내</Link><a href={telHref(settings.contact_phone)} className="underline underline-offset-4">전화 상담</a></p>
              {language === 'KO' ? (
                <p>주식회사 위트(weet) &nbsp;|&nbsp; 함평군 대동면 금산길 205-27 &nbsp;|&nbsp; 사업자 등록번호 660-86-01862 &nbsp;|&nbsp; {settings.contact_phone}</p>
              ) : (
                <p>weet Co., Ltd. (weet) &nbsp;|&nbsp; 205-27, Geumsan-gil, Daedong-myeon, Hampyeong-gun, Jeollanam-do, Republic of Korea <br className="hidden md:block" /> Business Reg. 660-86-01862 &nbsp;|&nbsp; {settings.contact_phone}</p>
              )}
            </div>
          </div>

          {/* Right side - Copyright and Links */}
          <div className="text-left md:text-right space-y-3 flex-shrink-0">
            <div className="flex items-center gap-5 md:justify-end text-black">
              <Link
                href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/"
                target="_blank"
                className="flex items-center gap-1.5 font-bold hover:text-black/70 transition-all duration-200"
                aria-label="당근마켓"
              >
                <Carrot className="w-5 h-5" />
                <span className="text-[13px] pt-0.5">당근</span>
              </Link>
              <Link
                href="https://blog.naver.com/we-et"
                target="_blank"
                className="flex items-center gap-1.5 font-bold hover:text-black/70 transition-all duration-200"
                aria-label="네이버 블로그"
              >
                <span className="text-[20px] font-bold leading-none mt-[-2px]">N</span>
                <span className="text-[13px] pt-0.5">blog</span>
              </Link>
              <Link
                href="https://www.instagram.com/weet_kr/"
                target="_blank"
                className="flex items-center gap-1.5 font-bold hover:text-black/70 transition-all duration-200"
                aria-label="인스타그램"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-[13px] pt-0.5">instagram</span>
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] md:text-[12px] font-bold text-black whitespace-nowrap">
                Copyright © weet All right reserved
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-black md:justify-end font-bold">
                <Link href="/privacy" className="hover:text-black/70 transition-colors duration-200">{language === 'KO' ? '개인정보 처리방침' : 'Privacy Policy'}</Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-black/70 transition-colors duration-200">{language === 'KO' ? '이용약관' : 'Terms of Use'}</Link>
                <span>|</span>
                <Link href="/company" className="hover:text-black/70 transition-colors duration-200">{language === 'KO' ? '회사소개' : 'About Us'}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
