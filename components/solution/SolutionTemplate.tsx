"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type Lang = "KO" | "EN";

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
  id: "security" | "network" | "control" | "brand";
  href: string;
  image: string;
  copy: Record<Lang, LocalizedSolution>;
};

const PACKAGE_NAV: Record<
  Lang,
  Array<{ id: SolutionPackageData["id"]; href: string; name: string; desc: string }>
> = {
  KO: [
    { id: "security", href: "/solution/cctv", name: "안심 출입", desc: "CCTV · 도어락 · 센서등" },
    { id: "network", href: "/solution/network", name: "끊김 없는 연결", desc: "POS · 예약 · 게스트 Wi-Fi" },
    { id: "control", href: "/solution/iot", name: "원격 준비", desc: "조명 · 냉난방 · 환기" },
    { id: "brand", href: "/solution/design", name: "현장 완성", desc: "외장 · 간판 · 동선" },
  ],
  EN: [
    { id: "security", href: "/solution/cctv", name: "Secure Access", desc: "CCTV · lock · sensor light" },
    { id: "network", href: "/solution/network", name: "Stable Connection", desc: "POS · booking · guest Wi-Fi" },
    { id: "control", href: "/solution/iot", name: "Remote Ready", desc: "lighting · HVAC · ventilation" },
    { id: "brand", href: "/solution/design", name: "Site Finish", desc: "facade · signage · flow" },
  ],
};

export default function SolutionTemplate({ data }: { data: SolutionPackageData }) {
  const { language } = useLanguage();
  const copy = data.copy[language];
  const nav = PACKAGE_NAV[language];

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#151515]">
      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-24 md:px-8 lg:pb-20 lg:pt-32">
        <Link
          href="/solution"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "KO" ? "운영 옵션 전체" : "All operation options"}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-neutral-950 md:text-6xl lg:text-[72px]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
              {copy.lead}
            </p>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-neutral-200 shadow-[0_24px_70px_rgba(20,20,20,0.16)]">
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
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-4 py-3 md:px-8">
          {nav.map((item) => {
            const isActive = item.id === data.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "min-w-[220px] rounded-md border px-4 py-3 transition-colors",
                  isActive
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-950 hover:text-neutral-950",
                )}
              >
                <span className="block text-sm font-black">{item.name}</span>
                <span className={cn("mt-1 block text-xs", isActive ? "text-neutral-300" : "text-neutral-500")}>
                  {item.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="border-l-2 border-neutral-950 pl-5">
            <p className="text-sm font-black text-neutral-950">{copy.problemTitle}</p>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 break-keep">{copy.problem}</p>
          </div>
        </aside>

        <div className="grid gap-10">
          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.fitTitle}</h2>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {copy.fit.map((item) => (
                <li key={item} className="flex gap-3 text-base font-semibold leading-relaxed text-neutral-800 break-keep">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#C69200]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.includedTitle}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.included.map((item) => (
                <div key={item} className="rounded-md border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-neutral-800 break-keep">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.decisionsTitle}</h2>
            </div>
            <ol className="grid gap-3">
              {copy.decisions.map((item, index) => (
                <li key={item} className="grid grid-cols-[40px_1fr] items-start gap-3 border-b border-neutral-100 pb-3 last:border-b-0">
                  <span className="text-sm font-black text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base font-semibold leading-relaxed text-neutral-800 break-keep">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-5 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.outcomesTitle}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {copy.outcomes.map((item) => (
                <p key={item} className="rounded-md bg-neutral-950 px-5 py-5 text-sm font-semibold leading-relaxed text-white break-keep">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
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
          </div>
        </div>
      </section>
    </main>
  );
}
