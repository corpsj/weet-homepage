'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Carrot, MessageCircle } from 'lucide-react';
import { telHref, type SiteSettings } from '@/lib/site-settings';
import { BRAND } from '@/lib/site';

type Lang = 'KO' | 'EN' | 'ES';
type FooterCol = { title: string; links: { label: string; href: string }[] };

const footerNav: Record<Lang, FooterCol[]> = {
  KO: [
    {
      title: '제품',
      links: [
        { label: '모듈러건축', href: '/modular' },
        { label: '제품소개', href: '/products' },
        { label: 'BESPOKE', href: '/bespoke' },
        { label: '나만의 위트 만들기', href: '/customize' },
      ],
    },
    {
      title: '회사',
      links: [
        { label: '회사소개', href: '/company' },
        { label: '솔루션', href: '/solution' },
        { label: '프로젝트', href: '/projects' },
        { label: '갤러리', href: '/company#gallery' },
      ],
    },
    {
      title: '지원',
      links: [
        { label: '고객지원', href: '/support' },
        { label: '인허가 안내', href: '/support#permits' },
        { label: '비용 안내', href: '/support#cost' },
        { label: '자주 묻는 질문', href: '/support#faq' },
      ],
    },
  ],
  EN: [
    {
      title: 'Products',
      links: [
        { label: 'Modular', href: '/modular' },
        { label: 'Products', href: '/products' },
        { label: 'BESPOKE', href: '/bespoke' },
        { label: 'Build Yours', href: '/customize' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/company' },
        { label: 'Solution', href: '/solution' },
        { label: 'Projects', href: '/projects' },
        { label: 'Gallery', href: '/company#gallery' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Support', href: '/support' },
        { label: 'Permits', href: '/support#permits' },
        { label: 'Costs', href: '/support#cost' },
        { label: 'FAQ', href: '/support#faq' },
      ],
    },
  ],
  ES: [
    {
      title: 'Productos',
      links: [
        { label: 'Modular', href: '/modular' },
        { label: 'Productos', href: '/products' },
        { label: 'BESPOKE', href: '/bespoke' },
        { label: 'Crea el tuyo', href: '/customize' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Empresa', href: '/company' },
        { label: 'Solución', href: '/solution' },
        { label: 'Proyectos', href: '/projects' },
        { label: 'Galería', href: '/company#gallery' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Soporte', href: '/support' },
        { label: 'Permisos', href: '/support#permits' },
        { label: 'Costos', href: '/support#cost' },
        { label: 'FAQ', href: '/support#faq' },
      ],
    },
  ],
};

const tagline: Record<Lang, string> = {
  KO: '작은 공간, 선명한 기준. 모델 선택부터 운송·설치, 예상 비용까지 모든 과정을 투명하게 안내합니다.',
  EN: 'Small spaces, clear standards. From model selection to transport, installation, and estimated cost — every step, transparent.',
  ES: 'Espacios pequeños, estándares claros. Desde la elección del modelo hasta el transporte, la instalación y el costo estimado, todo transparente.',
};

const legalLabel = { KO: '회사소개', EN: 'About Us', ES: 'Empresa' } as const;
const privacyLabel = { KO: '개인정보처리방침', EN: 'Privacy Policy', ES: 'Política de privacidad' } as const;
const termsLabel = { KO: '이용약관', EN: 'Terms of Use', ES: 'Términos de uso' } as const;

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { language } = useLanguage();
  const cols = footerNav[language];

  return (
    <footer className="bg-weet-ink-deep text-weet-muted">
      <div className="mx-auto max-w-[1440px] px-[5vw] pb-10 pt-[72px]">
        {/* 상단: 브랜드 + 링크 컬럼 (flex-wrap 반응형) */}
        <div className="flex flex-wrap gap-x-12 gap-y-10">
          {/* 브랜드 */}
          <div className="min-w-[260px] flex-1 basis-[320px]">
            <Image
              src="/images/handoff/weet-wordmark.webp"
              alt="weet"
              width={406}
              height={123}
              className="h-[24px] w-auto opacity-95 brightness-0 invert"
            />
            <p className="mt-[18px] max-w-[34ch] text-[13.5px] leading-[1.75] text-weet-muted kr-balance">
              {tagline[language]}
            </p>
            <div className="mt-6 flex gap-2.5">
              {settings.kakao_channel_url && (
                <Link
                  href={settings.kakao_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="카카오톡 채널"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-weet-paper/20 text-weet-paper/85 transition-transform duration-150 hover:-translate-y-0.5 hover:text-weet-gold"
                >
                  <MessageCircle className="h-[18px] w-[18px]" />
                </Link>
              )}
              <Link
                href={settings.daangn_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="당근"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-weet-paper/20 text-weet-paper/85 transition-transform duration-150 hover:-translate-y-0.5 hover:text-weet-gold"
              >
                <Carrot className="h-[18px] w-[18px]" />
              </Link>
              <Link
                href={settings.naver_blog_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="네이버 블로그"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-weet-paper/20 text-[15px] font-bold text-weet-paper/85 transition-transform duration-150 hover:-translate-y-0.5 hover:text-weet-gold"
              >
                N
              </Link>
              <Link
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-weet-paper/20 text-weet-paper/85 transition-transform duration-150 hover:-translate-y-0.5 hover:text-weet-gold"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>

          {/* 링크 컬럼 */}
          {cols.map((col) => (
            <div key={col.title} className="min-w-[120px]">
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-weet-muted/80">
                {col.title}
              </h4>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-[13.5px] text-weet-muted transition-colors hover:text-weet-gold"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 법적 정보 (사업자 등록 등 필수 표기) */}
        <div className="mt-12 border-t border-weet-paper/10 pt-6 text-[11.5px] leading-relaxed text-weet-muted/80">
          {language === 'KO' ? (
            <p>
              {BRAND.legal} &nbsp;|&nbsp; 전남 함평군 대동면 금산길 205-27 &nbsp;|&nbsp; 사업자 등록번호 660-86-01862
              {settings.business_representative && (
                <span> &nbsp;|&nbsp; 대표자 {settings.business_representative}</span>
              )}
              {settings.mail_order_sales_number && (
                <span> &nbsp;|&nbsp; 통신판매업 신고번호 {settings.mail_order_sales_number}</span>
              )}
              &nbsp;|&nbsp;{' '}
              <a href={telHref(settings.contact_phone)} className="transition-colors hover:text-weet-gold">
                {settings.contact_phone}
              </a>
              {settings.contact_email && (
                <span>
                  {' '}
                  &nbsp;|&nbsp;{' '}
                  <a href={`mailto:${settings.contact_email}`} className="transition-colors hover:text-weet-gold">
                    {settings.contact_email}
                  </a>
                </span>
              )}
              {settings.consult_hours && <span> &nbsp;|&nbsp; 상담 {settings.consult_hours}</span>}
            </p>
          ) : language === 'ES' ? (
            <p>
              {BRAND.en} Co., Ltd. &nbsp;|&nbsp; 205-27, Geumsan-gil, Daedong-myeon, Hampyeong-gun, Jeollanam-do,
              República de Corea &nbsp;|&nbsp; Reg. mercantil 660-86-01862
              {settings.business_representative && (
                <span> &nbsp;|&nbsp; Representante legal: {settings.business_representative}</span>
              )}
              {settings.mail_order_sales_number && (
                <span> &nbsp;|&nbsp; Reg. de venta a distancia: {settings.mail_order_sales_number}</span>
              )}
              &nbsp;|&nbsp;{' '}
              <a href={telHref(settings.contact_phone)} className="transition-colors hover:text-weet-gold">
                {settings.contact_phone}
              </a>
              {settings.contact_email && (
                <span>
                  {' '}
                  &nbsp;|&nbsp;{' '}
                  <a href={`mailto:${settings.contact_email}`} className="transition-colors hover:text-weet-gold">
                    {settings.contact_email}
                  </a>
                </span>
              )}
            </p>
          ) : (
            <p>
              {BRAND.en} Co., Ltd. &nbsp;|&nbsp; 205-27, Geumsan-gil, Daedong-myeon, Hampyeong-gun, Jeollanam-do,
              Republic of Korea &nbsp;|&nbsp; Business Reg. 660-86-01862
              {settings.business_representative && (
                <span> &nbsp;|&nbsp; Representative: {settings.business_representative}</span>
              )}
              {settings.mail_order_sales_number && (
                <span> &nbsp;|&nbsp; Mail-Order Sales Reg. {settings.mail_order_sales_number}</span>
              )}
              &nbsp;|&nbsp;{' '}
              <a href={telHref(settings.contact_phone)} className="transition-colors hover:text-weet-gold">
                {settings.contact_phone}
              </a>
              {settings.contact_email && (
                <span>
                  {' '}
                  &nbsp;|&nbsp;{' '}
                  <a href={`mailto:${settings.contact_email}`} className="transition-colors hover:text-weet-gold">
                    {settings.contact_email}
                  </a>
                </span>
              )}
            </p>
          )}
        </div>

        {/* 하단: 카피라이트 + 약관 */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11.5px] text-weet-muted/70">
            © 2026 WEET. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-weet-muted/80">
            <Link href="/terms" className="transition-colors hover:text-weet-gold">
              {termsLabel[language]}
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-weet-gold">
              {privacyLabel[language]}
            </Link>
            <Link href="/company" className="transition-colors hover:text-weet-gold">
              {legalLabel[language]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
