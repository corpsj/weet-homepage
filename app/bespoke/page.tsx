'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
}> = {
  KO: {
    headline: '상업 공간 맞춤 솔루션',
    lead: "WEET의 상업 공간 맞춤 솔루션은 비즈니스의 시작과 확장을 가속화합니다.",
    highlight: "빠른 런칭, 유연한 운영, 압도적인 공간 경험을 제공하는 B2B 모듈러 솔루션입니다.",
    features: [
      { title: '빠른 비즈니스 런칭', body: '사전 제작을 통해 오프라인 공간 구축 기간을 획기적으로 단축하여 비즈니스의 빠른 시작을 돕습니다.' },
      { title: '유연한 확장과 이동', body: '비즈니스의 성장이나 타겟 지역의 변화에 맞춰 모듈을 추가하거나 통째로 새로운 부지로 이동할 수 있습니다.' },
      { title: '효율적인 운영 플로우', body: '고객의 동선, 설비의 배치, 공간의 목적 등 상업/업무 시설에 최적화된 설계를 1:1로 제안합니다.' },
      { title: '인프라 완벽 통합', body: '실무에 필요한 유틸리티, 네트워크, 보안, 그리고 브랜드 디자인을 기획 단계부터 설계에 반영합니다.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: '"운영의 효율성과 고객의 경험을\n동시에 만족하는 공간"',
        body: "한정된 대지에서도 회전율을 높이는 바(Bar) 동선 설계, 브랜드 스토리를 담아내는 감각적인 외관 디자인. F&B 비즈니스를 위한 최적화된 설비와 인테리어를 모두 갖춘 채 현장으로 배송됩니다.",
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: "'브랜드 경험'이 필요한 곳,\n그곳이 어디든 즉시 전개합니다.",
        body: '단 며칠의 이벤트를 위해 버려지는 가설 건축물이 아닙니다. 정해진 기간 동안 일관된 브랜딩을 구현하고, 이벤트 종료 후에는 다른 지역으로 신속하게 이동하여 브랜드를 반복적으로 노출하는 스마트한 솔루션입니다.',
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'accommodation',
        badge: 'HOSPITALITY & WORKSPACE',
        title: 'ACCOMMODATION / SITE OFFICE',
        quote: "어디서든 최고급 객실과\n쾌적한 업무 공간을 누리다",
        body: '스테이(Stay) 비즈니스를 위한 고급 숙박 시설이나 현장 인력을 위한 프리미엄 워크스페이스가 필요하신가요? 꼼꼼한 단열, 고급스러운 마감, 유틸리티 인프라가 통합된 모듈은 여러 채를 연결하여 대규모 시설로도 빠르게 확장할 수 있습니다.',
        cta: 'View Portfolio',
        image: { src: '/images/modular/generated/flexible-commercial.webp', alt: 'Accommodation / Workspace' },
        imageOnRight: true,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH & LAB',
        title: 'SMART FARM',
        quote: "정밀하게 통제되는\n미래형 연구/생산 공간",
        body: '스마트팜은 외부 환경을 차단하고 내부를 정밀하게 통제해야 하는 공간입니다. 높은 기밀성과 단열성을 갖춘 모듈 구조 내부에 환경 제어 시스템과 네트워크를 통합하여, 안정적인 스마트팜 인프라를 제공합니다.',
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
        imageOnRight: false,
      },
    ],
    overlayClose: '닫기',
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
        cta: 'View portfolio',
        image: { src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: 'Wherever a "brand experience" is needed, we deploy it immediately.',
        body: 'These are not temporary structures discarded after a few days. It is a smart solution that implements perfect branding for a set period and quickly moves to another area after the event to repeatedly expose the brand.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'accommodation',
        badge: 'HOSPITALITY & WORKSPACE',
        title: 'ACCOMMODATION / SITE OFFICE',
        quote: "Enjoy luxury rooms and comfortable workspaces anywhere.",
        body: 'Do you need a luxury accommodation facility for a stay business or a premium workspace for field personnel? Modules with perfect insulation, luxurious finishes, and integrated utility infrastructure can be quickly expanded into large-scale facilities by connecting multiple units.',
        cta: 'View portfolio',
        image: { src: '/images/modular/generated/flexible-commercial.webp', alt: 'Accommodation / Workspace' },
        imageOnRight: true,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH & LAB',
        title: 'SMART FARM',
        quote: 'A precisely controlled futuristic research/production space.',
        body: 'A smart farm is a precise laboratory that must block external environments and perfectly control the interior. By integrating complex environmental control systems and networks within a modular structure with the highest airtightness and insulation, we provide the most stable smart farm infrastructure.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
        imageOnRight: false,
      },
    ],
    overlayClose: 'Close',
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
        cta: 'View portfolio',
        image: { src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: 'Allí donde se necesite una "experiencia de marca", la desplegamos de inmediato.',
        body: 'No son estructuras temporales que se desechan tras unos días. Es una solución inteligente que aplica un branding impecable durante un periodo determinado y se traslada rápidamente a otra zona tras el evento para exponer la marca de forma reiterada.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'accommodation',
        badge: 'HOSPITALITY & WORKSPACE',
        title: 'ACCOMMODATION / SITE OFFICE',
        quote: 'Disfrute de habitaciones de lujo y espacios de trabajo confortables en cualquier lugar.',
        body: '¿Necesita un alojamiento de lujo para un negocio de hospedaje o un espacio de trabajo premium para el personal de obra? Los módulos con aislamiento perfecto, acabados de lujo e infraestructura de utilidades integrada pueden ampliarse con rapidez hasta convertirse en instalaciones de gran escala conectando varias unidades.',
        cta: 'View portfolio',
        image: { src: '/images/modular/generated/flexible-commercial.webp', alt: 'Accommodation / Workspace' },
        imageOnRight: true,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH & LAB',
        title: 'SMART FARM',
        quote: 'Un espacio futurista de investigación y producción controlado con precisión.',
        body: 'Una granja inteligente es un laboratorio preciso que debe aislar el entorno exterior y controlar el interior a la perfección. Al integrar complejos sistemas de control ambiental y redes dentro de una estructura modular con la máxima estanqueidad y aislamiento, ofrecemos la infraestructura de granja inteligente más estable.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
        imageOnRight: false,
      },
    ],
    overlayClose: 'Cerrar',
  },
};

const IMAGES = [
  { id: 'small-cafe', src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
  { id: 'popup-store', src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
  { id: 'accommodation', src: '/images/modular/generated/flexible-commercial.webp', alt: 'Accommodation' },
  { id: 'smart-farm', src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
];

export default function BespokePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="min-h-screen bg-white">
      <section id="what-is-bespoke" className="bg-gray-50 py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-[88px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-black mb-8 md:mb-12 leading-tight text-gray-900">
              {copy.headline}
            </h1>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="lg:w-[65%]">
                <p className="text-[16px] md:text-[20px] leading-relaxed mb-6 text-gray-600 break-keep">
                  {copy.lead}
                </p>
                <p className="text-[18px] md:text-[24px] font-bold text-gray-900 break-keep">
                  {copy.highlight}
                </p>
              </div>

              <div className="lg:w-[35%] space-y-6 text-[15px] md:text-[16px] text-gray-600">
                {copy.features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * idx, duration: 0.6 }}
                    className="border-l-2 border-gray-300 pl-6 hover:border-[#FEBD16] transition-colors"
                  >
                    <strong className="block text-black text-lg mb-1">{feature.title}</strong>
                    {feature.body}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {copy.sections.map((section) => {
        const imageBlock = (
          <motion.div
            key={`${section.id}-image`}
            className="relative h-[400px] md:h-[600px] w-full cursor-pointer overflow-hidden rounded-md border border-gray-100 bg-gray-100"
            onClick={() => setSelectedId(section.id)}
          >
            <Image
              src={section.image.src}
              alt={section.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </motion.div>
        );

        const textBlock = (
          <div
            key={`${section.id}-text`}
            className={`w-full lg:w-1/2 ${section.imageOnRight ? '' : 'order-1 lg:order-2'}`}
          >
            <span className="text-gray-500 font-bold text-sm mb-4 block">{section.badge}</span>
            <h2 className="text-[32px] md:text-[50px] lg:text-[60px] font-black mb-6 leading-tight text-gray-900">{section.title}</h2>
            <p className="text-[18px] md:text-[24px] font-bold mb-6 text-gray-800 break-keep whitespace-pre-line">
              {section.quote}
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg break-keep">
              {section.body}
            </p>
          </div>
        );

        return (
          <section
            key={section.id}
            id={section.id}
            className={`${section.imageOnRight ? 'bg-white' : 'bg-gray-50'} py-20 md:py-32 overflow-hidden scroll-mt-[88px]`}
          >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {section.imageOnRight ? (
                  <>
                    {textBlock}
                    <div className="w-full lg:w-1/2">
                      {imageBlock}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="order-2 w-full lg:order-1 lg:w-1/2">
                      {imageBlock}
                    </div>
                    {textBlock}
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-7xl h-auto aspect-video md:h-[85vh] md:w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {IMAGES.find((img) => img.id === selectedId) && (
                <Image
                  src={IMAGES.find((img) => img.id === selectedId)!.src}
                  alt={IMAGES.find((img) => img.id === selectedId)!.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              )}
              <button
                className="absolute -top-12 right-0 text-white hover:text-[#FEBD16] transition-colors"
                onClick={() => setSelectedId(null)}
              >
                <X className="w-8 h-8" />
                <span className="sr-only">{copy.overlayClose}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
