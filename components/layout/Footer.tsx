import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Carrot, MessageCircle } from 'lucide-react';
import { telHref, type SiteSettings } from '@/lib/site-settings';
import { BRAND } from '@/lib/site';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { language } = useLanguage();
  return (
    <footer className="bg-[#1f2422] text-gray-300 pt-[19px] pb-4 md:pt-[27px] md:pb-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
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
            <h3 className="text-[20px] md:text-[28px] font-bold text-white font-sans leading-none mb-2">
              'WE make dreams comE <Link href="/admin" className="cursor-default text-inherit hover:no-underline">True</Link>'
            </h3>
            <div className="text-[11px] md:text-[12px] text-gray-400 leading-relaxed font-medium">
              {language === 'KO' ? (
                <p>
                  {BRAND.legal} &nbsp;|&nbsp; 전남 함평군 대동면 금산길 205-27 &nbsp;|&nbsp; 사업자 등록번호 660-86-01862 &nbsp;|&nbsp;{' '}
                  <a href={telHref(settings.contact_phone)} className="hover:text-white transition-colors">{settings.contact_phone}</a>
                  {settings.consult_hours && <span> &nbsp;|&nbsp; 상담 {settings.consult_hours}</span>}
                </p>
              ) : language === 'ES' ? (
                <p>
                  {BRAND.en} Co., Ltd. &nbsp;|&nbsp; 205-27, Geumsan-gil, Daedong-myeon, Hampyeong-gun, Jeollanam-do, República de Corea <br className="hidden md:block" /> Reg. mercantil 660-86-01862 &nbsp;|&nbsp;{' '}
                  <a href={telHref(settings.contact_phone)} className="hover:text-white transition-colors">{settings.contact_phone}</a>
                </p>
              ) : (
                <p>
                  {BRAND.en} Co., Ltd. &nbsp;|&nbsp; 205-27, Geumsan-gil, Daedong-myeon, Hampyeong-gun, Jeollanam-do, Republic of Korea <br className="hidden md:block" /> Business Reg. 660-86-01862 &nbsp;|&nbsp;{' '}
                  <a href={telHref(settings.contact_phone)} className="hover:text-white transition-colors">{settings.contact_phone}</a>
                </p>
              )}
            </div>
          </div>

          {/* Right side - Copyright and Links */}
          <div className="text-left md:text-right space-y-3 flex-shrink-0">
            <div className="flex items-center gap-5 md:justify-end text-gray-300">
              {settings.kakao_channel_url && (
                <Link
                  href={settings.kakao_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-bold hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="카카오톡 채널"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-[13px] pt-0.5">카카오톡</span>
                </Link>
              )}
              <Link
                href={settings.daangn_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="당근마켓"
              >
                <Carrot className="w-5 h-5" />
                <span className="text-[13px] pt-0.5">당근</span>
              </Link>
              <Link
                href={settings.naver_blog_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="네이버 블로그"
              >
                <span className="text-[20px] font-bold leading-none mt-[-2px]">N</span>
                <span className="text-[13px] pt-0.5">blog</span>
              </Link>
              <Link
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-bold hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="인스타그램"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-[13px] pt-0.5">instagram</span>
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] md:text-[12px] font-bold text-gray-400 whitespace-nowrap">
                Copyright © weet All right reserved
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-gray-400 md:justify-end font-bold">
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">{{ KO: '개인정보 처리방침', EN: 'Privacy Policy', ES: 'Política de privacidad' }[language]}</Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">{{ KO: '이용약관', EN: 'Terms of Use', ES: 'Términos de uso' }[language]}</Link>
                <span>|</span>
                <Link href="/company" className="hover:text-white transition-colors duration-200">{{ KO: '회사소개', EN: 'About Us', ES: 'Empresa' }[language]}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
