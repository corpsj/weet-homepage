"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Router,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = "KO" | "EN";

type PackageCopy = {
  id: string;
  href: string;
  image: string;
  icon: LucideIcon;
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

const COPY: Record<Lang, PageCopy> = {
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
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <main className="min-h-screen bg-[#fcfbfa] text-[#2f3432]">
      {/* Hero Section */}
      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-28 md:px-10 lg:pb-16 lg:pt-36">
        <div className="grid gap-8 border-b border-[#e6dfd3] pb-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:pb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d6e66]">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#2f3432] md:text-5xl lg:text-6xl break-keep">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5a625e] md:text-xl break-keep">
              {copy.lead}
            </p>
          </div>

          <div className="self-end rounded-lg border border-[#e6dfd3] bg-[#f5f2eb] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-[#f5a623]"></span>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7a6a3a]">{copy.heroLabel}</p>
            </div>
            <h2 className="text-xl font-bold leading-snug text-[#2f3432] break-keep">
              {copy.heroTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5a625e] break-keep">{copy.heroBody}</p>
          </div>
        </div>
      </section>

      {/* Technical Modules Table Layout */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 md:px-10 lg:pb-24">
        <div className="flex flex-col gap-6">
          {copy.packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <article
                key={pkg.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-[#e6dfd3] bg-white transition-shadow hover:shadow-md lg:flex-row"
              >
                {/* Visual Strip */}
                <div className="relative w-full shrink-0 border-b border-[#e6dfd3] bg-[#fcfbfa] p-4 lg:w-[280px] lg:border-b-0 lg:border-r lg:p-6">
                  <div className="relative mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#c4e3e0] bg-[#e6f4f2] text-[#0d6e66]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#a3b3ac]">
                      MOD_0{index + 1}
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-[#e6dfd3]">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Specs Console */}
                <div className="flex w-full flex-col p-6 lg:flex-row lg:p-0">
                  <div className="flex flex-1 flex-col justify-center border-b border-[#e6dfd3] pb-6 lg:border-b-0 lg:border-r lg:p-8 lg:pb-8">
                    <h2 className="text-2xl font-black text-[#2f3432]">{pkg.title}</h2>
                    <p className="mt-1 font-mono text-xs text-[#0d6e66]">{pkg.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[#5a625e]">{pkg.promise}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {pkg.details.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1.5 rounded bg-[#f5f2eb] px-2.5 py-1 text-xs font-bold text-[#5a625e]">
                          <CheckCircle2 className="h-3 w-3 text-[#f5a623]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact Column */}
                  <div className="flex w-full shrink-0 flex-col justify-between pt-6 lg:w-[320px] lg:p-8 lg:pt-8 bg-[#fcfbfa]">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3b3ac]">{copy.selectLabel}</p>
                      <p className="mt-1.5 text-sm font-semibold leading-relaxed text-[#2f3432]">{pkg.problem}</p>
                    </div>

                    <div className="mt-6 border-t border-[#e6dfd3] pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0d6e66]"></div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3b3ac]">{copy.proofLabel}</p>
                      </div>
                      <p className="text-xs font-medium leading-relaxed text-[#0d6e66]">{pkg.proof}</p>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={pkg.href}
                        className="inline-flex h-9 w-full items-center justify-between rounded border border-[#0d6e66] px-4 text-xs font-bold text-[#0d6e66] transition-colors hover:bg-[#e6f4f2]"
                      >
                        {copy.detailLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Workflow Strip */}
      <section className="border-y border-[#e6dfd3] bg-[#f5f2eb]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 md:px-10 lg:grid-cols-[300px_1fr] lg:py-16">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#f5a623]">Workflow</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-[#2f3432] break-keep">
              {copy.processTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5a625e] break-keep">{copy.processLead}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {copy.process.map((step, index) => (
              <div key={step.title} className="flex flex-col border-t-2 border-[#e6dfd3] pt-4">
                <span className="font-mono text-sm font-bold text-[#f5a623]">0{index + 1}</span>
                <h3 className="mt-2 text-base font-bold text-[#2f3432] break-keep">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5a625e] break-keep">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTAs */}
      <section className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-12 md:px-10 sm:flex-row">
        <Link
          href="/customize"
          className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#febd16] px-6 text-sm font-bold text-[#2f3432] transition-colors hover:bg-[#e2a80f]"
        >
          {copy.ctaPrimary}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/support"
          className="inline-flex h-11 items-center justify-center rounded border border-[#d8d0c3] bg-white px-6 text-sm font-bold text-[#5a625e] transition-colors hover:border-[#2f3432] hover:text-[#2f3432]"
        >
          {copy.ctaSecondary}
        </Link>
      </section>
    </main>
  );
}
