"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type LocalizedSolution = {
  eyebrow: string;
  title: string;
  lead: string;
  imageAlt: string;
  problemTitle: string;
  problem: string;
  fitTitle: string;
  fit: string[];
  includedTitle: string;
  included: string[];
  decisionsTitle: string;
  decisions: string[];
  outcomesTitle: string;
  outcomes: string[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export type SolutionPackageData = {
  id: "security" | "network" | "control" | "energy";
  href: string;
  image: string;
  copy: Record<Language, LocalizedSolution>;
};

const PACKAGE_NAV: Record<
  Language,
  Array<{ id: SolutionPackageData["id"]; href: string; name: string; desc: string }>
> = {
  KO: [
    { id: "security", href: "/solution/cctv", name: "시큐리티", desc: "CCTV · 스마트락 · 동작 감지" },
    { id: "network", href: "/solution/network", name: "네트워크", desc: "와이파이 · 라우터 · 위성/LTE" },
    { id: "control", href: "/solution/iot", name: "IoT", desc: "조명 · 냉난방 · 환기" },
    { id: "energy", href: "/solution/energy", name: "에너지", desc: "태양광 · ESS · EV" },
  ],
  EN: [
    { id: "security", href: "/solution/cctv", name: "Security", desc: "CCTV · smart lock · sensor light" },
    { id: "network", href: "/solution/network", name: "Network", desc: "Wi-Fi · router · satellite/LTE" },
    { id: "control", href: "/solution/iot", name: "IoT", desc: "lighting · HVAC · ventilation" },
    { id: "energy", href: "/solution/energy", name: "Energy", desc: "solar · ESS · EV charger" },
  ],
  ES: [
    { id: "security", href: "/solution/cctv", name: "Seguridad", desc: "CCTV · cerradura · luz con sensor" },
    { id: "network", href: "/solution/network", name: "Red", desc: "Wi-Fi · router · satélite/LTE" },
    { id: "control", href: "/solution/iot", name: "IoT", desc: "iluminación · climatización · ventilación" },
    { id: "energy", href: "/solution/energy", name: "Energía", desc: "solar · ESS · cargador EV" },
  ],
};

export default function SolutionTemplate({ data }: { data: SolutionPackageData }) {
  const { language } = useLanguage();
  const copy = data.copy[language];
  const nav = PACKAGE_NAV[language];

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
        <div className="relative mx-auto max-w-[1440px] px-[5vw] pb-14 pt-24 md:pt-32 lg:pb-20">
          <Link
            href="/solution"
            className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-weet-paper/55 transition-colors hover:text-weet-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "KO"
              ? "운영 옵션 전체"
              : language === "ES"
                ? "Todas las opciones de operación"
                : "All operation options"}
          </Link>

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#79D2B6]" />
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#79D2B6]">
                  {copy.eyebrow}
                </p>
              </div>
              <h1 className="mt-1 text-[clamp(34px,5.4vw,72px)] font-semibold leading-[1.05] tracking-[-0.04em] text-weet-paper kr-balance">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-xl text-[clamp(15px,1.5vw,20px)] font-light leading-[1.65] text-weet-paper/75 kr-balance">
                {copy.lead}
              </p>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] border border-weet-paper/12 bg-weet-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
              <Image
                src={data.image}
                alt={copy.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PACKAGE NAV ===== */}
      <section className="border-b border-weet-paper/10 bg-weet-ink">
        <div className="mx-auto flex max-w-[1440px] gap-2.5 overflow-x-auto px-[5vw] py-3.5">
          {nav.map((item) => {
            const isActive = item.id === data.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "min-w-[220px] rounded-[10px] border px-4 py-3 transition-[border-color,background,transform] duration-200",
                  isActive
                    ? "border-weet-gold/55 bg-weet-gold/[0.08] text-weet-gold"
                    : "border-weet-paper/12 bg-weet-paper/[0.03] text-weet-paper/70 hover:-translate-y-0.5 hover:border-weet-gold/40 hover:text-weet-paper",
                )}
              >
                <span className="block text-[14px] font-semibold tracking-[-0.01em]">{item.name}</span>
                <span
                  className={cn(
                    "mt-1 block font-mono text-[11.5px]",
                    isActive ? "text-weet-gold/70" : "text-weet-paper/45",
                  )}
                >
                  {item.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== BODY ===== */}
      <section className="mx-auto grid max-w-[1440px] gap-8 px-[5vw] py-14 lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:py-24">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="border-l-2 border-weet-forest pl-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#79D2B6]">
              {copy.problemTitle}
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-weet-paper/70 kr-balance">{copy.problem}</p>
          </div>
        </aside>

        <div className="grid gap-10">
          {/* fit */}
          <section className="grid gap-5 border-b border-weet-paper/10 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-[#79D2B6]" />
              <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-weet-paper/55">
                {copy.fitTitle}
              </h2>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {copy.fit.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] font-medium leading-[1.6] text-weet-paper kr-balance"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#79D2B6]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* included */}
          <section className="grid gap-5 border-b border-weet-paper/10 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-[#79D2B6]" />
              <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-weet-paper/55">
                {copy.includedTitle}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.included.map((item) => (
                <div
                  key={item}
                  className="rounded-[10px] border border-weet-paper/10 bg-weet-paper/[0.04] px-4 py-4 text-[14px] font-medium leading-[1.6] text-weet-paper kr-balance"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* decisions */}
          <section className="grid gap-5 border-b border-weet-paper/10 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-[#79D2B6]" />
              <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-weet-paper/55">
                {copy.decisionsTitle}
              </h2>
            </div>
            <ol className="grid gap-3">
              {copy.decisions.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[40px_1fr] items-start gap-3 border-b border-weet-paper/10 pb-3 last:border-b-0"
                >
                  <span className="font-mono text-[13px] font-semibold text-weet-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium leading-[1.6] text-weet-paper kr-balance">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* outcomes */}
          <section className="grid gap-5 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#79D2B6]" />
              <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-weet-paper/55">
                {copy.outcomesTitle}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {copy.outcomes.map((item) => (
                <p
                  key={item}
                  className="rounded-[12px] border border-weet-paper/12 bg-weet-paper/[0.03] px-5 py-5 text-[14px] font-medium leading-[1.6] text-weet-paper/85 kr-balance [background:radial-gradient(420px_circle_at_85%_25%,rgba(46,74,63,0.28),transparent_60%),rgba(236,230,218,0.03)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Link
              href="/customize"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-weet-gold px-7 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/support"
              className="inline-flex h-12 items-center justify-center rounded-[6px] border border-weet-paper/30 px-7 text-[15px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
