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

type PackageCopy = {
  id: string;
  href: string;
  image: string;
  icon: LucideIcon;
  code: string;
  title: string;
  subtitle: string;
  problem: string;
  promise: string;
  details: string[];
  proof: string;
};

type PageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  selectLabel: string;
  detailLabel: string;
  proofLabel: string;
  processTitle: string;
  processLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  packages: PackageCopy[];
  process: Array<{ title: string; body: string }>;
};

const PACKAGE_IMAGES: Record<string, string> = {
  security: "/images/handoff/sol-security.webp",
  network: "/images/handoff/sol-network.webp",
  control: "/images/handoff/sol-control.webp",
  energy: "/images/handoff/sol-energy.webp",
};

const COPY: Record<Language, PageCopy> = {
  KO: {
    eyebrow: "WEET OPERATION OPTIONS",
    title: "테크 옵션으로 완성하는 모듈러 공간",
    lead:
      "Weet 솔루션은 장비 나열이 아니라 보안, 네트워크, 제어, 에너지 스택을 공간 목적에 맞춰 조합하는 테크 옵션 레이어입니다.",
    heroLabel: "옵션은 장식이 아니라 운영 시스템입니다",
    heroTitle: "스펙보다 먼저 사용 흐름과 제어 범위를 정의합니다.",
    heroBody:
      "출입 권한, 결제망, 원격 제어, 전력 부하를 먼저 정리한 뒤 실제로 필요한 옵션만 선택합니다.",
    selectLabel: "선택 기준",
    detailLabel: "포함 스펙",
    proofLabel: "운영자가 체감하는 변화",
    processTitle: "옵션을 붙이는 방식도 다릅니다",
    processLead:
      "완공 후 장비를 덧붙이는 방식이 아니라, 배선·센서·제어 패널·전력 부하를 설계 단계에서 함께 잡습니다.",
    ctaPrimary: "주문 옵션 확인",
    ctaSecondary: "테크 옵션 문의",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        code: "SYS_01",
        title: "보안 코어 (Security Core)",
        subtitle: "CCTV · 스마트락 · 센서 및 접근 로깅",
        problem: "야간·무인 운영에서 생기는 보안 공백을 줄입니다.",
        promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한/접근 방식 정리"],
        proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        code: "SYS_02",
        title: "네트워크 패브릭 (Network Fabric)",
        subtitle: "POS · 게스트 Wi-Fi · 라우터/위성망",
        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 리스크를 줄입니다.",
        promise: "운영망, 고객망, 장비망을 구분하고 용도별 회선과 라우터 구성을 제안합니다.",
        details: ["POS/업무/게스트망 분리", "라우터/위성망/LTE 통신함 계획", "백업 회선 필요성 점검"],
        proof: "카드 결제와 예약 확인이 고객 Wi-Fi 트래픽에 덜 흔들립니다.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        code: "SYS_03",
        title: "제어 계층 (Control Layer)",
        subtitle: "IoT 조명 · 냉난방 제어 · 환기 스케줄링",
        problem: "입실 전마다 수동으로 확인해야 하는 반복 업무를 줄입니다.",
        promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 자동 스케줄", "도어 상태 및 운영 알림"],
        proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
      },
      {
        id: "energy",
        href: "/solution/energy",
        image: "/images/customize/options/solar-panel.webp",
        icon: Zap,
        code: "SYS_04",
        title: "에너지 스택 (Energy Stack)",
        subtitle: "태양광 · ESS · EV 충전기 · 부하 설계",
        problem: "높은 전기 요금과 전력 수급 불안정 리스크를 해소합니다.",
        promise: "안정적이고 효율적인 전력 인프라로 독립적인 모듈러 운영을 지원합니다.",
        details: ["태양광 패널 지붕 통합", "잉여 전력 보관용 ESS 연동", "방문객 EV 충전기 및 부하 설계"],
        proof: "전력 사용량이 체계적으로 관리되고, 에너지 독립성이 강화됩니다.",
      },
    ],
    process: [
      { title: "사용 흐름 진단", body: "무인, 상시 상주, 전력 부하, 네트워크 환경을 먼저 파악합니다." },
      { title: "시스템 맵 구성", body: "출입, 통신, 공조, 전력 연결 지점을 하나의 옵션 맵으로 정리합니다." },
      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 제어 범위를 먼저 정합니다." },
    ],
  },
  EN: {
    eyebrow: "WEET OPERATION OPTIONS",
    title: "Modular Spaces Completed With Tech Options",
    lead:
      "A good space does not end with a beautiful shell. Weet plans security, connection, remote control, and energy management around the problems operators face every day.",
    heroLabel: "Options are operating systems",
    heroTitle: "We define usage flow and control scope before device specs.",
    heroBody:
      "We check whether the space runs unmanned, whether payments must never fail, and whether power load is stable, before combining the right options.",
    selectLabel: "Selection Criteria",
    detailLabel: "Included Specs",
    proofLabel: "Operational change",
    processTitle: "The option workflow is different",
    processLead:
      "We do not bolt devices on after completion. Wiring, sensors, control panels, and power loads are planned with the space.",
    ctaPrimary: "Check Options",
    ctaSecondary: "Consultation",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        code: "SYS_01",
        title: "Security Core",
        subtitle: "CCTV · smart lock · sensors/access logging",
        problem: "Reduce security gaps in night and unmanned operations.",
        promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
        details: ["Blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
        proof: "Operators know who entered at night and which alerts deserve attention.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        code: "SYS_02",
        title: "Network Fabric",
        subtitle: "POS · guest Wi-Fi · router/satellite readiness",
        problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
        promise: "We separate operator, guest, and device networks and recommend the right line and router.",
        details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
        proof: "Payments and reservations are less affected by guest traffic and device load.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        code: "SYS_03",
        title: "Control Layer",
        subtitle: "IoT lighting · HVAC · ventilation schedules",
        problem: "Reduce repeated manual checks for unmanned operations.",
        promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
        details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
        proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
      },
      {
        id: "energy",
        href: "/solution/energy",
        image: "/images/customize/options/solar-panel.webp",
        icon: Zap,
        code: "SYS_04",
        title: "Energy Stack",
        subtitle: "solar · ESS · EV charger · load planning",
        problem: "Resolve high utility costs and unstable power supply risks.",
        promise: "We support independent modular operation with stable and efficient power infrastructure.",
        details: ["Roof-integrated solar panels", "ESS for surplus power", "EV chargers and load planning"],
        proof: "Power consumption is systematically managed, and energy independence is strengthened.",
      },
    ],
    process: [
      { title: "Operating interview", body: "We first check unmanned, power load, and network needs." },
      { title: "System map", body: "Access, connection, HVAC, and power points are organized as one option map." },
      { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
    ],
  },
  ES: {
    eyebrow: "WEET OPERATION OPTIONS",
    title: "Espacios Modulares Completados Con Opciones Tecnológicas",
    lead:
      "Un buen espacio no termina con una carcasa bonita. Weet planifica la seguridad, la conexión, el control remoto y la gestión energética en torno a los problemas que los operadores enfrentan cada día.",
    heroLabel: "Las opciones son sistemas operativos",
    heroTitle: "Definimos el flujo de uso y el alcance del control antes que las especificaciones de los equipos.",
    heroBody:
      "Comprobamos si el espacio funciona sin personal, si los pagos nunca pueden fallar y si la carga eléctrica es estable, antes de combinar las opciones adecuadas.",
    selectLabel: "Criterios de selección",
    detailLabel: "Especificaciones incluidas",
    proofLabel: "Cambio operativo",
    processTitle: "El flujo de trabajo de las opciones es diferente",
    processLead:
      "No añadimos equipos después de la finalización. El cableado, los sensores, los paneles de control y las cargas eléctricas se planifican junto con el espacio.",
    ctaPrimary: "Ver opciones",
    ctaSecondary: "Consulta",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        code: "SYS_01",
        title: "Security Core",
        subtitle: "CCTV · cerradura inteligente · sensores/registro de accesos",
        problem: "Reduzca las brechas de seguridad en operaciones nocturnas y sin personal.",
        promise: "Los registros de acceso, la detección nocturna y la iluminación de entrada se planifican como un único flujo operativo.",
        details: ["Revisión de puntos ciegos", "Ubicación de CCTV y luces con sensor", "Planificación de permisos de cerradura inteligente"],
        proof: "Los operadores saben quién entró por la noche y qué alertas merecen atención.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        code: "SYS_02",
        title: "Network Fabric",
        subtitle: "TPV · Wi-Fi de invitados · preparación para router/satélite",
        problem: "Reduzca las pérdidas cuando el pago, la reserva o el control remoto dependen de una conectividad inestable.",
        promise: "Separamos las redes de operador, invitados y dispositivos y recomendamos la línea y el router adecuados.",
        details: ["División de redes TPV/trabajo/invitados", "Ubicación de router y caja de red", "Revisión de línea de respaldo"],
        proof: "Los pagos y las reservas se ven menos afectados por el tráfico de invitados y la carga de dispositivos.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        code: "SYS_03",
        title: "Control Layer",
        subtitle: "iluminación IoT · climatización · programación de ventilación",
        problem: "Reduzca las comprobaciones manuales repetidas en operaciones sin personal.",
        promise: "La iluminación, la climatización, la ventilación y el estado de las puertas pueden seguir el horario de reservas y de operación.",
        details: ["Interruptores inteligentes y paneles de temperatura", "Programación de climatización previa a la llegada", "Alertas de estado de puertas y operación"],
        proof: "El espacio puede prepararse antes de que lleguen los huéspedes, con menos visitas innecesarias.",
      },
      {
        id: "energy",
        href: "/solution/energy",
        image: "/images/customize/options/solar-panel.webp",
        icon: Zap,
        code: "SYS_04",
        title: "Energy Stack",
        subtitle: "solar · ESS · cargador EV · planificación de carga",
        problem: "Resuelva los altos costos de electricidad y los riesgos de un suministro eléctrico inestable.",
        promise: "Apoyamos la operación modular independiente con una infraestructura eléctrica estable y eficiente.",
        details: ["Paneles solares integrados en el techo", "ESS para el excedente de energía", "Cargadores EV y planificación de carga"],
        proof: "El consumo de energía se gestiona de forma sistemática y se refuerza la independencia energética.",
      },
    ],
    process: [
      { title: "Entrevista operativa", body: "Primero comprobamos las necesidades de operación sin personal, carga eléctrica y red." },
      { title: "Mapa del sistema", body: "Los puntos de acceso, conexión, climatización y energía se organizan en un único mapa de opciones." },
      { title: "Confirmación de opciones", body: "Definimos las alertas reales y el alcance de la gestión antes de perseguir especificaciones de equipos." },
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
            <span className="h-2 w-2 animate-pulse rounded-full bg-weet-forest" />
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
                    src={PACKAGE_IMAGES[pkg.id]}
                    alt={pkg.title}
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
                      {pkg.title}
                    </h3>
                  </div>
                  <p className="m-0 font-mono text-[12px] text-weet-paper/55">{pkg.subtitle}</p>
                  <p className="mt-3 mb-[18px] text-[13.5px] leading-[1.65] text-weet-paper/70 kr-balance">
                    {pkg.promise}
                  </p>
                  <div className="flex items-center justify-between border-t border-weet-paper/10 pt-4">
                    <span className="font-mono text-[11.5px] text-weet-paper/50">{pkg.problem}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-semibold text-weet-paper/75 transition-colors group-hover:text-weet-gold">
                      {copy.detailLabel}
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
                alt={active.title}
                fill
                sizes="680px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-weet-ink/95 via-weet-ink/30 to-transparent" />
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="absolute right-4 top-4 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-weet-ink-deep/70 backdrop-blur-sm transition-[transform,background] duration-200 hover:rotate-90 hover:bg-weet-paper/[0.16]"
                aria-label="Close"
              >
                <X className="h-[15px] w-[15px] text-weet-paper" />
              </button>
              <div className="absolute inset-x-0 bottom-0 px-8 pb-7">
                <div className="mb-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#79D2B6]">
                  {active.code} · {active.subtitle}
                </div>
                <h2 className="m-0 text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.025em] text-weet-paper">
                  {active.title}
                </h2>
              </div>
            </div>

            {/* modal body */}
            <div className="px-8 pb-[34px] pt-[30px]">
              <p className="m-0 mb-[26px] text-[14.5px] leading-[1.8] text-weet-paper/70 kr-balance">
                {active.promise}
              </p>

              {/* 포함 항목 */}
              <div className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-[#79D2B6]">
                {"// "}
                {copy.detailLabel}
              </div>
              <div className="mb-[30px] flex flex-col gap-2.5">
                {active.details.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[10px] border border-weet-paper/10 bg-weet-paper/[0.04] px-4 py-3.5"
                  >
                    <span className="mt-px flex-none font-mono text-[14px] font-semibold text-weet-gold">+</span>
                    <div className="text-[14.5px] font-medium leading-[1.5] text-weet-paper kr-balance">
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              {/* 이렇게 동작합니다 */}
              <div className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-[#79D2B6]">
                {"// "}
                {copy.processTitle}
              </div>
              <div className="mb-[30px] grid grid-cols-1 gap-4 sm:grid-cols-3">
                {copy.process.map((step, index) => (
                  <div key={step.title} className="border-t-2 border-weet-paper/15 pt-3.5">
                    <span className="font-mono text-[13px] font-semibold text-weet-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mb-1.5 mt-2 text-[14px] font-semibold text-weet-paper kr-balance">
                      {step.title}
                    </h4>
                    <p className="m-0 text-[12px] leading-[1.6] text-weet-paper/50 kr-balance">{step.body}</p>
                  </div>
                ))}
              </div>

              {/* 일상의 변화 / 운영자가 체감하는 변화 */}
              <div className="mb-7 flex items-start gap-3 rounded-[12px] border border-weet-paper/12 bg-weet-paper/[0.03] px-[22px] py-5 [background:radial-gradient(500px_circle_at_85%_30%,rgba(253,184,19,0.12),transparent_55%),rgba(236,230,218,0.03)]">
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-weet-forest" />
                <div>
                  <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-weet-paper/50">
                    {copy.proofLabel}
                  </div>
                  <p className="m-0 text-[15.5px] font-semibold leading-[1.4] text-weet-paper kr-balance">
                    {active.proof}
                  </p>
                </div>
              </div>

              {/* actions: real subroute + close */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={active.href}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-weet-gold px-6 py-[13px] text-[14px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
                >
                  {copy.ctaSecondary}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className="inline-flex items-center rounded-[6px] border border-weet-paper/30 px-[22px] py-3 text-[14px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                >
                  {language === "KO" ? "닫기" : language === "ES" ? "Cerrar" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
