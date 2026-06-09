"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Paintbrush,
  Router,
  SlidersHorizontal,
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
    title: "운영까지 준비된 모듈러 공간",
    lead:
      "좋은 공간은 예쁜 외관에서 끝나지 않습니다. Weet는 보안, 연결, 원격 준비, 브랜드 마감을 실제 운영자가 매일 겪는 문제 기준으로 설계합니다.",
    heroLabel: "옵션은 장식이 아니라 운영 리스크 관리입니다",
    heroTitle: "상담 때 장비명이 아니라 운영 상황부터 묻습니다.",
    heroBody:
      "무인으로 열어야 하는지, 결제가 끊기면 안 되는지, 입실 전 냉난방이 필요한지, 상권에서 첫인상이 중요한지부터 확인한 뒤 필요한 옵션만 조합합니다.",
    selectLabel: "선택 기준",
    detailLabel: "포함되는 것",
    proofLabel: "운영자가 체감하는 변화",
    processTitle: "옵션을 붙이는 방식도 다릅니다",
    processLead:
      "완공 후 장비를 덧붙이는 방식이 아니라, 출입 동선·배선·조명·마감 위치를 설계 단계에서 함께 잡습니다.",
    ctaPrimary: "주문 옵션 확인",
    ctaSecondary: "상담으로 현장 맞추기",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        title: "안심 출입",
        subtitle: "CCTV · 스마트락 · 센서등",
        problem: "운영자가 항상 머물 수 없는 외곽·야간·예약제 공간의 보안 공백을 줄입니다.",
        promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한 방식 정리"],
        proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        title: "끊김 없는 연결",
        subtitle: "POS · 예약 · 게스트 Wi-Fi",
        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 상업 공간의 손실 리스크를 줄입니다.",
        promise: "운영망, 고객망, 장비망을 구분하고 현장 조건에 맞는 회선과 라우터를 제안합니다.",
        details: ["POS/업무/게스트망 분리", "라우터와 통신함 위치 계획", "백업 회선 필요성 점검"],
        proof: "카드 결제와 예약 확인이 끊기지 않아 운영자가 현장에서 덜 불안합니다.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        title: "원격 준비",
        subtitle: "조명 · 냉난방 · 환기",
        problem: "입실 전마다 현장에 가야 하는 숙박·체험·무인 운영의 반복 업무를 줄입니다.",
        promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 스케줄", "도어 상태와 운영 알림"],
        proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
      },
      {
        id: "brand",
        href: "/solution/design",
        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
        icon: Paintbrush,
        title: "현장 완성",
        subtitle: "외장 · 간판 · 데크 동선",
        problem: "모듈러가 현장 상권, 브랜드 톤, 고객 진입 동선과 따로 노는 느낌을 줄입니다.",
        promise: "외장재, 간판 자리, 데크·조경·배수 마감을 함께 정리해 첫인상을 완성합니다.",
        details: ["브랜드 톤에 맞는 외장", "간판/조명 자리 사전 계획", "데크·조경·배수 디테일"],
        proof: "공간이 ‘놓인 건물’이 아니라 바로 영업 가능한 상업 장소처럼 보입니다.",
      },
    ],
    process: [
      { title: "운영 상황 인터뷰", body: "무인, 예약제, 상시 상주, 야간 운영 여부를 먼저 확인합니다." },
      { title: "현장 리스크 표시", body: "출입, 통신, 공조, 간판, 배수 위치를 도면과 현장 조건 위에 표시합니다." },
      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 관리 범위를 먼저 정합니다." },
    ],
  },
  EN: {
    eyebrow: "WEET OPERATION OPTIONS",
    title: "Modular Spaces Ready To Operate",
    lead:
      "A good space does not end with a beautiful shell. Weet plans security, connection, remote readiness, and site finish around the problems operators face every day.",
    heroLabel: "Options are risk control, not decoration",
    heroTitle: "We start with the operating situation, not a device list.",
    heroBody:
      "We check whether the space runs unmanned, whether payments must never fail, whether HVAC is needed before arrival, and whether first impression matters in the local market.",
    selectLabel: "How to choose",
    detailLabel: "What is included",
    proofLabel: "Operational change",
    processTitle: "The option workflow is different",
    processLead:
      "We do not bolt devices on after completion. Access flow, wiring, lighting, and finish details are planned with the space.",
    ctaPrimary: "Check order options",
    ctaSecondary: "Match my site",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        title: "Secure Access",
        subtitle: "CCTV · smart lock · sensor light",
        problem: "Reduce security gaps in remote, night, and reservation-based spaces where staff cannot stay all day.",
        promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
        details: ["Entrance blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
        proof: "Operators know who entered at night and which alerts deserve attention.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        title: "Stable Connection",
        subtitle: "POS · booking · guest Wi-Fi",
        problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
        promise: "We separate operator, guest, and device networks and recommend the right line and router for the site.",
        details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
        proof: "Payments and reservations stay reliable, so operators feel less exposed on site.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        title: "Remote Ready",
        subtitle: "lighting · HVAC · ventilation",
        problem: "Reduce repeated site visits for hospitality, experience rooms, and unmanned operations.",
        promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
        details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
        proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
      },
      {
        id: "brand",
        href: "/solution/design",
        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
        icon: Paintbrush,
        title: "Site Finish",
        subtitle: "facade · signage · deck flow",
        problem: "Prevent the module from feeling detached from the brand, local market, and customer flow.",
        promise: "Facade, signage position, deck, landscape, and drainage details are aligned before completion.",
        details: ["Brand-fit exterior palette", "Sign and lighting placement", "Deck, planting, and drainage detail"],
        proof: "The space reads as a business-ready site, not just a placed building.",
      },
    ],
    process: [
      { title: "Operating interview", body: "We first check unmanned, reservation-only, staffed, and night-operation needs." },
      { title: "Site risk map", body: "Access, connection, HVAC, signage, and drainage points are marked against the real site." },
      { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
    ],
  },
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-neutral-950">
      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-24 md:px-8 lg:pb-16 lg:pt-32">
        <div className="grid gap-10 border-b border-neutral-300 pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,0.7fr)] lg:gap-16 lg:pb-14">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl lg:text-[76px] break-keep">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
              {copy.lead}
            </p>
          </div>

          <div className="self-end rounded-md border border-neutral-300 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#A77B00]">{copy.heroLabel}</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-neutral-950 md:text-3xl break-keep">
              {copy.heroTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 break-keep">{copy.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 lg:pb-24">
        <div className="grid gap-6">
          {copy.packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <article
                key={pkg.id}
                className="grid gap-0 overflow-hidden rounded-md border border-neutral-300 bg-white lg:grid-cols-[minmax(340px,0.78fr)_1fr]"
              >
                <Link href={pkg.href} className="group relative block aspect-[16/10] overflow-hidden bg-neutral-200 lg:aspect-auto">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} ${pkg.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-4 top-4 rounded-sm bg-neutral-950/85 px-3 py-2 text-xs font-black text-white backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </Link>

                <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(220px,0.75fr)_1fr] lg:p-10">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-neutral-300 bg-[#FEBD16] text-neutral-950">
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </div>
                    <h2 className="mt-5 text-3xl font-black leading-tight text-neutral-950 md:text-4xl break-keep">
                      {pkg.title}
                    </h2>
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-neutral-500">{pkg.subtitle}</p>
                    <p className="mt-5 text-base font-semibold leading-relaxed text-neutral-800 break-keep">{pkg.promise}</p>
                    <Link
                      href={pkg.href}
                      className="mt-6 inline-flex h-11 items-center gap-2 rounded-sm border border-neutral-950 px-4 text-sm font-black text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                    >
                      {copy.detailLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{copy.selectLabel}</p>
                      <p className="mt-2 text-lg font-bold leading-relaxed text-neutral-950 break-keep">{pkg.problem}</p>
                    </div>

                    <ul className="grid gap-3">
                      {pkg.details.map((item) => (
                        <li key={item} className="flex gap-3 text-sm font-semibold leading-relaxed text-neutral-700 break-keep">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C69200]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-md bg-neutral-950 px-5 py-5 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">{copy.proofLabel}</p>
                      <p className="mt-2 text-sm font-semibold leading-relaxed break-keep">{pkg.proof}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-neutral-300 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(260px,0.5fr)_1fr] lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">WORKFLOW</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-neutral-950 md:text-5xl break-keep">
              {copy.processTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 break-keep">{copy.processLead}</p>
          </div>

          <ol className="grid gap-4">
            {copy.process.map((step, index) => (
              <li key={step.title} className="grid gap-3 border-b border-neutral-200 pb-5 last:border-b-0 md:grid-cols-[72px_1fr]">
                <span className="text-2xl font-black text-[#C69200]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-black text-neutral-950 break-keep">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-neutral-600 break-keep">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-12 md:px-8 sm:flex-row">
        <Link
          href="/customize"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#FEBD16] px-6 text-sm font-black text-neutral-950 transition-colors hover:bg-[#E2A80F]"
        >
          {copy.ctaPrimary}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/support"
          className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-6 text-sm font-black text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950"
        >
          {copy.ctaSecondary}
        </Link>
      </section>
    </main>
  );
}
