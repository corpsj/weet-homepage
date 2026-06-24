'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

const COPY: Record<Language, {
  headline: string;
  lead: string;
  highlight: string;
  features: Array<{ title: string; body: string }>;
  sections: Array<{
    id: string;
    badge: string;
    title: string;
    quote: string;
    body: string;
    cta: string;
    image: { src: string; alt: string };
    imageOnRight: boolean;
  }>;
  overlayClose: string;
  viewLarger: string;
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
}> = {
  KO: {
    headline: '상업 공간 맞춤 솔루션',
    lead: "WEET의 상업 공간 맞춤 솔루션은 비즈니스의 시작과 확장을 가속화합니다.",
    highlight: "빠른 런칭과 유연한 운영, 남다른 공간 경험을 제공하는 B2B 모듈러 솔루션입니다.",
    features: [
      { title: '빠른 비즈니스 런칭', body: '미리 제작해 오프라인 공간 구축 기간을 크게 줄여, 비즈니스를 빠르게 시작하도록 돕습니다.' },
      { title: '유연한 확장과 이동', body: '비즈니스의 성장이나 타겟 지역의 변화에 맞춰 모듈을 추가하거나 통째로 새로운 부지로 이동할 수 있습니다.' },
      { title: '효율적인 운영 플로우', body: '고객의 동선, 설비의 배치, 공간의 목적 등 상업/업무 시설에 최적화된 설계를 1:1로 제안합니다.' },
      { title: '인프라 완벽 통합', body: '실무에 필요한 유틸리티와 네트워크, 보안, 브랜드 디자인까지 기획 단계부터 설계에 반영합니다.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: '"운영의 효율성과 고객의 경험을\n동시에 만족하는 공간"',
        body: "한정된 대지에서도 회전율을 높이는 바(Bar) 동선 설계, 브랜드 스토리를 담아내는 감각적인 외관 디자인. F&B 비즈니스를 위한 최적화된 설비와 인테리어를 모두 갖춘 채 현장으로 배송됩니다.",
        cta: '포트폴리오 보기',
        image: { src: '/images/handoff/bsp-cafe.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: "'브랜드 경험'이 필요한 곳,\n그곳이 어디든 즉시 전개합니다.",
        body: '단 며칠의 이벤트를 위해 버려지는 가설 건축물이 아닙니다. 정해진 기간 동안 일관된 브랜딩을 구현하고 이벤트가 끝나면 다른 지역으로 빠르게 옮겨 브랜드를 거듭 노출하는 스마트한 솔루션입니다.',
        cta: '포트폴리오 보기',
        image: { src: '/images/handoff/bsp-popup.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'accommodation',
        badge: 'HOSPITALITY & WORKSPACE',
        title: 'ACCOMMODATION / SITE OFFICE',
        quote: "어디서든 최고급 객실과\n쾌적한 업무 공간을 누리다",
        body: '스테이(Stay) 비즈니스를 위한 고급 숙박 시설이나 현장 인력을 위한 프리미엄 워크스페이스가 필요하신가요? 꼼꼼한 단열, 고급스러운 마감, 유틸리티 인프라가 통합된 모듈은 여러 채를 연결하여 대규모 시설로도 빠르게 확장할 수 있습니다.',
        cta: '포트폴리오 보기',
        image: { src: '/images/handoff/bsp-stay.webp', alt: 'Accommodation / Workspace' },
        imageOnRight: true,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH & LAB',
        title: 'SMART FARM',
        quote: "정밀하게 통제되는\n미래형 연구/생산 공간",
        body: '스마트팜은 외부 환경을 차단하고 내부를 정밀하게 통제해야 하는 공간입니다. 기밀성과 단열성이 높은 모듈 구조 안에 환경 제어 시스템과 네트워크를 통합해 안정적인 스마트팜 인프라를 제공합니다.',
        cta: '포트폴리오 보기',
        image: { src: '/images/handoff/bsp-farm.webp', alt: 'Smart Farm' },
        imageOnRight: false,
      },
    ],
    overlayClose: '닫기',
    viewLarger: '크게 보기 ⤢',
    finalCta: {
      eyebrow: "LET'S BUILD",
      title: '비즈니스에 맞는 공간, 함께 설계합니다.',
      description: '용도와 운영 방식을 들려주시면 기획 단계부터 1:1로 제안드립니다.',
      primary: 'B2B 상담 신청',
      secondary: '포트폴리오 보기',
    },
  },
  EN: {
    headline: 'Commercial Space Custom Solutions',
    lead: 'WEET\'s commercial custom solutions accelerate the launch and expansion of your business.',
    highlight: 'A B2B modular solution providing fast launches, flexible operations, and overwhelming spatial experiences.',
    features: [
      { title: 'Fast Business Launch', body: 'Prefabrication drastically reduces offline space construction time, helping your business start faster.' },
      { title: 'Flexible Expansion & Relocation', body: 'Add modules as your brand grows, or relocate the entire structure to a new site as target areas change.' },
      { title: 'Efficient Operational Flow', body: 'We offer 1:1 designs optimized for commercial/business facilities, focusing on customer circulation and equipment layout.' },
      { title: 'Perfect Infrastructure Integration', body: 'Utilities, networks, security, and brand design required for operations are integrated into the design from the planning stage.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: 'A space that satisfies both operational efficiency and customer experience.',
        body: 'Bar circulation designed to increase turnover even on limited land, and sensory exterior design that contains your brand story. It is delivered to the site fully equipped with optimized facilities and interiors for F&B businesses.',
        cta: 'View Portfolio',
        image: { src: '/images/handoff/bsp-cafe.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: 'Wherever a "brand experience" is needed, we deploy it immediately.',
        body: 'These are not temporary structures discarded after a few days. It is a smart solution that implements perfect branding for a set period and quickly moves to another area after the event to repeatedly expose the brand.',
        cta: 'View Portfolio',
        image: { src: '/images/handoff/bsp-popup.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'accommodation',
        badge: 'HOSPITALITY & WORKSPACE',
        title: 'ACCOMMODATION / SITE OFFICE',
        quote: "Enjoy luxury rooms and comfortable workspaces anywhere.",
        body: 'Do you need a luxury accommodation facility for a stay business or a premium workspace for field personnel? Modules with perfect insulation, luxurious finishes, and integrated utility infrastructure can be quickly expanded into large-scale facilities by connecting multiple units.',
        cta: 'View Portfolio',
        image: { src: '/images/handoff/bsp-stay.webp', alt: 'Accommodation / Workspace' },
        imageOnRight: true,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH & LAB',
        title: 'SMART FARM',
        quote: 'A precisely controlled futuristic research/production space.',
        body: 'A smart farm is a precise laboratory that must block external environments and perfectly control the interior. By integrating complex environmental control systems and networks within a modular structure with the highest airtightness and insulation, we provide the most stable smart farm infrastructure.',
        cta: 'View Portfolio',
        image: { src: '/images/handoff/bsp-farm.webp', alt: 'Smart Farm' },
        imageOnRight: false,
      },
    ],
    overlayClose: 'Close',
    viewLarger: 'View larger ⤢',
    finalCta: {
      eyebrow: "LET'S BUILD",
      title: "Let's design the right space for your business, together.",
      description: 'Tell us your use case and how you operate, and we will propose a one-on-one plan from the very first stage.',
      primary: 'Request a B2B consultation',
      secondary: 'View Portfolio',
    },
  },
  ES: {
    headline: 'Soluciones a Medida para Espacios Comerciales',
    lead: 'Las soluciones comerciales a medida de WEET aceleran el lanzamiento y la expansión de su negocio.',
    highlight: 'Una solución modular B2B que ofrece lanzamientos rápidos, operaciones flexibles y experiencias espaciales impactantes.',
    features: [
      { title: 'Lanzamiento Rápido del Negocio', body: 'La prefabricación reduce drásticamente el tiempo de construcción del espacio físico, ayudando a que su negocio arranque más rápido.' },
      { title: 'Expansión y Reubicación Flexible', body: 'Añada módulos a medida que su marca crece, o traslade toda la estructura a un nuevo emplazamiento conforme cambian las zonas objetivo.' },
      { title: 'Flujo Operativo Eficiente', body: 'Ofrecemos diseños personalizados optimizados para instalaciones comerciales y de negocio, centrados en la circulación del cliente y la distribución del equipamiento.' },
      { title: 'Integración Perfecta de la Infraestructura', body: 'Las utilidades, redes, seguridad y el diseño de marca necesarios para la operación se integran en el diseño desde la fase de planificación.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: 'Un espacio que satisface a la vez la eficiencia operativa y la experiencia del cliente.',
        body: 'Una circulación de barra diseñada para aumentar la rotación incluso en terrenos reducidos, y un diseño exterior sensorial que recoge la historia de su marca. Se entrega en obra totalmente equipado con las instalaciones e interiores optimizados para negocios de restauración.',
        cta: 'Ver portafolio',
        image: { src: '/images/handoff/bsp-cafe.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: 'Allí donde se necesite una "experiencia de marca", la desplegamos de inmediato.',
        body: 'No son estructuras temporales que se desechan tras unos días. Es una solución inteligente que aplica un branding impecable durante un periodo determinado y se traslada rápidamente a otra zona tras el evento para exponer la marca de forma reiterada.',
        cta: 'Ver portafolio',
        image: { src: '/images/handoff/bsp-popup.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'accommodation',
        badge: 'HOSPITALITY & WORKSPACE',
        title: 'ACCOMMODATION / SITE OFFICE',
        quote: 'Disfrute de habitaciones de lujo y espacios de trabajo confortables en cualquier lugar.',
        body: '¿Necesita un alojamiento de lujo para un negocio de hospedaje o un espacio de trabajo premium para el personal de obra? Los módulos con aislamiento perfecto, acabados de lujo e infraestructura de utilidades integrada pueden ampliarse con rapidez hasta convertirse en instalaciones de gran escala conectando varias unidades.',
        cta: 'Ver portafolio',
        image: { src: '/images/handoff/bsp-stay.webp', alt: 'Accommodation / Workspace' },
        imageOnRight: true,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH & LAB',
        title: 'SMART FARM',
        quote: 'Un espacio futurista de investigación y producción controlado con precisión.',
        body: 'Una granja inteligente es un laboratorio preciso que debe aislar el entorno exterior y controlar el interior a la perfección. Al integrar complejos sistemas de control ambiental y redes dentro de una estructura modular con la máxima estanqueidad y aislamiento, ofrecemos la infraestructura de granja inteligente más estable.',
        cta: 'Ver portafolio',
        image: { src: '/images/handoff/bsp-farm.webp', alt: 'Smart Farm' },
        imageOnRight: false,
      },
    ],
    overlayClose: 'Cerrar',
    viewLarger: 'Ver más grande ⤢',
    finalCta: {
      eyebrow: "LET'S BUILD",
      title: 'Diseñemos juntos el espacio ideal para su negocio.',
      description: 'Cuéntenos su uso y forma de operar, y le presentaremos una propuesta personalizada desde la primera fase.',
      primary: 'Solicitar asesoría B2B',
      secondary: 'Ver portafolio',
    },
  },
};

const IMAGES = [
  { id: 'small-cafe', src: '/images/handoff/bsp-cafe.webp', alt: 'Small Cafe' },
  { id: 'popup-store', src: '/images/handoff/bsp-popup.webp', alt: 'Pop-up Store' },
  { id: 'accommodation', src: '/images/handoff/bsp-stay.webp', alt: 'Accommodation' },
  { id: 'smart-farm', src: '/images/handoff/bsp-farm.webp', alt: 'Smart Farm' },
];

export default function BespokePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { language } = useLanguage();
  const copy = COPY[language];
  const selected = selectedId ? IMAGES.find((img) => img.id === selectedId) ?? null : null;
  const selectedSection = selectedId ? copy.sections.find((s) => s.id === selectedId) ?? null : null;

  // 라이트박스: Esc 키로 닫기 (시안 키보드 동작 보존)
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId]);

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* ===== HERO (dark, B2B premium) ===== */}
      <section
        id="what-is-bespoke"
        className="relative scroll-mt-[80px] overflow-hidden bg-weet-ink text-weet-paper"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(900px circle at 80% 10%, rgba(253,184,19,.10), transparent 55%)',
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-[5vw] pb-[90px] pt-[100px]">
          <div className="mb-[22px] font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-weet-gold">
            BESPOKE · B2B MODULAR
          </div>
          <h1 className="m-0 mb-10 max-w-[16ch] text-[clamp(40px,6vw,84px)] font-semibold leading-[1.0] tracking-[-0.04em] kr-balance">
            {copy.headline}
          </h1>
          <div className="grid grid-cols-1 items-start gap-12 min-[861px]:grid-cols-[1.4fr_1fr] min-[861px]:gap-16">
            <div>
              <p className="m-0 mb-[18px] text-[clamp(16px,1.6vw,20px)] font-light leading-[1.6] text-weet-paper/80 kr-balance">
                {copy.lead}
              </p>
              <p className="m-0 text-[clamp(18px,1.9vw,24px)] font-semibold leading-[1.45] tracking-[-0.02em] text-weet-paper kr-balance">
                {copy.highlight}
              </p>
            </div>
            <div className="flex flex-col gap-[18px]">
              {copy.features.map((feature, idx) => (
                <div
                  key={feature.title}
                  style={{ animationDelay: `${0.12 * idx}s` }}
                  className="wt-reveal border-l-2 border-weet-paper/30 py-0.5 pl-5 transition-colors duration-300 hover:border-weet-gold"
                >
                  <strong className="mb-1.5 block text-[16px] font-semibold text-weet-paper">
                    {feature.title}
                  </strong>
                  <span className="text-[13.5px] leading-[1.65] text-weet-muted kr-balance">
                    {feature.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALTERNATING BANDS ===== */}
      {copy.sections.map((section, idx) => {
        const reverse = !section.imageOnRight;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-[80px] overflow-hidden ${
              idx % 2 === 1 ? 'bg-weet-paper-alt' : 'bg-weet-paper'
            }`}
          >
            <div className="wt-reveal mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-[5vw] py-24 min-[861px]:grid-cols-2 min-[861px]:gap-16 max-[860px]:py-14">
              {/* image */}
              <div className={reverse ? 'min-[861px]:order-2' : ''}>
                <button
                  type="button"
                  onClick={() => setSelectedId(section.id)}
                  aria-label={section.title}
                  className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[14px] border border-weet-line-2 shadow-weet-float"
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute bottom-4 right-4 translate-y-1.5 rounded-full bg-weet-ink/70 px-3 py-1.5 font-mono text-[11px] font-semibold text-weet-paper opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {copy.viewLarger}
                  </span>
                </button>
              </div>

              {/* text */}
              <div className={reverse ? 'min-[861px]:order-1' : ''}>
                <span className="mb-4 block font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-weet-gold-deep">
                  {section.badge}
                </span>
                <h2 className="m-0 mb-5 text-[clamp(28px,3.4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] kr-balance">
                  {section.title}
                </h2>
                <p className="m-0 mb-[18px] whitespace-pre-line text-[clamp(17px,1.7vw,22px)] font-semibold leading-[1.4] tracking-[-0.01em] text-weet-ink kr-balance">
                  {section.quote}
                </p>
                <p className="m-0 max-w-[46ch] text-[15px] leading-[1.85] text-weet-sub kr-balance">
                  {section.body}
                </p>
                {/* TODO(ux): /projects가 ?category= 필터를 지원하면 유형별 링크로 분기 */}
                <Link
                  href="/projects"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-[6px] border border-weet-line-2 px-5 py-3 text-[14px] font-semibold text-weet-ink transition-colors duration-200 hover:border-weet-gold-deep hover:text-weet-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
                >
                  {section.cta} →
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== CTA ===== */}
      <section className="bg-weet-ink text-weet-paper">
        <div className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-24 text-center max-[860px]:py-14">
          <div className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-weet-gold">
            {copy.finalCta.eyebrow}
          </div>
          <h2 className="mx-auto mb-4 max-w-[22ch] text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.03em] kr-balance">
            {copy.finalCta.title}
          </h2>
          <p className="mx-auto mb-[34px] max-w-[44ch] text-[16px] font-light leading-[1.7] text-weet-paper/65 kr-balance">
            {copy.finalCta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/support"
              className="rounded-[6px] bg-weet-gold px-[30px] py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.finalCta.primary} →
            </Link>
            <Link
              href="/projects"
              className="rounded-[6px] border border-weet-paper/40 px-7 py-3.5 text-[15px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.finalCta.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {selectedId && selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-weet-ink-deep/95 p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label={copy.overlayClose}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-weet-paper/10 text-weet-paper transition-all duration-200 hover:rotate-90 hover:bg-weet-paper/20"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </button>
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-[1100px]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="relative max-h-[82vh] w-full overflow-hidden rounded-[8px]">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  width={1600}
                  height={1200}
                  sizes="100vw"
                  className="h-auto max-h-[82vh] w-full object-contain"
                  priority
                />
              </div>
              {selectedSection && (
                <div className="mt-4 text-center font-mono text-[12px] tracking-[0.14em] text-weet-muted">
                  {selectedSection.badge} · {selectedSection.title}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
