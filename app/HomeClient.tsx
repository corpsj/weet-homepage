'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Home,
  MapPinned,
  MessagesSquare,
  Phone,
  Ruler,
  Store,
  Truck,
  Wrench,
} from 'lucide-react';
import { telHref } from '@/lib/site-settings';
import type { SiteSettings } from '@/lib/site-settings';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import type { CustomizeModel } from '@/lib/customize/types';
import type { GalleryItem, Faq } from '@/types/supabase';

type ModelFit = { badge: string; note: string };

type HomeCopy = {
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    leadA: string;
    leadB: string;
    ctaConfigure: string;
    ctaModels: string;
    scrollHint: string;
    scrollAria: string;
  };
  heroAlt: string;
  models: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    leadPre: string;
    leadLink: string;
    leadPost: string;
    basePrice: string;
    deliveryNote: string;
    cardCta: string;
    emptyTitle: string;
    emptyBody: string;
    emptyConfigure: string;
    emptyConsult: string;
    outroPre: string;
    outroProducts: string;
    outroMid: string;
    outroBespoke: string;
    outroPost: string;
  };
  fitNotes: Record<string, ModelFit>;
  defaultFit: ModelFit;
  transparency: {
    eyebrow: string;
    title: string;
    lead: string;
    features: { title: string; text: string }[];
  };
  records: {
    eyebrow: string;
    title: string;
    more: string;
    fallback: { src: string; label: string }[];
    captionReal: string;
    captionFallback: string;
    sourcesMid: string;
    blog: string;
    sourcesMid2: string;
    instagram: string;
    sourcesPost: string;
  };
  process: {
    eyebrow: string;
    title: string;
    more: string;
    steps: { title: string; text: string }[];
  };
  who: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    paths: { title: string; text: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    more: string;
  };
  cta: {
    title: string;
    leadA: string;
    leadB: string;
    primary: string;
    consult: string;
    hoursPrefix: string;
  };
};

const COPY: Record<Language, HomeCopy> = {
  KO: {
    hero: {
      eyebrow: 'WEET MOBILE HOME · 이동식주택',
      titleA: '작은 공간, ',
      titleB: '선명한 기준.',
      leadA: '이동식주택을 고를 때의 막연함을 없앱니다. ',
      leadB: '모델 선택부터 운송, 설치, 그리고 예상 비용까지 모든 과정을 투명하게 공개합니다.',
      ctaConfigure: '모델 구성하기',
      ctaModels: '대표 모델 보기',
      scrollHint: 'Scroll',
      scrollAria: '다음 섹션으로 이동',
    },
    heroAlt: '위트 이동식주택 외관',
    models: {
      eyebrow: 'MODELS · 대표 모델',
      titleA: '기준 모델과 ',
      titleB: '공개된 기본 가격.',
      leadPre: '위트는 제품 본체 기준 가격을 공개합니다. 운반·설치 등 현장 비용은 ',
      leadLink: '비용 안내',
      leadPost: '에서 항목별로 확인할 수 있습니다.',
      basePrice: '기본가',
      deliveryNote: '운반·설치 별도',
      cardCta: '이 모델로 구성',
      emptyTitle: '대표 모델 가격을 준비하고 있습니다.',
      emptyBody:
        '기준 모델과 기본 가격은 곧 공개됩니다. 지금도 온라인 구성기에서 원하는 크기와 옵션으로 예상 견적을 확인하거나, 현장 조건에 맞춘 상담을 신청하실 수 있습니다.',
      emptyConfigure: '온라인 구성하기',
      emptyConsult: '상담 신청',
      outroPre: '더 큰 조합과 상업 공간이 필요하다면 ',
      outroProducts: '제품 라인업',
      outroMid: '과 ',
      outroBespoke: '비스포크 제작',
      outroPost: '을 확인하세요.',
    },
    fitNotes: {
      'compact-3x6': {
        badge: '농막 신고 범위',
        note: '연면적 20㎡ 이하인 농막 기준에 들어오는 크기입니다. 작업실·주말 농가에 많이 선택합니다.',
      },
      'standard-3x9': {
        badge: '농촌체류형 쉼터 검토 대상',
        note: '연면적 33㎡ 이하인 쉼터 기준에서 검토할 수 있는 크기입니다. 세컨하우스 용도로 많이 선택합니다.',
      },
    },
    defaultFit: {
      badge: '기준 모델',
      note: '용도와 부지 조건에 맞춰 구성할 수 있는 기준 모델입니다. 자세한 인허가 기준은 상담에서 확인해 드립니다.',
    },
    transparency: {
      eyebrow: 'TRANSPARENCY · 투명성',
      title: '불확실성은 남기지 않습니다.',
      lead: '‘예상치 못한 현장 비용’과 ‘품질 편차’. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든 기준을 선명하게 설계합니다.',
      features: [
        {
          title: '모델 및 옵션 구성',
          text: '3x6, 3x9 등 모듈러 베이스 모델과 라이프스타일에 맞는 옵션을 온라인에서 즉시 구성하고 예상 견적을 확인할 수 있습니다.',
        },
        {
          title: '포함 및 별도 범위',
          text: '제품 자체에 포함된 기본 사양과, 부지 토목·기초, 전기·상하수 인입 등 현장에서 별도로 발생하는 비용을 명확히 구분합니다.',
        },
        {
          title: '현장 설치 조건',
          text: '진입로 폭, 크레인 작업 반경, 인허가 가능 여부 등 제품 배송 전 확인해야 할 필수 요소를 사전에 체크합니다.',
        },
        {
          title: '운송 및 현장 조립',
          text: '공장 제작 후 현장까지의 운송 스케줄과 안전한 설치를 위한 가이드를 제공하여 현장 체류 시간을 최소화합니다.',
        },
        {
          title: 'A/S 및 사후 관리',
          text: '문·창호 단차, 욕실 누수 등 입주 후 발생할 수 있는 주요 AS 항목들에 대한 보증 기준과 대응 절차를 안내합니다.',
        },
        {
          title: '공장 제작 기반',
          text: '날씨와 현장 여건에 영향을 적게 받는 실내 공장 제작으로 품질 편차를 줄이고 공기를 예측 가능하게 만듭니다.',
        },
      ],
    },
    records: {
      eyebrow: 'RECORDS · 제작·설치 기록',
      title: '공장과 현장에서 찍은 실제 기록',
      more: '기록 더 보기',
      fallback: [
        { src: '/images/modular/generated/factory-precision.webp', label: '표준화된 제작 환경' },
        { src: '/images/modular/generated/interior-comfort.webp', label: '최적화된 생활 동선' },
        { src: '/images/modular/generated/transport-install.webp', label: '안전한 현장 설치' },
      ],
      captionReal: '위 사진은 위트 공장과 설치 현장에서 직접 기록한 이미지입니다.',
      captionFallback: '위 이미지는 위트의 제작·설치 과정을 보여주기 위한 예시입니다.',
      sourcesMid: ' 더 많은 현장 소식은 ',
      blog: '네이버 블로그',
      sourcesMid2: '와 ',
      instagram: '인스타그램',
      sourcesPost: '에서 확인할 수 있습니다.',
    },
    process: {
      eyebrow: 'PROCESS · 진행 과정',
      title: '상담부터 입주까지, 여섯 단계.',
      more: '과정 자세히 보기',
      steps: [
        { title: '구성·상담', text: '모델을 구성하거나 상담을 신청합니다.' },
        { title: '현장 확인', text: '진입로·인입·지목을 확인합니다.' },
        { title: '견적·계약', text: '항목별 총액 견적을 확정합니다.' },
        { title: '공장 제작', text: '공장에서 제작하고 검수합니다.' },
        { title: '운반·설치', text: '운반과 설치 후 인도합니다.' },
        { title: 'A/S', text: '입주 후 불편 사항을 조치합니다.' },
      ],
    },
    who: {
      eyebrow: 'WHO IT FITS · 쓰임새',
      titleA: '목적에 맞는 공간을 ',
      titleB: '정확하게.',
      paths: [
        {
          title: '세컨드하우스·귀촌',
          text: '작은 주거 공간을 빠르게 검토하고 싶은 가족에게 모델, 옵션, 설치 조건을 한 번에 정리해줍니다.',
        },
        {
          title: '카페·팝업·숙박 운영',
          text: '수익을 내야 하는 공간은 일정과 설치 리스크가 중요합니다. 공장 제작 중심으로 오픈 시점을 예측하기 쉽게 만듭니다.',
        },
        {
          title: '기관·법인 프로젝트',
          text: '반복 설치, 농촌·복지·교육·업무용 모듈처럼 목적이 분명한 프로젝트를 표준 공정과 상담 기록으로 관리합니다.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: '자주 묻는 질문',
      more: '전체 질문 보기',
    },
    cta: {
      title: '지금 바로 구성해보세요',
      leadA: '원하는 크기와 옵션을 선택하면 예상 견적과 함께 ',
      leadB: '위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.',
      primary: '나만의 위트 만들기',
      consult: '상담 신청',
      hoursPrefix: '상담 가능 시간 ',
    },
  },
  EN: {
    hero: {
      eyebrow: 'WEET MOBILE HOME · MODULAR HOMES',
      titleA: 'Small spaces, ',
      titleB: 'clear standards.',
      leadA: 'We take the guesswork out of choosing a mobile home. ',
      leadB: 'From model selection to transport, installation, and estimated cost, every step is laid out transparently.',
      ctaConfigure: 'Configure a model',
      ctaModels: 'View featured models',
      scrollHint: 'Scroll',
      scrollAria: 'Go to the next section',
    },
    heroAlt: 'Exterior of a Weet mobile home',
    models: {
      eyebrow: 'MODELS · FEATURED MODELS',
      titleA: 'Standard models with ',
      titleB: 'published base prices.',
      leadPre: 'Weet publishes base prices for the unit itself. On-site costs such as transport and installation are listed item by item in our ',
      leadLink: 'cost guide',
      leadPost: '.',
      basePrice: 'Base price',
      deliveryNote: 'Transport & installation separate',
      cardCta: 'Configure this model',
      emptyTitle: "We're finalizing prices for our featured models.",
      emptyBody:
        'Standard models and base prices will be published soon. In the meantime, you can use the online configurator to get an estimate for your preferred size and options, or request a consultation tailored to your site conditions.',
      emptyConfigure: 'Configure online',
      emptyConsult: 'Request a consultation',
      outroPre: 'If you need larger combinations or commercial spaces, explore our ',
      outroProducts: 'product lineup',
      outroMid: ' and ',
      outroBespoke: 'bespoke builds',
      outroPost: '.',
    },
    fitNotes: {
      'compact-3x6': {
        badge: 'Farm shed (nongmak) range',
        note: 'A size that fits within the farm shed (nongmak) standard of 20 ㎡ or less in total floor area. A popular choice for workshops and weekend farms.',
      },
      'standard-3x9': {
        badge: 'Rural-stay shelter candidate',
        note: 'A size you can consider under the rural-stay shelter standard of 33 ㎡ or less in total floor area. A popular choice for second homes.',
      },
    },
    defaultFit: {
      badge: 'Standard model',
      note: 'A standard model you can configure to your purpose and site conditions. Detailed permit criteria are confirmed during your consultation.',
    },
    transparency: {
      eyebrow: 'TRANSPARENCY',
      title: 'We leave no room for uncertainty.',
      lead: '‘Unexpected on-site costs’ and ‘quality variation.’ To remove the biggest risks of installing a home, Weet defines every standard with clarity.',
      features: [
        {
          title: 'Model & option configuration',
          text: 'Configure modular base models like the 3x6 and 3x9 with lifestyle-fit options online and instantly see an estimated quote.',
        },
        {
          title: 'Included vs. separate scope',
          text: 'We clearly distinguish the base specs included in the unit itself from costs that arise separately on site, such as earthwork and foundation, electrical, and water/sewer connections.',
        },
        {
          title: 'Site installation conditions',
          text: 'We check essentials in advance before delivery, such as access-road width, crane working radius, and permit eligibility.',
        },
        {
          title: 'Transport & on-site assembly',
          text: 'We provide a transport schedule from factory to site and a guide for safe installation, minimizing time spent on site.',
        },
        {
          title: 'After-sales & maintenance',
          text: 'We explain warranty standards and response procedures for major after-sales items that can arise after move-in, such as door/window misalignment and bathroom leaks.',
        },
        {
          title: 'Factory-built foundation',
          text: 'Indoor factory production, less affected by weather and site conditions, reduces quality variation and makes the schedule predictable.',
        },
      ],
    },
    records: {
      eyebrow: 'RECORDS · BUILD & INSTALL LOG',
      title: 'Real records shot at the factory and on site',
      more: 'See more records',
      fallback: [
        { src: '/images/modular/generated/factory-precision.webp', label: 'Standardized production environment' },
        { src: '/images/modular/generated/interior-comfort.webp', label: 'Optimized living flow' },
        { src: '/images/modular/generated/transport-install.webp', label: 'Safe on-site installation' },
      ],
      captionReal: 'The photos above were recorded firsthand at the Weet factory and installation sites.',
      captionFallback: 'The images above are examples illustrating Weet’s build and installation process.',
      sourcesMid: ' For more updates from the field, follow our ',
      blog: 'Naver Blog',
      sourcesMid2: ' and ',
      instagram: 'Instagram',
      sourcesPost: '.',
    },
    process: {
      eyebrow: 'PROCESS',
      title: 'From consultation to move-in, six steps.',
      more: 'See the process in detail',
      steps: [
        { title: 'Configure & consult', text: 'Configure a model or request a consultation.' },
        { title: 'Site check', text: 'We check the access road, utility connections, and land use.' },
        { title: 'Quote & contract', text: 'We finalize an itemized total quote.' },
        { title: 'Factory build', text: 'We build and inspect at the factory.' },
        { title: 'Transport & install', text: 'We transport, install, and hand over.' },
        { title: 'After-sales', text: 'We address any issues after move-in.' },
      ],
    },
    who: {
      eyebrow: 'WHO IT FITS',
      titleA: 'The right space for ',
      titleB: 'your exact purpose.',
      paths: [
        {
          title: 'Second home · rural move',
          text: 'For families who want to quickly assess a small living space, we lay out the model, options, and installation conditions in one place.',
        },
        {
          title: 'Cafe · pop-up · lodging',
          text: 'For spaces that need to generate revenue, schedule and installation risk matter. A factory-build-first approach makes your opening date easy to predict.',
        },
        {
          title: 'Institutional · corporate projects',
          text: 'We manage purpose-driven projects, such as repeated installations and modules for rural, welfare, education, or office use, with a standardized process and consultation records.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      more: 'See all questions',
    },
    cta: {
      title: 'Start configuring now',
      leadA: 'Choose your preferred size and options to get an estimate, and ',
      leadB: 'a Weet manager will guide you precisely based on your site conditions.',
      primary: 'Build your own Weet',
      consult: 'Request a consultation',
      hoursPrefix: 'Consultation hours ',
    },
  },
  ES: {
    hero: {
      eyebrow: 'WEET MOBILE HOME · CASAS MODULARES',
      titleA: 'Espacios pequeños, ',
      titleB: 'criterios claros.',
      leadA: 'Eliminamos la incertidumbre al elegir una casa modular. ',
      leadB: 'Desde la elección del modelo hasta el transporte, la instalación y el costo estimado, todo el proceso es transparente.',
      ctaConfigure: 'Configurar un modelo',
      ctaModels: 'Ver modelos destacados',
      scrollHint: 'Scroll',
      scrollAria: 'Ir a la siguiente sección',
    },
    heroAlt: 'Exterior de una casa modular Weet',
    models: {
      eyebrow: 'MODELS · MODELOS DESTACADOS',
      titleA: 'Modelos base con ',
      titleB: 'precios base publicados.',
      leadPre: 'Weet publica el precio base de la unidad en sí. Los costos en obra, como transporte e instalación, se detallan punto por punto en nuestra ',
      leadLink: 'guía de costos',
      leadPost: '.',
      basePrice: 'Precio base',
      deliveryNote: 'Transporte e instalación aparte',
      cardCta: 'Configurar este modelo',
      emptyTitle: 'Estamos finalizando los precios de nuestros modelos destacados.',
      emptyBody:
        'Los modelos base y los precios base se publicarán pronto. Mientras tanto, puede usar el configurador en línea para obtener un estimado con el tamaño y las opciones que prefiera, o solicitar una asesoría adaptada a las condiciones de su terreno.',
      emptyConfigure: 'Configurar en línea',
      emptyConsult: 'Solicitar asesoría',
      outroPre: 'Si necesita combinaciones más grandes o espacios comerciales, explore nuestra ',
      outroProducts: 'línea de productos',
      outroMid: ' y los ',
      outroBespoke: 'proyectos a medida',
      outroPost: '.',
    },
    fitNotes: {
      'compact-3x6': {
        badge: 'Rango de caseta agrícola (nongmak)',
        note: 'Un tamaño que se ajusta al estándar de caseta agrícola (nongmak) de 20 ㎡ o menos de superficie total. Una opción frecuente para talleres y huertos de fin de semana.',
      },
      'standard-3x9': {
        badge: 'Candidato a refugio de estadía rural',
        note: 'Un tamaño que puede considerarse bajo el estándar de refugio de estadía rural de 33 ㎡ o menos de superficie total. Una opción frecuente para segundas residencias.',
      },
    },
    defaultFit: {
      badge: 'Modelo base',
      note: 'Un modelo base que puede configurar según su uso y las condiciones del terreno. Los criterios detallados de permisos se confirman en la asesoría.',
    },
    transparency: {
      eyebrow: 'TRANSPARENCY · TRANSPARENCIA',
      title: 'No dejamos espacio para la incertidumbre.',
      lead: '‘Costos imprevistos en obra’ y ‘variación de calidad.’ Para eliminar los mayores riesgos de instalar una vivienda, Weet define cada criterio con claridad.',
      features: [
        {
          title: 'Configuración de modelo y opciones',
          text: 'Configure modelos base modulares como el 3x6 y el 3x9 con opciones acordes a su estilo de vida en línea y obtenga al instante un presupuesto estimado.',
        },
        {
          title: 'Alcance incluido y aparte',
          text: 'Distinguimos con claridad las especificaciones base incluidas en la propia unidad de los costos que surgen aparte en obra, como movimiento de tierras y cimentación, acometidas eléctricas y de agua y desagüe.',
        },
        {
          title: 'Condiciones de instalación en obra',
          text: 'Verificamos por adelantado lo esencial antes de la entrega, como el ancho del camino de acceso, el radio de trabajo de la grúa y la viabilidad de los permisos.',
        },
        {
          title: 'Transporte y montaje en obra',
          text: 'Proporcionamos un calendario de transporte de fábrica a obra y una guía para una instalación segura, minimizando el tiempo de permanencia en obra.',
        },
        {
          title: 'Posventa y mantenimiento',
          text: 'Explicamos los criterios de garantía y los procedimientos de respuesta para las principales incidencias de posventa que pueden surgir tras la mudanza, como desajustes de puertas y ventanas y filtraciones en el baño.',
        },
        {
          title: 'Base de fabricación en fábrica',
          text: 'La producción en fábrica bajo techo, menos afectada por el clima y las condiciones de obra, reduce la variación de calidad y hace predecible el calendario.',
        },
      ],
    },
    records: {
      eyebrow: 'RECORDS · REGISTRO DE FABRICACIÓN E INSTALACIÓN',
      title: 'Registros reales tomados en fábrica y en obra',
      more: 'Ver más registros',
      fallback: [
        { src: '/images/modular/generated/factory-precision.webp', label: 'Entorno de producción estandarizado' },
        { src: '/images/modular/generated/interior-comfort.webp', label: 'Flujo de vida optimizado' },
        { src: '/images/modular/generated/transport-install.webp', label: 'Instalación segura en obra' },
      ],
      captionReal: 'Las fotos anteriores se registraron de primera mano en la fábrica y en los sitios de instalación de Weet.',
      captionFallback: 'Las imágenes anteriores son ejemplos que ilustran el proceso de fabricación e instalación de Weet.',
      sourcesMid: ' Para más novedades desde el terreno, siga nuestro ',
      blog: 'Blog de Naver',
      sourcesMid2: ' y nuestro ',
      instagram: 'Instagram',
      sourcesPost: '.',
    },
    process: {
      eyebrow: 'PROCESS · PROCESO',
      title: 'De la asesoría a la mudanza, seis pasos.',
      more: 'Ver el proceso en detalle',
      steps: [
        { title: 'Configurar y asesorar', text: 'Configure un modelo o solicite una asesoría.' },
        { title: 'Revisión del terreno', text: 'Revisamos el camino de acceso, las acometidas y el uso del suelo.' },
        { title: 'Presupuesto y contrato', text: 'Cerramos un presupuesto total detallado por partidas.' },
        { title: 'Fabricación en fábrica', text: 'Fabricamos e inspeccionamos en fábrica.' },
        { title: 'Transporte e instalación', text: 'Transportamos, instalamos y entregamos.' },
        { title: 'Posventa', text: 'Atendemos cualquier inconveniente tras la mudanza.' },
      ],
    },
    who: {
      eyebrow: 'WHO IT FITS · USOS',
      titleA: 'El espacio adecuado para ',
      titleB: 'su propósito exacto.',
      paths: [
        {
          title: 'Segunda residencia · mudanza al campo',
          text: 'Para las familias que quieren evaluar rápidamente un espacio habitable pequeño, reunimos el modelo, las opciones y las condiciones de instalación en un solo lugar.',
        },
        {
          title: 'Cafetería · pop-up · alojamiento',
          text: 'En los espacios que deben generar ingresos, el calendario y el riesgo de instalación son clave. Un enfoque centrado en la fabricación en fábrica hace fácil predecir la fecha de apertura.',
        },
        {
          title: 'Proyectos institucionales y corporativos',
          text: 'Gestionamos proyectos con un propósito definido, como instalaciones repetidas y módulos de uso rural, asistencial, educativo u oficina, con un proceso estandarizado y registros de asesoría.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Preguntas frecuentes',
      more: 'Ver todas las preguntas',
    },
    cta: {
      title: 'Empiece a configurar ahora',
      leadA: 'Elija el tamaño y las opciones que prefiera para obtener un estimado, y ',
      leadB: 'un asesor de Weet le orientará con precisión según las condiciones de su terreno.',
      primary: 'Cree su propio Weet',
      consult: 'Solicitar asesoría',
      hoursPrefix: 'Horario de asesoría ',
    },
  },
};

const FEATURE_ICONS = [Ruler, Wrench, MapPinned, Truck, CheckCircle2, Factory];
const PATH_ICONS = [Home, Store, Building2];

function cleanGalleryTitle(title: string) {
  return title.replace(/\s*:\)\s*$/u, '').trim();
}

interface HomeClientProps {
  models: CustomizeModel[];
  galleryItems: GalleryItem[];
  hasRealGallery: boolean;
  teaserFaqs: Faq[];
  settings: SiteSettings;
}

export default function HomeClient({
  models,
  galleryItems,
  hasRealGallery,
  teaserFaqs,
  settings,
}: HomeClientProps) {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* 1. First Viewport: Product-led, image-led, full-bleed hero */}
      <section className="relative flex min-h-[calc(100svh-72px)] w-full items-end overflow-hidden bg-weet-ink text-weet-paper">
        <Image
          src="/images/hero_main.webp"
          alt={copy.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(103deg,rgba(35,29,22,0.72)_0%,rgba(35,29,22,0.34)_46%,rgba(35,29,22,0.04)_74%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-weet-ink/55 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[5vw] pb-[14vh] md:pb-[9vh]">
          <div className="max-w-[46ch]">
            <p className="mb-5 font-mono text-[clamp(11px,1vw,13px)] font-semibold uppercase tracking-[0.3em] text-weet-gold">
              {copy.hero.eyebrow}
            </p>
            <h1 className="m-0 text-[clamp(40px,6.4vw,86px)] font-semibold leading-[1.04] tracking-[-0.04em] kr-balance">
              {copy.hero.titleA}<br />
              {copy.hero.titleB}
            </h1>
            <p className="mt-6 max-w-[34ch] text-[clamp(15px,1.5vw,20px)] font-light leading-[1.7] text-weet-paper/85 kr-balance">
              {copy.hero.leadA}<br className="hidden md:block" />
              {copy.hero.leadB}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-gold px-[30px] py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                {copy.hero.ctaConfigure}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#models"
                className="inline-flex items-center justify-center rounded-[6px] border border-weet-paper/45 bg-weet-paper/[0.08] px-7 py-[15px] text-[15px] font-medium text-weet-paper transition-colors duration-200 hover:bg-weet-paper/[0.16]"
              >
                {copy.hero.ctaModels}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <Link
          href="#models"
          aria-label={copy.hero.scrollAria}
          className="wt-bounce absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.34em] text-weet-paper/70">{copy.hero.scrollHint}</span>
          <span className="h-[42px] w-px bg-gradient-to-b from-weet-paper/80 to-transparent" />
        </Link>
      </section>

      {/* 2. Representative Models with real base prices */}
      <section id="models" className="scroll-mt-24 bg-weet-paper px-[5vw] py-14 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 max-w-[44ch]">
            <p className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">{copy.models.eyebrow}</p>
            <h2 className="m-0 text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em] kr-balance">
              {copy.models.titleA}<br className="md:hidden" />{copy.models.titleB}
            </h2>
            <p className="mt-[18px] text-[15px] leading-[1.7] text-weet-sub kr-balance">
              {copy.models.leadPre}
              <Link href="/support#cost" className="font-semibold text-weet-gold-deep underline underline-offset-2 transition-colors hover:text-weet-ink">
                {copy.models.leadLink}
              </Link>
              {copy.models.leadPost}
            </p>
          </div>
          {models.length > 0 ? (
            <div className="grid gap-[22px] lg:grid-cols-2">
              {models.map((model) => {
                const fit = copy.fitNotes[model.id] ?? copy.defaultFit;
                return (
                  <div
                    key={model.id}
                    className="flex flex-col rounded-[12px] border border-weet-line bg-weet-surface p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-weet-float"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="m-0 text-[22px] font-semibold tracking-[-0.01em]">{model.nameKo}</h3>
                        <p className="mt-1.5 text-[13px] text-weet-muted">
                          {model.widthM}m × {model.lengthM}m · {model.areaSqm}㎡
                        </p>
                      </div>
                      <span className="shrink-0 break-keep rounded-full bg-weet-forest px-3 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-weet-paper">
                        {fit.badge}
                      </span>
                    </div>
                    <p className="mt-3.5 text-[14px] leading-[1.65] text-weet-sub kr-balance">{fit.note}</p>
                    <div className="mt-6 flex flex-col items-start gap-4 border-t border-weet-line-2 pt-6 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-[12px] font-semibold text-weet-muted">{copy.models.basePrice}</p>
                        <p className="mt-0.5 break-keep text-[22px] font-semibold tracking-[-0.01em] text-weet-ink">{formatModelStartPrice(model.basePrice)}</p>
                        <p className="mt-0.5 text-[12px] text-weet-muted">{copy.models.deliveryNote}</p>
                      </div>
                      <Link
                        href="/customize"
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[6px] bg-weet-ink px-[18px] py-3 text-[14px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                      >
                        {copy.models.cardCta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[12px] border border-weet-line bg-weet-surface p-8 md:p-10">
              <p className="m-0 text-[16px] font-semibold text-weet-ink">{copy.models.emptyTitle}</p>
              <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.7] text-weet-sub kr-balance">
                {copy.models.emptyBody}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/customize"
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-ink px-[22px] py-3 text-[14px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                >
                  {copy.models.emptyConfigure}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/support#consult"
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-weet-line bg-weet-surface px-[22px] py-3 text-[14px] font-semibold text-weet-ink transition-colors duration-200 hover:border-weet-gold-deep"
                >
                  {copy.models.emptyConsult}
                </Link>
              </div>
            </div>
          )}
          <p className="mt-7 text-[14px] leading-[1.6] text-weet-sub kr-balance">
            {copy.models.outroPre}
            <Link href="/products" className="font-semibold text-weet-ink underline underline-offset-2 transition-colors hover:text-weet-gold-deep">
              {copy.models.outroProducts}
            </Link>
            {copy.models.outroMid}
            <Link href="/bespoke" className="font-semibold text-weet-ink underline underline-offset-2 transition-colors hover:text-weet-gold-deep">
              {copy.models.outroBespoke}
            </Link>
            {copy.models.outroPost}
          </p>
        </div>
      </section>

      {/* 3. Trust / Transparency Section */}
      <section className="bg-weet-ink px-[5vw] py-14 text-weet-paper md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[30ch]">
              <p className="mb-[18px] font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold">{copy.transparency.eyebrow}</p>
              <h2 className="m-0 text-[clamp(28px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.025em] kr-balance">
                {copy.transparency.title}
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] font-light leading-[1.75] text-weet-paper/65 kr-balance">
              {copy.transparency.lead}
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {copy.transparency.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <div key={feature.title} className="group border-t border-weet-paper/[0.14] pt-[22px]">
                  <span className="mb-[18px] block h-0.5 w-8 bg-weet-gold" />
                  <Icon className="mb-4 h-5 w-5 text-weet-gold transition-colors group-hover:text-weet-paper" strokeWidth={1.75} />
                  <h3 className="m-0 mb-3 text-[18px] font-semibold">{feature.title}</h3>
                  <p className="m-0 text-[14px] font-light leading-[1.7] text-weet-paper/65 kr-balance">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Real factory / installation evidence */}
      <section className="bg-weet-ink-deep px-[5vw] py-14 text-weet-paper md:py-[92px]">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold">{copy.records.eyebrow}</p>
              <h2 className="m-0 text-[clamp(22px,2.6vw,34px)] font-semibold tracking-[-0.02em]">{copy.records.title}</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] font-semibold text-weet-paper/75 transition-colors hover:text-weet-gold">
              {copy.records.more}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <div key={item.id} className="group relative aspect-[4/3] overflow-hidden rounded-[10px] bg-weet-ink">
                  <Image
                    src={item.image_url}
                    alt={cleanGalleryTitle(item.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,22,16,0.8),transparent_55%)]" />
                  <p className="absolute bottom-4 left-[18px] right-[18px] text-[14px] font-semibold text-weet-paper">
                    {cleanGalleryTitle(item.title)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {copy.records.fallback.map((item) => (
                <div key={item.src} className="group relative aspect-[4/3] overflow-hidden rounded-[10px] bg-weet-ink">
                  <Image src={item.src} alt={item.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,22,16,0.8),transparent_55%)]" />
                  <p className="absolute bottom-4 left-[18px] right-[18px] text-[14px] font-semibold text-weet-paper">{item.label}</p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-6 text-[13px] font-light leading-[1.7] text-weet-muted">
            {hasRealGallery ? copy.records.captionReal : copy.records.captionFallback}
            {copy.records.sourcesMid}
            <a href={settings.naver_blog_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-weet-paper/75 transition-colors hover:text-weet-gold">
              {copy.records.blog}
            </a>
            {copy.records.sourcesMid2}
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-weet-paper/75 transition-colors hover:text-weet-gold">
              {copy.records.instagram}
            </a>
            {copy.records.sourcesPost}
          </p>
        </div>
      </section>

      {/* 5. Process strip */}
      <section className="bg-weet-paper-alt px-[5vw] py-14 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">{copy.process.eyebrow}</p>
              <h2 className="m-0 text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.025em]">{copy.process.title}</h2>
            </div>
            <Link href="/support#process" className="inline-flex items-center gap-2 text-[14px] font-semibold text-weet-ink transition-colors hover:text-weet-gold-deep">
              {copy.process.more}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
            {copy.process.steps.map((step, index) => (
              <div key={step.title} className="rounded-[10px] border border-weet-line bg-weet-surface p-6">
                <p className="font-mono text-[13px] font-semibold text-weet-line-2">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3.5 text-[16px] font-semibold text-weet-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-weet-sub">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Target Audience */}
      <section className="bg-weet-paper px-[5vw] py-14 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-[52px] max-w-[30ch]">
            <p className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">{copy.who.eyebrow}</p>
            <h2 className="m-0 text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em] kr-balance">
              {copy.who.titleA}<br className="md:hidden" />
              {copy.who.titleB}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {copy.who.paths.map((path, index) => {
              const Icon = PATH_ICONS[index];
              return (
                <div key={path.title} className="rounded-[12px] border border-weet-line bg-weet-surface p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-weet-float">
                  <div className="mb-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-[#FBEFD0]">
                    <Icon className="h-[22px] w-[22px] text-weet-gold-deep" strokeWidth={1.75} />
                  </div>
                  <h3 className="m-0 text-[19px] font-semibold text-weet-ink">{path.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-weet-sub kr-balance">
                    {path.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FAQ teaser */}
      {teaserFaqs.length > 0 && (
        <section className="bg-weet-paper-alt px-[5vw] py-14 md:py-24">
          <div className="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <div className="max-w-[34ch]">
              <p className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">{copy.faq.eyebrow}</p>
              <h2 className="m-0 text-[clamp(28px,3.4vw,42px)] font-semibold tracking-[-0.025em]">{copy.faq.title}</h2>
              <Link href="/support#faq" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-weet-ink transition-colors hover:text-weet-gold-deep">
                {copy.faq.more}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {teaserFaqs.map((faq) => (
                <details key={faq.id} className="group rounded-[10px] border border-weet-line bg-weet-surface">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-5 text-left text-[15px] font-semibold text-weet-ink [&::-webkit-details-marker]:hidden">
                    {faq.question_ko}
                    <ArrowRight className="h-4 w-4 shrink-0 text-weet-gold-deep transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="m-0 border-t border-weet-line-2 px-[22px] py-[18px] text-[14px] leading-[1.75] text-weet-sub kr-balance">{faq.answer_ko}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA + direct contact */}
      <section className="bg-weet-ink px-[5vw] py-20 text-center text-weet-paper md:py-[128px]">
        <div className="mx-auto max-w-[720px]">
          <h2 className="m-0 text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] kr-balance">
            {copy.cta.title}
          </h2>
          <p className="mx-auto mb-10 mt-6 max-w-[46ch] text-[clamp(14px,1.4vw,17px)] font-light leading-[1.75] text-weet-paper/70 kr-balance">
            {copy.cta.leadA}<br className="hidden md:block" />
            {copy.cta.leadB}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/customize"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-gold px-8 py-4 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.cta.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={telHref(settings.contact_phone)}
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-weet-paper/40 px-7 py-4 text-[15px] font-medium text-weet-paper transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-weet-gold"
            >
              <Phone className="h-4 w-4 text-weet-gold" />
              {settings.contact_phone}
            </a>
            <Link
              href="/support#consult"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-weet-paper/40 px-7 py-4 text-[15px] font-medium text-weet-paper transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-weet-gold"
            >
              <MessagesSquare className="h-4 w-4 text-weet-gold" />
              {copy.cta.consult}
            </Link>
          </div>
          {settings.consult_hours && (
            <p className="mt-5 text-[13px] text-weet-muted">{copy.cta.hoursPrefix}{settings.consult_hours}</p>
          )}
        </div>
      </section>
    </div>
  );
}
