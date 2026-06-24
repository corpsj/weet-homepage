"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  LockKeyhole,
  Router,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";

type IncludeItem = { name: string; desc: string };
type StepItem = { n: string; t: string; d: string };

type PackageCopy = {
  id: string;
  href: string;
  icon: LucideIcon;
  code: string;
  cat: string;       // 시큐리티 / 네트워크 / IoT / 에너지
  tagline: string;   // 집을 지키는 눈 …
  tag: string;       // CCTV · 스마트락 · 동작 감지 조명
  desc: string;
  includes: IncludeItem[]; // 포함 항목 (3)
  steps: StepItem[];       // 이렇게 동작합니다 (3)
  change: string;          // 일상의 변화
};

type PageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  detailLabel: string;   // 포함 항목
  worksLabel: string;    // 이렇게 동작합니다
  changeLabel: string;   // 일상의 변화
  viewDetail: string;    // 상세 보기
  processTitle: string;
  processLead: string;
  consultLabel: string;  // 이 옵션 상담하기
  closeLabel: string;
  ctaPrimary: string;
  ctaSecondary: string;
  packages: PackageCopy[];
  process: Array<{ title: string; body: string }>;
};

const PACKAGE_IMAGES: Record<string, string> = {
  security: "/images/solution/generated/kr-security-realphoto.webp",
  network: "/images/solution/generated/kr-network-realphoto.webp",
  control: "/images/solution/generated/kr-control-realphoto.webp",
  energy: "/images/solution/generated/kr-energy-realphoto.webp",
};

const CARD_IMAGES: Record<string, string> = {
  security: "/images/solution/generated/kr-security-realphoto.webp",
  network: "/images/solution/generated/kr-network-realphoto.webp",
  control: "/images/solution/generated/kr-control-realphoto.webp",
  energy: "/images/solution/generated/kr-energy-realphoto.webp",
};

const COPY: Record<Language, PageCopy> = {
  KO: {
    eyebrow: "WEET LIVING OPTIONS",
    title: "테크 옵션으로 완성하는 모듈러 공간",
    lead:
      "Weet 솔루션은 장비 나열이 아니라 시큐리티·네트워크·IoT·에너지를 생활 목적에 맞춰 조합하는 테크 옵션 레이어입니다.",
    heroLabel: "옵션은 장식이 아니라 생활의 기반입니다",
    heroTitle: "스펙보다 먼저, 우리 집의 생활 방식을 봅니다.",
    heroBody:
      "출입과 보안, 연결, 자동화, 전력을 먼저 정리한 뒤 실제로 필요한 옵션만 고릅니다.",
    detailLabel: "포함 항목",
    worksLabel: "이렇게 동작합니다",
    changeLabel: "일상의 변화",
    viewDetail: "상세 보기",
    processTitle: "옵션을 더하는 방식이 다릅니다",
    processLead:
      "완공 후 장비를 덧붙이는 방식이 아니라, 배선·센서·제어·전력 부하를 설계 단계에서 함께 잡습니다.",
    consultLabel: "이 옵션 상담하기",
    closeLabel: "닫기",
    ctaPrimary: "주문 옵션 확인",
    ctaSecondary: "옵션 상담하기",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        icon: LockKeyhole,
        code: "SYS_01",
        cat: "시큐리티",
        tagline: "집을 지키는 눈",
        tag: "CCTV · 스마트락 · 동작 감지 조명",
        desc: "멀리 떨어진 세컨하우스도 스마트폰으로 출입과 주변을 확인합니다.",
        includes: [
          { name: "사각지대 없는 CCTV", desc: "집 안팎을 빈틈없이 비추도록 카메라 위치를 설계합니다." },
          { name: "스마트락 원격 출입", desc: "멀리서도 문을 열어 주고 출입 기록을 남깁니다." },
          { name: "동작 감지 센서등", desc: "움직임이 감지되면 현관 조명이 자동으로 켜집니다." },
        ],
        steps: [
          { n: "01", t: "사각지대 진단", d: "현관·창측 동선을 분석해 카메라 위치를 정합니다." },
          { n: "02", t: "설계 단계 배선", d: "시공 단계에서 배선과 전원을 함께 잡습니다." },
          { n: "03", t: "하나의 앱 연동", d: "출입·감지·조명을 한 앱으로 묶습니다." },
        ],
        change: "집을 비워도, 휴대폰으로 우리 집을 한눈에 봅니다.",
      },
      {
        id: "network",
        href: "/solution/network",
        icon: Router,
        code: "SYS_02",
        cat: "네트워크",
        tagline: "어디서나 끊김 없이",
        tag: "와이파이 · 라우터 · 위성/LTE",
        desc: "산속·외진 부지에서도 안정적으로 연결되도록 통신 환경을 설계합니다.",
        includes: [
          { name: "집 전체 와이파이", desc: "데드존 없이 모든 공간을 덮는 메시 구성으로 연결합니다." },
          { name: "위성·LTE 백업", desc: "외진 부지에서도 끊기지 않도록 백업 회선을 둡니다." },
          { name: "영상통화 최적화", desc: "영상통화와 스트리밍에 맞춰 회선을 정리합니다." },
        ],
        steps: [
          { n: "01", t: "생활 반경 분석", d: "주로 머무는 공간과 사용 기기를 파악합니다." },
          { n: "02", t: "회선·라우터 설계", d: "부지 환경에 맞는 회선과 라우터를 배치합니다." },
          { n: "03", t: "백업망 구성", d: "끊김에 대비한 보조 회선을 연결합니다." },
        ],
        change: "어느 방에서든 영상통화와 스트리밍이 끊기지 않습니다.",
      },
      {
        id: "control",
        href: "/solution/iot",
        icon: SlidersHorizontal,
        code: "SYS_03",
        cat: "IoT",
        tagline: "알아서 준비되는 집",
        tag: "스마트 조명 · 냉난방 · 환기",
        desc: "도착 시간에 맞춰 조명·냉난방·환기가 미리 준비됩니다.",
        includes: [
          { name: "도착 전 냉난방 예약", desc: "도착 시간에 맞춰 미리 온도를 맞춰 둡니다." },
          { name: "음성·앱 제어", desc: "앱과 음성으로 공간별 조명과 기기를 제어합니다." },
          { name: "자동 환기", desc: "시간과 공기질에 맞춰 환기를 스케줄링합니다." },
        ],
        steps: [
          { n: "01", t: "생활 패턴 파악", d: "머무는 시간과 방식을 먼저 이해합니다." },
          { n: "02", t: "시나리오 설계", d: "도착·취침·외출 시나리오를 구성합니다." },
          { n: "03", t: "앱·음성 연동", d: "하나의 앱과 음성으로 묶어 제어합니다." },
        ],
        change: "문을 열면 이미 따뜻하고 환한 집이 맞이합니다.",
      },
      {
        id: "energy",
        href: "/solution/energy",
        icon: Zap,
        code: "SYS_04",
        cat: "에너지",
        tagline: "스스로 만드는 전기",
        tag: "태양광 · 가정용 ESS · EV 충전",
        desc: "햇빛으로 전기를 만들고 저장해, 전기요금과 정전 걱정을 줄입니다.",
        includes: [
          { name: "지붕 일체형 태양광", desc: "지붕과 일체화된 패널로 전기를 만듭니다." },
          { name: "가정용 ESS", desc: "잉여 전력을 저장해 밤과 정전에 대비합니다." },
          { name: "EV 충전기", desc: "전기차 충전과 전체 전력 부하를 함께 설계합니다." },
        ],
        steps: [
          { n: "01", t: "전력 사용 진단", d: "사용 패턴과 예상 부하를 분석합니다." },
          { n: "02", t: "발전·저장 설계", d: "태양광과 ESS 용량을 설계합니다." },
          { n: "03", t: "부하 관리", d: "사용량을 체계적으로 관리합니다." },
        ],
        change: "햇빛으로 충전하고, 정전에도 끄떡없습니다.",
      },
    ],
    process: [
      { title: "생활 방식 진단", body: "머무는 방식, 전력·통신 환경, 보안 필요를 먼저 파악합니다." },
      { title: "시스템 맵 구성", body: "출입·연결·자동화·전력 지점을 하나의 옵션 맵으로 정리합니다." },
      { title: "필요한 옵션만 확정", body: "스펙보다 실제 생활에서 받을 편의와 안심을 먼저 정합니다." },
    ],
  },
  EN: {
    eyebrow: "WEET LIVING OPTIONS",
    title: "Modular Spaces Completed With Tech Options",
    lead:
      "Weet solutions are not a list of devices. They are a tech-option layer that combines Security, Network, IoT, and Energy around how you actually live.",
    heroLabel: "Options are the foundation of daily life, not decoration",
    heroTitle: "We look at how your home is lived in, before the spec sheet.",
    heroBody:
      "We organize access and security, connectivity, automation, and power first, then choose only the options you truly need.",
    detailLabel: "What's included",
    worksLabel: "How it works",
    changeLabel: "What changes day to day",
    viewDetail: "View details",
    processTitle: "We add options differently",
    processLead:
      "We do not bolt devices on after completion. Wiring, sensors, control, and power load are planned together at the design stage.",
    consultLabel: "Ask about this option",
    closeLabel: "Close",
    ctaPrimary: "Check Options",
    ctaSecondary: "Ask about options",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        icon: LockKeyhole,
        code: "SYS_01",
        cat: "Security",
        tagline: "Eyes that watch over your home",
        tag: "CCTV · smart lock · motion-sensing lights",
        desc: "Check entry and surroundings of even a faraway second home from your phone.",
        includes: [
          { name: "Blind-spot-free CCTV", desc: "Camera positions are planned to cover the home inside and out." },
          { name: "Remote smart-lock entry", desc: "Open the door from afar and keep an access record." },
          { name: "Motion-sensing lights", desc: "Entrance lights turn on automatically when motion is detected." },
        ],
        steps: [
          { n: "01", t: "Blind-spot review", d: "We analyze entrance and window paths to set camera positions." },
          { n: "02", t: "Design-stage wiring", d: "Wiring and power are planned during construction." },
          { n: "03", t: "One-app integration", d: "Access, detection, and lighting are tied into a single app." },
        ],
        change: "Even when you're away, you see your whole home at a glance on your phone.",
      },
      {
        id: "network",
        href: "/solution/network",
        icon: Router,
        code: "SYS_02",
        cat: "Network",
        tagline: "No drop-offs, anywhere",
        tag: "Wi-Fi · router · satellite/LTE",
        desc: "We design connectivity so even mountain or remote sites stay reliably online.",
        includes: [
          { name: "Whole-home Wi-Fi", desc: "A mesh setup covers every space with no dead zones." },
          { name: "Satellite/LTE backup", desc: "A backup line keeps remote sites from dropping out." },
          { name: "Video-call optimized", desc: "Lines are tuned for video calls and streaming." },
        ],
        steps: [
          { n: "01", t: "Living-area review", d: "We map the spaces you use and the devices you rely on." },
          { n: "02", t: "Line & router design", d: "Lines and routers are placed to fit the site." },
          { n: "03", t: "Backup network", d: "A secondary line is connected against drop-offs." },
        ],
        change: "Video calls and streaming stay smooth in any room.",
      },
      {
        id: "control",
        href: "/solution/iot",
        icon: SlidersHorizontal,
        code: "SYS_03",
        cat: "IoT",
        tagline: "A home that gets itself ready",
        tag: "smart lighting · HVAC · ventilation",
        desc: "Lighting, heating, cooling, and ventilation are ready in time for your arrival.",
        includes: [
          { name: "Pre-arrival HVAC", desc: "Temperature is set in advance to match your arrival." },
          { name: "Voice & app control", desc: "Control lighting and devices by room with app and voice." },
          { name: "Automatic ventilation", desc: "Ventilation is scheduled by time and air quality." },
        ],
        steps: [
          { n: "01", t: "Read your routine", d: "We first understand when and how you use the home." },
          { n: "02", t: "Scenario design", d: "We build arrival, sleep, and away scenarios." },
          { n: "03", t: "App & voice link", d: "Everything is tied into one app and voice control." },
        ],
        change: "Open the door and a warm, bright home is already waiting.",
      },
      {
        id: "energy",
        href: "/solution/energy",
        icon: Zap,
        code: "SYS_04",
        cat: "Energy",
        tagline: "Electricity you make yourself",
        tag: "solar · home ESS · EV charging",
        desc: "Generate and store electricity from sunlight, easing bills and outage worries.",
        includes: [
          { name: "Roof-integrated solar", desc: "Panels integrated with the roof generate your power." },
          { name: "Home ESS", desc: "Surplus power is stored for nights and outages." },
          { name: "EV charger", desc: "EV charging and total power load are planned together." },
        ],
        steps: [
          { n: "01", t: "Power-use review", d: "We analyze usage patterns and expected load." },
          { n: "02", t: "Generate & store", d: "We size the solar array and ESS capacity." },
          { n: "03", t: "Load management", d: "Consumption is managed systematically." },
        ],
        change: "Charged by sunlight, steady even through an outage.",
      },
    ],
    process: [
      { title: "Lifestyle review", body: "We first understand how you stay, your power and network conditions, and security needs." },
      { title: "System map", body: "Access, connectivity, automation, and power points are organized into one option map." },
      { title: "Only what you need", body: "We define the comfort and peace of mind you'll feel in real life, before specs." },
    ],
  },
  ES: {
    eyebrow: "WEET LIVING OPTIONS",
    title: "Espacios Modulares Completados Con Opciones Tecnológicas",
    lead:
      "Las soluciones Weet no son una lista de equipos. Son una capa de opciones tecnológicas que combina Seguridad, Red, IoT y Energía según cómo vive realmente.",
    heroLabel: "Las opciones son la base de la vida diaria, no decoración",
    heroTitle: "Miramos cómo se vive su hogar antes que la ficha técnica.",
    heroBody:
      "Primero organizamos el acceso y la seguridad, la conectividad, la automatización y la energía, y luego elegimos solo las opciones que realmente necesita.",
    detailLabel: "Qué incluye",
    worksLabel: "Cómo funciona",
    changeLabel: "Qué cambia en el día a día",
    viewDetail: "Ver detalles",
    processTitle: "Añadimos las opciones de otra forma",
    processLead:
      "No añadimos equipos tras la finalización. El cableado, los sensores, el control y la carga eléctrica se planifican juntos en la fase de diseño.",
    consultLabel: "Consultar esta opción",
    closeLabel: "Cerrar",
    ctaPrimary: "Ver opciones",
    ctaSecondary: "Consultar opciones",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        icon: LockKeyhole,
        code: "SYS_01",
        cat: "Seguridad",
        tagline: "Los ojos que cuidan su hogar",
        tag: "CCTV · cerradura inteligente · luces con sensor",
        desc: "Controle el acceso y el entorno de su segunda residencia lejana desde el móvil.",
        includes: [
          { name: "CCTV sin puntos ciegos", desc: "Las cámaras se ubican para cubrir el interior y el exterior." },
          { name: "Acceso remoto con cerradura", desc: "Abra la puerta a distancia y deje un registro de accesos." },
          { name: "Luces con sensor de movimiento", desc: "La luz de entrada se enciende sola al detectar movimiento." },
        ],
        steps: [
          { n: "01", t: "Revisión de puntos ciegos", d: "Analizamos los recorridos de entrada y ventanas para ubicar cámaras." },
          { n: "02", t: "Cableado en diseño", d: "El cableado y la alimentación se planifican durante la obra." },
          { n: "03", t: "Integración en una app", d: "Acceso, detección e iluminación se unen en una sola app." },
        ],
        change: "Aunque esté fuera, ve toda su casa de un vistazo en el móvil.",
      },
      {
        id: "network",
        href: "/solution/network",
        icon: Router,
        code: "SYS_02",
        cat: "Red",
        tagline: "Sin cortes, en cualquier lugar",
        tag: "Wi-Fi · router · satélite/LTE",
        desc: "Diseñamos la conectividad para que incluso parcelas remotas sigan conectadas con fiabilidad.",
        includes: [
          { name: "Wi-Fi en toda la casa", desc: "Una malla cubre cada espacio sin zonas muertas." },
          { name: "Respaldo satélite/LTE", desc: "Una línea de respaldo evita cortes en parcelas aisladas." },
          { name: "Optimizado para videollamadas", desc: "Las líneas se ajustan para videollamadas y streaming." },
        ],
        steps: [
          { n: "01", t: "Análisis del uso diario", d: "Mapeamos los espacios y los dispositivos que usa." },
          { n: "02", t: "Diseño de línea y router", d: "Líneas y routers se colocan según la parcela." },
          { n: "03", t: "Red de respaldo", d: "Se conecta una línea secundaria ante cortes." },
        ],
        change: "Las videollamadas y el streaming no se cortan en ninguna habitación.",
      },
      {
        id: "control",
        href: "/solution/iot",
        icon: SlidersHorizontal,
        code: "SYS_03",
        cat: "IoT",
        tagline: "Una casa que se prepara sola",
        tag: "iluminación inteligente · climatización · ventilación",
        desc: "La luz, la climatización y la ventilación se preparan a tiempo para su llegada.",
        includes: [
          { name: "Climatización previa", desc: "La temperatura se ajusta de antemano según su llegada." },
          { name: "Control por voz y app", desc: "Controle luces y equipos por estancia con app y voz." },
          { name: "Ventilación automática", desc: "La ventilación se programa por hora y calidad del aire." },
        ],
        steps: [
          { n: "01", t: "Entender su rutina", d: "Primero entendemos cuándo y cómo usa la casa." },
          { n: "02", t: "Diseño de escenarios", d: "Creamos escenarios de llegada, descanso y salida." },
          { n: "03", t: "Enlace app y voz", d: "Todo se une en una sola app y control por voz." },
        ],
        change: "Abre la puerta y una casa cálida y luminosa ya le espera.",
      },
      {
        id: "energy",
        href: "/solution/energy",
        icon: Zap,
        code: "SYS_04",
        cat: "Energía",
        tagline: "La electricidad que usted mismo genera",
        tag: "solar · ESS doméstico · carga EV",
        desc: "Genere y almacene electricidad del sol, reduciendo la factura y el miedo a los apagones.",
        includes: [
          { name: "Solar integrado en el techo", desc: "Paneles integrados con el techo generan su energía." },
          { name: "ESS doméstico", desc: "El excedente se almacena para la noche y los apagones." },
          { name: "Cargador EV", desc: "La carga del vehículo y la carga total se planifican juntas." },
        ],
        steps: [
          { n: "01", t: "Revisión del consumo", d: "Analizamos los patrones de uso y la carga prevista." },
          { n: "02", t: "Generar y almacenar", d: "Dimensionamos la instalación solar y el ESS." },
          { n: "03", t: "Gestión de carga", d: "El consumo se gestiona de forma sistemática." },
        ],
        change: "Cargada por el sol, firme incluso durante un apagón.",
      },
    ],
    process: [
      { title: "Revisión del estilo de vida", body: "Primero entendemos cómo se queda, su entorno eléctrico y de red, y sus necesidades de seguridad." },
      { title: "Mapa del sistema", body: "Acceso, conectividad, automatización y energía se organizan en un único mapa de opciones." },
      { title: "Solo lo necesario", body: "Definimos la comodidad y la tranquilidad que sentirá en la vida real, antes que las especificaciones." },
    ],
  },
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const active = openIndex !== null ? copy.packages[openIndex] : null;

  // Cursor glow follows pointer inside each category card.
  const handleGlow = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Close modal on Escape + lock body scroll while open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div className="min-h-screen bg-weet-ink-deep text-weet-paper">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-weet-paper/10">
        {/* scanning grid */}
        <div
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(236,230,218,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(236,230,218,0.045)_1px,transparent_1px)] [background-size:44px_44px]"
          aria-hidden
        />
        {/* gold radial */}
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_circle_at_78%_16%,rgba(253,184,19,0.10),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1440px] px-[5vw] pb-[70px] pt-24 md:pt-[96px]">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#79D2B6]" />
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#79D2B6]">
              {copy.eyebrow}
            </span>
          </div>
          <h1 className="m-0 max-w-[20ch] text-[clamp(34px,5.4vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] text-weet-paper kr-balance">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(15px,1.5vw,19px)] font-light leading-[1.65] text-weet-paper/75 kr-balance">
            {copy.lead}
          </p>
        </div>
      </section>

      {/* ===== INTENT BAR ===== */}
      <section className="border-b border-weet-paper/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-[5vw] py-10 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-weet-gold" />
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#79D2B6]">
                {copy.heroLabel}
              </p>
              <h2 className="mt-1.5 text-[clamp(18px,1.9vw,22px)] font-semibold leading-snug tracking-[-0.02em] text-weet-paper kr-balance">
                {copy.heroTitle}
              </h2>
            </div>
          </div>
          <p className="max-w-[44ch] text-[14px] leading-[1.7] text-weet-paper/65 kr-balance">
            {copy.heroBody}
          </p>
        </div>
      </section>

      {/* ===== CATEGORY CARDS ===== */}
      <section className="mx-auto max-w-[1440px] px-[5vw] pb-[110px] pt-16">
        <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-2">
          {copy.packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setOpenIndex(index)}
                onMouseMove={handleGlow}
                className="group wt-reveal relative flex flex-col overflow-hidden rounded-[16px] border border-weet-paper/12 bg-weet-ink text-left transition-[transform,border-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[5px] hover:border-weet-gold/55"
              >
                {/* cursor glow */}
                <span
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(253,184,19,0.16),transparent_60%)] group-hover:opacity-100"
                  aria-hidden
                />
                {/* image strip */}
                <div className="relative aspect-[16/8] overflow-hidden rounded-t-[16px] border-b border-weet-paper/10">
                  <Image
                    src={CARD_IMAGES[pkg.id]}
                    alt={pkg.cat}
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    className="object-cover grayscale-[0.4] transition-[transform,filter] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
                  />
                  <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-weet-ink-deep/70 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-[#79D2B6] backdrop-blur-sm">
                    <Icon className="h-3 w-3" strokeWidth={2} />
                    {pkg.code}
                  </span>
                </div>
                {/* body */}
                <div className="relative z-20 px-7 pb-7 pt-[26px]">
                  <div className="mb-2 flex items-baseline gap-3">
                    <h3 className="m-0 text-[26px] font-semibold tracking-[-0.02em] text-weet-paper">
                      {pkg.cat}
                    </h3>
                    <span className="font-mono text-[12px] text-weet-paper/55">{pkg.tagline}</span>
                  </div>
                  <p className="mt-3 mb-[18px] text-[13.5px] leading-[1.65] text-weet-paper/70 kr-balance">
                    {pkg.desc}
                  </p>
                  <div className="flex items-center justify-between border-t border-weet-paper/10 pt-4">
                    <span className="font-mono text-[11.5px] text-weet-paper/50">{pkg.tag}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-semibold text-weet-paper/75 transition-colors group-hover:text-weet-gold">
                      {copy.viewDetail}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-[5px]" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== WORKFLOW STRIP ===== */}
      <section className="border-t border-weet-paper/10 bg-weet-ink">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-[5vw] py-16 lg:grid-cols-[300px_1fr] lg:py-24">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1.1] tracking-[-0.03em] text-weet-paper kr-balance">
              {copy.processTitle}
            </h2>
            <p className="mt-4 max-w-[40ch] text-[14px] leading-[1.7] text-weet-paper/65 kr-balance">
              {copy.processLead}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {copy.process.map((step, index) => (
              <div key={step.title} className="border-t-2 border-weet-paper/15 pt-4">
                <span className="font-mono text-[13px] font-semibold text-weet-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[15px] font-semibold text-weet-paper kr-balance">{step.title}</h3>
                <p className="mt-2 text-[12.5px] leading-[1.6] text-weet-paper/55 kr-balance">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTAS ===== */}
      <section className="mx-auto flex max-w-[1440px] flex-col gap-3.5 px-[5vw] py-16 sm:flex-row">
        <Link
          href="/customize"
          className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-gold px-7 py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
        >
          {copy.ctaPrimary}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/support"
          className="inline-flex items-center justify-center rounded-[6px] border border-weet-paper/30 px-7 py-[15px] text-[15px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
        >
          {copy.ctaSecondary}
        </Link>
      </section>

      {/* ===== DETAIL MODAL ===== */}
      {active && (
        <div
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(10,8,5,0.7)] px-5 py-[5vh] backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[680px] overflow-hidden rounded-[18px] border border-weet-paper/16 bg-weet-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]"
          >
            {/* modal header image */}
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image
                src={PACKAGE_IMAGES[active.id]}
                alt={active.cat}
                fill
                sizes="680px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-weet-ink/95 via-weet-ink/30 to-transparent" />
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="absolute right-4 top-4 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-weet-ink-deep/70 backdrop-blur-sm transition-[transform,background] duration-200 hover:rotate-90 hover:bg-weet-paper/[0.16]"
                aria-label={copy.closeLabel}
              >
                <X className="h-[15px] w-[15px] text-weet-paper" />
              </button>
              <div className="absolute inset-x-0 bottom-0 px-8 pb-7">
                <div className="mb-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#79D2B6]">
                  {active.code} · {active.tag}
                </div>
                <h2 className="m-0 text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.025em] text-weet-paper">
                  {active.cat} <span className="text-weet-paper/55">— {active.tagline}</span>
                </h2>
              </div>
            </div>

            {/* modal body */}
            <div className="px-8 pb-[34px] pt-[30px]">
              <p className="m-0 mb-[26px] text-[14.5px] leading-[1.8] text-weet-paper/70 kr-balance">
                {active.desc}
              </p>

              {/* 포함 항목 */}
              <div className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-[#79D2B6]">
                {"// "}
                {copy.detailLabel}
              </div>
              <div className="mb-[30px] flex flex-col gap-2.5">
                {active.includes.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 rounded-[10px] border border-weet-paper/10 bg-weet-paper/[0.04] px-4 py-3.5"
                  >
                    <span className="mt-px flex-none font-mono text-[14px] font-semibold text-weet-gold">+</span>
                    <div>
                      <div className="text-[14.5px] font-semibold leading-[1.4] text-weet-paper kr-balance">
                        {item.name}
                      </div>
                      <div className="mt-1 text-[13px] leading-[1.6] text-weet-paper/55 kr-balance">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 이렇게 동작합니다 */}
              <div className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-[#79D2B6]">
                {"// "}
                {copy.worksLabel}
              </div>
              <div className="mb-[30px] grid grid-cols-1 gap-4 sm:grid-cols-3">
                {active.steps.map((step) => (
                  <div key={step.n} className="border-t-2 border-weet-paper/15 pt-3.5">
                    <span className="font-mono text-[13px] font-semibold text-weet-gold">{step.n}</span>
                    <h4 className="mb-1.5 mt-2 text-[14px] font-semibold text-weet-paper kr-balance">
                      {step.t}
                    </h4>
                    <p className="m-0 text-[12px] leading-[1.6] text-weet-paper/50 kr-balance">{step.d}</p>
                  </div>
                ))}
              </div>

              {/* 일상의 변화 */}
              <div className="mb-7 flex items-start gap-3 rounded-[12px] border border-weet-paper/12 bg-weet-paper/[0.03] px-[22px] py-5 [background:radial-gradient(500px_circle_at_85%_30%,rgba(253,184,19,0.12),transparent_55%),rgba(236,230,218,0.03)]">
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#79D2B6]" />
                <div>
                  <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-weet-paper/50">
                    {copy.changeLabel}
                  </div>
                  <p className="m-0 text-[15.5px] font-semibold leading-[1.4] text-weet-paper kr-balance">
                    {active.change}
                  </p>
                </div>
              </div>

              {/* actions: real subroute + close */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={active.href}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-weet-gold px-6 py-[13px] text-[14px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
                >
                  {copy.consultLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className="inline-flex items-center rounded-[6px] border border-weet-paper/30 px-[22px] py-3 text-[14px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                >
                  {copy.closeLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
