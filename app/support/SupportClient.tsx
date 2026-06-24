'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import {
  ArrowRight,
  Bath,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Home,
  Landmark,
  MapPinned,
  PhoneCall,
  Plug,
  Ruler,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { telHref } from '@/lib/site-settings';
import type { SiteSettings } from '@/lib/site-settings';
import ConsultForm from '@/components/support/ConsultForm';

type Faq = { question: string; answer: string };

// 아이콘은 언어 무관 — KO/EN/ES 공통. COPY는 문구만 다국어로 담는다.
const STEP_ICONS = [Ruler, MapPinned, Home, Factory, Truck, ShieldCheck];
const PERMIT_ICONS = [Landmark, FileCheck2, Home];
const COST_ICONS = [Ruler, Truck, Wrench, MapPinned, Plug, Bath];
const COST_DOTS: Array<'forest' | 'gold'> = ['forest', 'gold', 'gold', 'gold', 'gold', 'gold'];
const AS_ICONS = [DoorIcon, Bath, Wrench];

const supportVisuals = [
  { src: '/images/handoff/sup-1.webp', altKey: 0 },
  { src: '/images/handoff/sup-3.webp', altKey: 1 },
  { src: '/images/handoff/sup-6.webp', altKey: 2 },
] as const;

type SupportCopy = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    ctaConsult: string;
    ctaCustomize: string;
    visualAlts: [string, string, string];
  };
  checklist: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<{ n: string; title: string; points?: string[]; text?: string }>;
  };
  permits: {
    eyebrow: string;
    title: string;
    lead: string;
    guides: Array<{ badge: string; title: string; points: string[] }>;
    disclaimer: string;
  };
  cost: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Array<{ title: string; text: string; href?: string; linkLabel?: string }>;
    noteLead: string;
    noteBody: string;
    leadTimePrefix: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<{ n: string; title: string; text: string }>;
    stepLabel: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    notFound: string;
    consultLink: string;
  };
  as: {
    eyebrow: string;
    title: string;
    lead: string;
    items: string[];
  };
  consult: {
    eyebrow: string;
    title: string;
    lead: string;
    consultHoursPrefix: string;
    fallbackHint: string;
    kakao: string;
  };
};

const COPY: Record<Language, SupportCopy> = {
  KO: {
    hero: {
      eyebrow: 'Support · 고객지원',
      titleLine1: '이동식주택,',
      titleLine2: '궁금한 것부터 해결하세요.',
      lead: '농막·세컨하우스를 처음 준비해도 막막하지 않도록 — 인허가, 비용, 진행 과정과 A/S까지 실제로 가장 많이 받는 질문을 기준으로 정리했습니다.',
      ctaConsult: '상담 신청하기',
      ctaCustomize: '먼저 구성해보기',
      visualAlts: ['상담 준비 단계', '현장 확인 단계', '운반 설치 단계'],
    },
    checklist: {
      eyebrow: 'Checklist · 사전 확인',
      title: '시작하기 전에',
      lead: '이동식주택을 준비하며 가장 많이 고민하시는 세 가지 핵심 사항을 먼저 확인해 보세요.',
      cards: [
        {
          n: '01',
          title: '현장 설치 조건',
          points: [
            '5톤 이상 대형 화물차 진입 가능 여부',
            '해당 부지의 건축 및 가설건축물 설치 가능 여부',
            '전기, 상하수도, 정화조 인입 상태',
          ],
        },
        {
          n: '02',
          title: '운반 및 설치 비용',
          text: '제품 가격 외의 비용은 현장 상황에 따라 크게 달라집니다. 배송 거리, 도로폭에 따른 하차 장비(크레인, 지게차 등), 지반을 다지는 기초 토목 공사 필요 여부가 전체 예산의 핵심 변수가 됩니다.',
        },
        {
          n: '03',
          title: '품질 보증 및 A/S',
          text: '계약서에 명시된 보증 범위 안의 제조상 결함은 우선 점검해 조치합니다. 지반 침하, 천재지변, 사용자 부주의로 인한 파손은 원인과 범위를 확인한 뒤 실비 기준으로 안내합니다.',
        },
      ],
    },
    permits: {
      eyebrow: 'Permits · 인허가',
      title: '내 땅에 둘 수 있을까? — 농막·쉼터·주거 구분',
      lead: '이동식주택 인허가는 ‘어디에, 어떤 용도로’ 두는지에 따라 절차가 완전히 달라집니다. 가장 흔한 세 가지 경우를 기준으로 정리했습니다. 세부 기준은 지자체마다 달라, 상담 시 부지 주소를 기준으로 함께 확인해 드립니다.',
      guides: [
        {
          badge: '농막',
          title: '농막으로 두는 경우',
          points: [
            '농막은 농지에 가설건축물 축조 신고로 설치하는 연면적 20㎡ 이하의 시설입니다.',
            '위트 3x6 모델(18㎡)이 이 범위에 해당하는 크기입니다.',
            '주거(전입신고) 목적 사용은 제한되며, 정화조·데크 등 부속시설 기준은 지자체마다 다릅니다.',
          ],
        },
        {
          badge: '쉼터',
          title: '농촌체류형 쉼터로 두는 경우',
          points: [
            '2024년 12월부터 시행된 제도로, 농지에 연면적 33㎡ 이하의 임시 숙소를 둘 수 있습니다.',
            '위트 3x9 모델(27㎡)이 검토 대상이 되는 크기입니다.',
            '본인 영농 활동 등 요건과 세부 기준은 지자체 확인이 필요합니다.',
          ],
        },
        {
          badge: '주거·숙박',
          title: '주거·숙박으로 쓰는 경우',
          points: [
            '상시 주거, 펜션·스테이 등 영업 목적은 지목과 용도지역에 따라 건축신고(허가) 대상이 됩니다.',
            '이 경우 가설건축물 신고와는 절차와 비용이 다릅니다.',
            '어떤 절차가 맞는지부터 상담 단계에서 함께 정리해 드립니다.',
          ],
        },
      ],
      disclaimer: '* 농지법·건축법 관련 기준은 개정될 수 있으며, 지자체 조례에 따라 적용이 다를 수 있습니다. 위 내용은 일반적인 안내이며 계약 전 관할 지자체 확인을 기준으로 진행합니다.',
    },
    cost: {
      eyebrow: 'Cost · 비용',
      title: '총비용은 이렇게 구성됩니다',
      lead: '이동식주택 가격이 ‘얼마부터’라고만 적혀 있는 데는 이유가 있습니다. 제품 가격은 확정할 수 있지만, 나머지는 부지를 봐야 정확해지기 때문입니다. 위트는 무엇이 확정 금액이고 무엇이 현장 변수인지 그대로 보여드립니다.',
      items: [
        {
          title: '제품 본체',
          text: '기본가와 옵션 가격은 구성 페이지에서 즉시 확인할 수 있습니다. 여기까지는 현장과 무관하게 확정되는 금액입니다.',
          href: '/customize',
          linkLabel: '구성하고 가격 보기',
        },
        {
          title: '운반비',
          text: '공장(전남 함평)에서 현장까지의 거리와 차량 종류에 따라 달라집니다. 주소가 정해지면 바로 계산해 드립니다.',
        },
        {
          title: '하차·설치 장비',
          text: '진입로 폭과 작업 공간에 따라 크레인 규격이 달라지고, 좁은 길은 별도 장비가 필요할 수 있어 현장 확인 후 확정합니다.',
        },
        {
          title: '기초 공사',
          text: '지반 상태에 따라 기초(블록·콘크리트 등) 방식이 달라집니다. 평탄한 부지는 부담이 줄어듭니다.',
        },
        {
          title: '전기·상하수 인입',
          text: '부지에 전기와 상하수가 이미 들어와 있는지에 따라 비용 차이가 큽니다. 인입 거리 기준으로 산정됩니다.',
        },
        {
          title: '정화조',
          text: '욕실을 사용하려면 정화조 설치가 필요한 경우가 많고, 용량과 설치 기준은 지자체 기준을 따릅니다.',
        },
      ],
      noteLead: '견적이 확정되는 과정:',
      noteBody: ' 구성 페이지의 예상 총액(제품 본체)을 기준으로, 부지 주소와 현장 사진을 확인한 뒤 위 항목을 더한 총액 견적을 드립니다. 계약 전 견적에 포함되지 않은 항목이 현장에서 추가되지 않도록, 별도 비용은 모두 견적서에 항목별로 표기합니다.',
      leadTimePrefix: ' 제작 기간 안내: ',
    },
    process: {
      eyebrow: 'Process · 진행 과정',
      title: '구매 과정',
      stepLabel: 'STEP',
      steps: [
        { n: '01', title: '구성·상담 신청', text: '원하는 모델과 옵션을 구성하거나, 상담 신청으로 바로 시작합니다.' },
        { n: '02', title: '현장 조건 확인', text: '진입로, 인입, 지목과 설치 조건을 함께 확인합니다.' },
        { n: '03', title: '견적·계약', text: '현장 조건을 반영해 최종 견적과 일정을 확정합니다.' },
        { n: '04', title: '공장 제작', text: '통제된 공장 환경에서 제작하고 품질을 확인합니다.' },
        { n: '05', title: '운반·설치', text: '운반과 설치, 마감 확인 후 인도합니다.' },
        { n: '06', title: '입주 후 A/S', text: '사용 중 불편 사항을 확인하고 필요한 조치를 안내합니다.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: '자주 묻는 질문',
      notFound: '찾는 답이 없으신가요?',
      consultLink: '상담 신청',
    },
    as: {
      eyebrow: 'A/S',
      title: '사용 이후까지 확인합니다.',
      lead: '완성 후에도 문, 창호, 욕실, 설비처럼 실제 생활에서 자주 쓰는 부분을 중심으로 불편 사항을 확인하고 필요한 조치를 안내합니다.',
      items: ['문·창호', '욕실·설비', '마감 점검'],
    },
    consult: {
      eyebrow: 'Consult · 상담',
      title: '상담 신청',
      lead: '이름과 연락처만 남겨도 됩니다. 부지 조건과 용도를 기준으로, 어떤 절차와 비용이 적용되는지부터 정리해 드립니다.',
      consultHoursPrefix: '상담 가능 시간 ',
      fallbackHint: '전화 연결이 어려우면 아래 폼으로 남겨주세요.',
      kakao: '카카오톡 채널로 문의하기',
    },
  },
  EN: {
    hero: {
      eyebrow: 'Support · Customer Support',
      titleLine1: 'Movable homes —',
      titleLine2: 'start with your questions.',
      lead: 'Even if a farm cabin or second home is new to you, you won’t feel lost. We’ve organized everything from permits and costs to the process and after-sales around the questions we get asked most.',
      ctaConsult: 'Request a consultation',
      ctaCustomize: 'Configure one first',
      visualAlts: ['Consultation prep stage', 'Site inspection stage', 'Transport and install stage'],
    },
    checklist: {
      eyebrow: 'Checklist · Before You Start',
      title: 'Before you begin',
      lead: 'Start by checking the three key points people think about most when preparing a movable home.',
      cards: [
        {
          n: '01',
          title: 'Site installation conditions',
          points: [
            'Whether large 5-ton trucks can access the site',
            'Whether the site allows building and temporary structures',
            'The status of electricity, water/sewer, and septic connections',
          ],
        },
        {
          n: '02',
          title: 'Transport and installation costs',
          text: 'Costs beyond the product price vary widely with site conditions. Delivery distance, unloading equipment based on road width (cranes, forklifts, etc.), and whether foundation groundwork is needed become the key variables in the overall budget.',
        },
        {
          n: '03',
          title: 'Quality warranty and after-sales',
          text: 'Manufacturing defects within the warranty scope stated in the contract are inspected and addressed first. Damage from ground subsidence, natural disasters, or user negligence is addressed at cost after we confirm the cause and extent.',
        },
      ],
    },
    permits: {
      eyebrow: 'Permits · Permits',
      title: 'Can I place one on my land? — Farm cabin, rural retreat, or residence',
      lead: 'Permits for movable homes depend entirely on “where and for what purpose” you place them. We’ve organized this around the three most common cases. Detailed standards vary by municipality, so during a consultation we confirm them together based on your site address.',
      guides: [
        {
          badge: 'Farm cabin',
          title: 'Used as a farm cabin',
          points: [
            'A farm cabin is a structure of 20㎡ or less in total floor area, installed on farmland via a temporary structure filing.',
            'The weet 3x6 model (18㎡) falls within this range.',
            'Use for residence (resident registration) is restricted, and standards for accessory facilities like septic tanks and decks vary by municipality.',
          ],
        },
        {
          badge: 'Rural retreat',
          title: 'Used as a rural-stay retreat',
          points: [
            'A system in effect since December 2024 that allows a temporary lodging of 33㎡ or less in total floor area on farmland.',
            'The weet 3x9 model (27㎡) is the size considered for this.',
            'Requirements such as your own farming activity and the detailed standards need to be confirmed with the municipality.',
          ],
        },
        {
          badge: 'Residence / lodging',
          title: 'Used for residence or lodging',
          points: [
            'Permanent residence and commercial purposes such as pensions or stays are subject to a building filing (permit) depending on the land category and use district.',
            'In this case the procedure and costs differ from a temporary structure filing.',
            'We start by sorting out which procedure applies during the consultation.',
          ],
        },
      ],
      disclaimer: '* Standards related to the Farmland Act and Building Act may be revised, and their application can vary by municipal ordinance. The above is general guidance; we proceed based on confirmation with the competent municipality before contract.',
    },
    cost: {
      eyebrow: 'Cost · Cost',
      title: 'Here’s how the total cost is made up',
      lead: 'There’s a reason movable-home prices are listed only as “starting from.” The product price can be fixed, but the rest only becomes precise once we see the site. weet shows you exactly what is a fixed amount and what is a site variable.',
      items: [
        {
          title: 'Product unit',
          text: 'You can check the base price and option prices instantly on the configure page. Up to here, the amount is fixed regardless of the site.',
          href: '/customize',
          linkLabel: 'Configure and see the price',
        },
        {
          title: 'Transport',
          text: 'This varies with the distance from the factory (Hampyeong, Jeonnam) to your site and the type of vehicle. Once the address is set, we calculate it right away.',
        },
        {
          title: 'Unloading and install equipment',
          text: 'Crane specs change with the access-road width and working space, and narrow roads may require separate equipment, so we confirm this after a site check.',
        },
        {
          title: 'Foundation work',
          text: 'The foundation method (block, concrete, etc.) varies with ground conditions. A level site eases the burden.',
        },
        {
          title: 'Electricity and water/sewer connections',
          text: 'Costs differ greatly depending on whether electricity and water/sewer are already brought into the site. They are calculated based on connection distance.',
        },
        {
          title: 'Septic tank',
          text: 'Using a bathroom often requires installing a septic tank, and the capacity and installation standards follow municipal rules.',
        },
      ],
      noteLead: 'How the quote is finalized:',
      noteBody: ' Based on the estimated total (product unit) from the configure page, we confirm your site address and site photos, then provide a total quote that adds the items above. So that items not included in the pre-contract quote aren’t added on-site, all separate costs are itemized in the quote.',
      leadTimePrefix: ' Lead time: ',
    },
    process: {
      eyebrow: 'Process · The Process',
      title: 'The purchase process',
      stepLabel: 'STEP',
      steps: [
        { n: '01', title: 'Configure / request consultation', text: 'Configure the model and options you want, or start right away with a consultation request.' },
        { n: '02', title: 'Confirm site conditions', text: 'We confirm the access road, connections, land category, and installation conditions together.' },
        { n: '03', title: 'Quote / contract', text: 'We finalize the final quote and schedule reflecting your site conditions.' },
        { n: '04', title: 'Factory build', text: 'We build it in a controlled factory environment and verify quality.' },
        { n: '05', title: 'Transport / install', text: 'We transport, install, confirm the finish, and hand it over.' },
        { n: '06', title: 'After-sales after move-in', text: 'We check any issues during use and guide you on the necessary measures.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      notFound: 'Didn’t find the answer you were looking for?',
      consultLink: 'Request a consultation',
    },
    as: {
      eyebrow: 'A/S',
      title: 'We stay with you after move-in.',
      lead: 'Even after completion, we focus on the parts you use most in daily life—doors, windows, bathrooms, and fixtures—checking for issues and guiding you on the measures needed.',
      items: ['Doors / windows', 'Bathroom / fixtures', 'Finish inspection'],
    },
    consult: {
      eyebrow: 'Consult · Consultation',
      title: 'Request a consultation',
      lead: 'Just your name and contact number is enough. Based on your site conditions and intended use, we start by sorting out which procedures and costs apply.',
      consultHoursPrefix: 'Consultation hours ',
      fallbackHint: 'If a call is hard to reach, please leave your details in the form below.',
      kakao: 'Inquire via KakaoTalk channel',
    },
  },
  ES: {
    hero: {
      eyebrow: 'Support · Atención al Cliente',
      titleLine1: 'Casas móviles:',
      titleLine2: 'empiece por sus preguntas.',
      lead: 'Aunque sea su primera vez con una cabaña de campo o una segunda vivienda, no se sentirá perdido. Hemos organizado todo —permisos, costos, el proceso y el servicio posventa— en torno a las preguntas que más nos hacen.',
      ctaConsult: 'Solicitar una consulta',
      ctaCustomize: 'Configurar primero',
      visualAlts: ['Etapa de preparación de la consulta', 'Etapa de inspección del terreno', 'Etapa de transporte e instalación'],
    },
    checklist: {
      eyebrow: 'Checklist · Antes de Empezar',
      title: 'Antes de comenzar',
      lead: 'Empiece por revisar los tres puntos clave en los que más se piensa al preparar una casa móvil.',
      cards: [
        {
          n: '01',
          title: 'Condiciones de instalación del terreno',
          points: [
            'Si camiones grandes de más de 5 toneladas pueden acceder al terreno',
            'Si el terreno permite la edificación y las estructuras temporales',
            'El estado de las conexiones de electricidad, agua/alcantarillado y fosa séptica',
          ],
        },
        {
          n: '02',
          title: 'Costos de transporte e instalación',
          text: 'Los costos más allá del precio del producto varían mucho según las condiciones del terreno. La distancia de entrega, el equipo de descarga según el ancho de la vía (grúas, montacargas, etc.) y la necesidad de obra de cimentación se convierten en las variables clave del presupuesto total.',
        },
        {
          n: '03',
          title: 'Garantía de calidad y posventa',
          text: 'Los defectos de fabricación dentro del alcance de garantía indicado en el contrato se inspeccionan y atienden primero. Los daños por hundimiento del terreno, desastres naturales o negligencia del usuario se atienden a precio de costo tras confirmar la causa y el alcance.',
        },
      ],
    },
    permits: {
      eyebrow: 'Permits · Permisos',
      title: '¿Puedo colocar una en mi terreno? — Cabaña, refugio rural o vivienda',
      lead: 'Los permisos para casas móviles dependen por completo de “dónde y con qué fin” se colocan. Lo hemos organizado en torno a los tres casos más comunes. Los criterios detallados varían según el municipio, por lo que en la consulta los confirmamos juntos a partir de la dirección de su terreno.',
      guides: [
        {
          badge: 'Cabaña',
          title: 'Usada como cabaña de campo',
          points: [
            'Una cabaña de campo es una estructura de 20㎡ o menos de superficie total, instalada en terreno agrícola mediante una declaración de estructura temporal.',
            'El modelo weet 3x6 (18㎡) entra dentro de este rango.',
            'El uso como vivienda (empadronamiento) está restringido, y los criterios para instalaciones anexas como fosas sépticas y terrazas varían según el municipio.',
          ],
        },
        {
          badge: 'Refugio rural',
          title: 'Usada como refugio de estancia rural',
          points: [
            'Un sistema vigente desde diciembre de 2024 que permite un alojamiento temporal de 33㎡ o menos de superficie total en terreno agrícola.',
            'El modelo weet 3x9 (27㎡) es el tamaño que se considera para esto.',
            'Requisitos como su propia actividad agrícola y los criterios detallados deben confirmarse con el municipio.',
          ],
        },
        {
          badge: 'Vivienda / hospedaje',
          title: 'Usada como vivienda u hospedaje',
          points: [
            'La residencia permanente y fines comerciales como pensiones o estancias están sujetos a una declaración de edificación (permiso) según la categoría del terreno y la zona de uso.',
            'En este caso, el procedimiento y los costos difieren de una declaración de estructura temporal.',
            'Empezamos por aclarar qué procedimiento corresponde durante la consulta.',
          ],
        },
      ],
      disclaimer: '* Los criterios relativos a la Ley de Terrenos Agrícolas y la Ley de Edificación pueden modificarse, y su aplicación puede variar según la ordenanza municipal. Lo anterior es orientación general; procedemos a partir de la confirmación con el municipio competente antes del contrato.',
    },
    cost: {
      eyebrow: 'Cost · Costo',
      title: 'Así se compone el costo total',
      lead: 'Hay una razón por la que los precios de las casas móviles se indican solo como “desde”. El precio del producto se puede fijar, pero el resto solo se vuelve preciso al ver el terreno. weet le muestra exactamente qué es un importe fijo y qué es una variable del terreno.',
      items: [
        {
          title: 'Unidad del producto',
          text: 'Puede consultar el precio base y los precios de las opciones de inmediato en la página de configuración. Hasta aquí, el importe es fijo, independientemente del terreno.',
          href: '/customize',
          linkLabel: 'Configurar y ver el precio',
        },
        {
          title: 'Transporte',
          text: 'Varía según la distancia desde la fábrica (Hampyeong, Jeonnam) hasta su terreno y el tipo de vehículo. Una vez fijada la dirección, lo calculamos de inmediato.',
        },
        {
          title: 'Equipo de descarga e instalación',
          text: 'Las especificaciones de la grúa cambian según el ancho de la vía de acceso y el espacio de trabajo, y las vías estrechas pueden requerir equipo aparte, por lo que lo confirmamos tras una revisión del terreno.',
        },
        {
          title: 'Obra de cimentación',
          text: 'El método de cimentación (bloque, concreto, etc.) varía según las condiciones del terreno. Un terreno nivelado reduce la carga.',
        },
        {
          title: 'Conexiones de electricidad y agua/alcantarillado',
          text: 'Los costos difieren mucho según si la electricidad y el agua/alcantarillado ya llegan al terreno. Se calculan en función de la distancia de conexión.',
        },
        {
          title: 'Fosa séptica',
          text: 'Usar un baño suele requerir instalar una fosa séptica, y la capacidad y los criterios de instalación siguen las normas municipales.',
        },
      ],
      noteLead: 'Cómo se finaliza el presupuesto:',
      noteBody: ' Partiendo del total estimado (unidad del producto) de la página de configuración, confirmamos la dirección y las fotos de su terreno y luego le entregamos un presupuesto total que suma los puntos anteriores. Para que no se añadan en obra conceptos no incluidos en el presupuesto previo al contrato, todos los costos aparte se detallan por concepto en el presupuesto.',
      leadTimePrefix: ' Plazo de fabricación: ',
    },
    process: {
      eyebrow: 'Process · El Proceso',
      title: 'El proceso de compra',
      stepLabel: 'STEP',
      steps: [
        { n: '01', title: 'Configurar / solicitar consulta', text: 'Configure el modelo y las opciones que desee, o empiece de inmediato con una solicitud de consulta.' },
        { n: '02', title: 'Confirmar condiciones del terreno', text: 'Confirmamos juntos la vía de acceso, las conexiones, la categoría del terreno y las condiciones de instalación.' },
        { n: '03', title: 'Presupuesto / contrato', text: 'Finalizamos el presupuesto y el calendario definitivos reflejando las condiciones de su terreno.' },
        { n: '04', title: 'Fabricación en fábrica', text: 'Lo fabricamos en un entorno de fábrica controlado y verificamos la calidad.' },
        { n: '05', title: 'Transporte / instalación', text: 'Transportamos, instalamos, confirmamos los acabados y entregamos.' },
        { n: '06', title: 'Posventa tras la mudanza', text: 'Revisamos cualquier inconveniente durante el uso y le orientamos sobre las medidas necesarias.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Preguntas frecuentes',
      notFound: '¿No encontró la respuesta que buscaba?',
      consultLink: 'Solicitar una consulta',
    },
    as: {
      eyebrow: 'A/S',
      title: 'Lo acompañamos también después de la mudanza.',
      lead: 'Incluso tras la finalización, nos centramos en las partes que más usa en el día a día —puertas, ventanas, baños y equipamiento—, revisando posibles inconvenientes y orientándole sobre las medidas necesarias.',
      items: ['Puertas / ventanas', 'Baño / equipamiento', 'Inspección de acabados'],
    },
    consult: {
      eyebrow: 'Consult · Consulta',
      title: 'Solicitar una consulta',
      lead: 'Basta con su nombre y número de contacto. A partir de las condiciones y el uso previsto de su terreno, empezamos por aclarar qué procedimientos y costos corresponden.',
      consultHoursPrefix: 'Horario de consulta ',
      fallbackHint: 'Si le resulta difícil comunicarse por teléfono, deje sus datos en el formulario de abajo.',
      kakao: 'Consultar por el canal de KakaoTalk',
    },
  },
};

export default function SupportClient({
  faqs,
  settings,
}: {
  faqs: Faq[];
  settings: SiteSettings;
}) {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-[1440px] px-[5vw] pb-[60px] pt-[80px] max-[860px]:pb-10 max-[860px]:pt-12">
        <div className="grid grid-cols-1 items-center gap-14 min-[861px]:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold-deep">
              {copy.hero.eyebrow}
            </div>
            <h1 className="m-0 text-[clamp(26px,4.6vw,60px)] font-semibold leading-[1.08] tracking-[-0.03em] kr-balance">
              {copy.hero.titleLine1}
              <br />
              {copy.hero.titleLine2}
            </h1>
            <p className="mt-[22px] max-w-[46ch] text-[clamp(15px,1.5vw,19px)] font-light leading-[1.7] text-weet-sub kr-pretty">
              {copy.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#consult"
                className="wt-btn inline-flex items-center gap-2 rounded-[6px] bg-weet-gold px-[26px] py-[14px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                {copy.hero.ctaConsult}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/customize"
                className="wt-btn inline-flex items-center gap-2 rounded-[6px] border border-weet-line-2 bg-white px-6 py-[13px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                {copy.hero.ctaCustomize}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {supportVisuals.map((visual, index) => (
              <div
                key={visual.src}
                className={`relative overflow-hidden rounded-[12px] border border-weet-line ${
                  index === 0 ? 'col-span-2 aspect-[16/8]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={visual.src}
                  alt={copy.hero.visualAlts[visual.altKey]}
                  fill
                  sizes={index === 0 ? '(max-width: 860px) 100vw, 52vw' : '(max-width: 860px) 50vw, 26vw'}
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-[50px]">
        <div className="mb-9 max-w-[52ch]">
          <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
            {copy.checklist.eyebrow}
          </div>
          <h2 className="m-0 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em]">{copy.checklist.title}</h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-weet-sub kr-balance">
            {copy.checklist.lead}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">
          {copy.checklist.cards.map((card) => (
            <div key={card.n} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[30px]">
              <div className="mb-3.5 font-mono text-[13px] font-bold text-weet-gold">{card.n}</div>
              <h3 className="m-0 mb-4 text-[18px] font-semibold">{card.title}</h3>
              {card.points ? (
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.55] text-weet-sub">
                      <span className="text-weet-forest">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="m-0 text-[13.5px] leading-[1.75] text-weet-sub kr-balance">{card.text}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== PERMITS ===== */}
      <section
        id="permits"
        className="mt-10 scroll-mt-[80px] border-y border-weet-line-2 bg-weet-paper-alt"
      >
        {/* TODO(ux): Header/Footer still link to legacy #help — migrate those to #permits, then drop this alias. */}
        <span id="help" aria-hidden="true" className="block scroll-mt-[80px]" />
        <div className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-20 max-[860px]:py-14">
          <div className="mb-9 max-w-[60ch]">
            <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              {copy.permits.eyebrow}
            </div>
            <h2 className="m-0 mb-3 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em] kr-balance">
              {copy.permits.title}
            </h2>
            <p className="m-0 text-[15px] leading-[1.7] text-weet-sub kr-balance">
              {copy.permits.lead}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">
            {copy.permits.guides.map((guide, index) => {
              const Icon = PERMIT_ICONS[index];
              return (
                <div key={guide.title} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[30px]">
                  <span className="mb-[18px] inline-flex items-center gap-[7px] rounded-full border border-[#CBDDD2] bg-[#EAF0EC] px-3 py-1.5 text-[12px] font-semibold text-weet-forest">
                    <Icon className="h-3.5 w-3.5" />
                    {guide.badge}
                  </span>
                  <h3 className="m-0 mb-4 text-[18px] font-semibold">{guide.title}</h3>
                  <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
                    {guide.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-weet-sub break-keep">
                        <span className="mt-px text-weet-forest">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[12px] leading-[1.6] text-weet-muted kr-balance">
            {copy.permits.disclaimer}
          </p>
        </div>
      </section>

      {/* ===== COST ===== */}
      <section id="cost" className="wt-reveal mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] pb-[50px] pt-20 max-[860px]:pt-14">
        <div className="mb-9 max-w-[62ch]">
          <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
            {copy.cost.eyebrow}
          </div>
          <h2 className="m-0 mb-3 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em]">
            {copy.cost.title}
          </h2>
          <p className="m-0 text-[15px] leading-[1.7] text-weet-sub kr-balance">
            {copy.cost.lead}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-[18px] min-[861px]:grid-cols-3">
          {copy.cost.items.map((item, index) => (
            <div key={item.title} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[26px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-full ${COST_DOTS[index] === 'forest' ? 'bg-weet-forest' : 'bg-weet-gold-deep'}`}
                  aria-hidden="true"
                />
                <h3 className="m-0 text-[16.5px] font-semibold">{item.title}</h3>
              </div>
              <p className="m-0 text-[13.5px] leading-[1.7] text-weet-sub kr-balance">{item.text}</p>
              {item.href && (
                <Link
                  href={item.href}
                  className="wt-link mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-weet-gold-deep hover:underline"
                >
                  {item.linkLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="mt-[22px] rounded-[14px] border border-[#CBDDD2] bg-[#EAF0EC] px-[30px] py-[26px]">
          <p className="m-0 text-[14px] leading-[1.8] text-[#3A3026] kr-balance">
            <strong className="font-semibold text-weet-ink">{copy.cost.noteLead}</strong>{copy.cost.noteBody}
            {settings.lead_time_note && `${copy.cost.leadTimePrefix}${settings.lead_time_note}.`}
          </p>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="scroll-mt-[80px] border-y border-weet-line-2 bg-weet-paper-alt">
        <div className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-20 max-[860px]:py-14">
          <div className="mb-9">
            <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              {copy.process.eyebrow}
            </div>
            <h2 className="m-0 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em]">{copy.process.title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] min-[861px]:grid-cols-3">
            {copy.process.steps.map((step) => (
              <div key={step.title} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[26px]">
                <div className="mb-[18px] flex items-center justify-between">
                  <span className="font-mono text-[13px] font-bold text-weet-forest">{copy.process.stepLabel}</span>
                  <span className="font-mono text-[26px] font-bold text-weet-line-2">{step.n}</span>
                </div>
                <h3 className="m-0 mb-2 text-[18px] font-semibold">{step.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.7] text-weet-sub kr-balance">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      {/* TODO(ux): Header/Footer still link to legacy #qa — migrate those to #faq, then drop this alias. */}
      <span id="qa" aria-hidden="true" className="block scroll-mt-[80px]" />
      <section id="faq" className="wt-reveal mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] py-20 max-[860px]:py-14">
        <div className="grid grid-cols-1 gap-10 min-[861px]:grid-cols-[0.35fr_0.65fr]">
          <div>
            <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              {copy.faq.eyebrow}
            </div>
            <h2 className="m-0 text-[clamp(24px,2.8vw,36px)] font-semibold tracking-[-0.025em]">{copy.faq.title}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <details
                key={`${faq.question}-${index}`}
                className="group overflow-hidden rounded-[12px] border border-weet-line bg-weet-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-5 text-[15.5px] font-semibold text-weet-ink break-keep [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ArrowRight className="h-4 w-4 shrink-0 text-weet-gold-deep transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="m-0 border-t border-weet-paper-alt px-[22px] py-[18px] text-[14px] leading-[1.8] text-weet-sub kr-balance">
                  {faq.answer}
                </p>
              </details>
            ))}
            <p className="mt-1 text-[14px] leading-[1.7] text-weet-sub">
              {copy.faq.notFound}{' '}
              <Link
                href="#consult"
                className="wt-link inline-flex items-center gap-1 font-semibold text-weet-gold-deep hover:underline"
              >
                {copy.faq.consultLink}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== A/S ===== */}
      <section id="as" className="scroll-mt-[80px] bg-weet-ink text-weet-paper">
        <div className="wt-reveal mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-[5vw] py-20 max-[860px]:py-14 min-[861px]:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold">
              {copy.as.eyebrow}
            </div>
            <h2 className="m-0 mb-4 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em] kr-balance">
              {copy.as.title}
            </h2>
            <p className="m-0 text-[15px] font-light leading-[1.75] text-weet-paper/65 kr-balance">
              {copy.as.lead}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            {copy.as.items.map((title, index) => {
              const Icon = AS_ICONS[index];
              return (
                <div
                  key={title}
                  className="rounded-[12px] border border-weet-paper/15 px-[18px] py-6 text-center"
                >
                  <div className="mx-auto mb-4 h-0.5 w-[34px] bg-weet-gold" />
                  <Icon className="mx-auto mb-3 h-5 w-5 text-weet-paper/70" />
                  <p className="m-0 text-[14px] font-semibold text-weet-paper">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONSULT ===== */}
      <section id="consult" className="scroll-mt-[80px] bg-weet-paper-alt">
        <div className="wt-reveal mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-[5vw] py-20 max-[860px]:py-14 min-[861px]:grid-cols-[0.45fr_0.55fr]">
          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              {copy.consult.eyebrow}
            </div>
            <h2 className="m-0 mb-[18px] text-[clamp(26px,3vw,40px)] font-semibold tracking-[-0.03em]">{copy.consult.title}</h2>
            <p className="m-0 mb-7 max-w-[40ch] text-[15px] leading-[1.8] text-weet-sub kr-balance">
              {copy.consult.lead}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={telHref(settings.contact_phone)}
                className="wt-card flex items-center gap-3.5 rounded-[12px] border border-weet-line bg-weet-card px-5 py-[18px]"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-[#CBDDD2] bg-[#EAF0EC] text-weet-forest">
                  <PhoneCall className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-weet-ink">{settings.contact_phone}</span>
                  <span className="block text-[12.5px] text-weet-muted">
                    {settings.consult_hours
                      ? `${copy.consult.consultHoursPrefix}${settings.consult_hours}`
                      : copy.consult.fallbackHint}
                  </span>
                </span>
              </a>
              {settings.kakao_channel_url && (
                <a
                  href={settings.kakao_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wt-card flex items-center gap-3.5 rounded-[12px] border border-weet-line bg-weet-card px-5 py-[18px]"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-[#F4E2A0] bg-[#FEF3CD] text-[#9A7A12]">
                    <ClipboardCheck className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[15px] font-semibold text-weet-ink">{copy.consult.kakao}</span>
                </a>
              )}
            </div>
          </div>
          <div className="rounded-[16px] border border-weet-line bg-weet-card p-9 max-[860px]:p-6">
            <ConsultForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function DoorIcon(props: ComponentProps<'svg'>) {
  return <Home {...props} />;
}
