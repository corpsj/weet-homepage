'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ClipboardCheck, Factory, MapPinned, ShieldCheck, Truck } from "lucide-react";
import type { Project, GalleryItem } from "@/types/supabase";
import type { SiteSettings } from "@/lib/site-settings";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import ProjectsGallery from "./ProjectsGallery";

const publicReadiness = [
  { icon: CheckCircle2 },
  { icon: MapPinned },
  { icon: ClipboardCheck },
] as const;

const proofModules = [
  { icon: Factory, image: "/images/modular/generated/factory-precision.webp" },
  { icon: ShieldCheck, image: "/images/modular/generated/modular-hero.webp" },
  { icon: Truck, image: "/images/handoff/sup-6.webp" },
] as const;

const COPY: Record<Language, {
  introEyebrow: string;
  introTitle: [string, string];
  introLead: string;
  proofEyebrow: string;
  proofTitle: string;
  proofLead: string;
  proofModules: Array<{ title: string; text: string }>;
  readiness: Array<{ title: string; text: string }>;
  emptyCta: string;
  recordsEyebrow: string;
  recordsTitle: string;
  recordsLead: string;
  naverBlog: string;
  instagram: string;
}> = {
  KO: {
    introEyebrow: "Projects · 시공 사례",
    introTitle: ["완성된 공간으로", "증명합니다."],
    introLead: "전원주택·세컨하우스부터 상업 공간까지 WEET가 만든 실제 프로젝트를 둘러보세요. 카드를 클릭하면 상세를 볼 수 있습니다.",
    proofEyebrow: "PUBLIC PROJECTS",
    proofTitle: "검수 완료 사례만 공개합니다",
    proofLead: "사진과 현장 정보가 검증된 사례만 이 영역에 올립니다. 사례 페이지가 채워지기 전에는 아래에서 위트 공장과 설치 현장에서 직접 기록한 사진과 제작·검수·운반 기준을 먼저 확인하실 수 있습니다.",
    proofModules: [
      { title: "공장 제작 기반", text: "현장 변수보다 통제된 제작 환경에서 구조·마감·설비 품질을 먼저 맞춥니다." },
      { title: "출고 전 검수", text: "치수, 창호, 마감, 설비처럼 입주 후 체감되는 항목을 출고 전 체크리스트로 확인합니다." },
      { title: "운반·설치 조건 확인", text: "진입로, 크레인 작업, 인입 조건을 먼저 확인해 일정과 별도 비용의 불확실성을 줄입니다." },
    ],
    readiness: [
      { title: "사진 검수", text: "현장 사진과 기본 정보가 확인된 사례만 공개합니다." },
      { title: "조건 확인", text: "지역, 용도, 설치 조건을 함께 남겨 상담 판단에 도움이 되게 합니다." },
      { title: "상담 연결", text: "공개 전 준비 중인 사례는 상담에서 목적별 레퍼런스로 안내합니다." },
    ],
    emptyCta: "내 부지에 맞는 구성 상담하기",
    recordsEyebrow: "RECORDS · 현장 기록",
    recordsTitle: "제작·설치 현장에서 직접 찍었습니다",
    recordsLead: "렌더링이 아닌 실제 기록입니다. 용접, 단열, 도장, 운송, 설치까지 위트 공장과 현장에서 일하는 방식 그대로 보여드립니다.",
    naverBlog: "네이버 블로그",
    instagram: "인스타그램",
  },
  EN: {
    introEyebrow: "Projects · Built Cases",
    introTitle: ["Proven by", "finished spaces."],
    introLead: "From country homes and second houses to commercial spaces, explore the real projects WEET has built. Click a card to see the details.",
    proofEyebrow: "PUBLIC PROJECTS",
    proofTitle: "Only inspected cases are published",
    proofLead: "Only cases with verified photos and site information appear in this area. Until the case pages are filled out, you can first review the photos and the manufacturing, inspection, and transport standards we documented ourselves at the WEET factory and installation sites below.",
    proofModules: [
      { title: "Factory-built foundation", text: "We lock in the quality of structure, finishes, and systems first in a controlled production environment, ahead of on-site variables." },
      { title: "Pre-shipment inspection", text: "Items you feel after move-in—dimensions, windows, finishes, systems—are verified against a pre-shipment checklist." },
      { title: "Transport & install check", text: "We confirm access roads, crane work, and utility hookups up front to reduce uncertainty in schedule and extra costs." },
    ],
    readiness: [
      { title: "Photo review", text: "We publish only cases with confirmed site photos and basic information." },
      { title: "Condition check", text: "Share the region, intended use, and installation conditions together so they help guide the consultation." },
      { title: "Consultation link", text: "Cases still in preparation before release are introduced as purpose-specific references during consultation." },
    ],
    emptyCta: "Get a consultation for your site",
    recordsEyebrow: "RECORDS · Field Notes",
    recordsTitle: "Shot ourselves at the build and install sites",
    recordsLead: "These are real records, not renderings. From welding, insulation, and painting to transport and installation—we show exactly how we work at the WEET factory and on site.",
    naverBlog: "Naver Blog",
    instagram: "Instagram",
  },
  ES: {
    introEyebrow: "Proyectos · Casos Construidos",
    introTitle: ["La prueba está en los", "espacios terminados."],
    introLead: "Desde casas de campo y segundas residencias hasta espacios comerciales, explore los proyectos reales que WEET ha construido. Haga clic en una tarjeta para ver los detalles.",
    proofEyebrow: "PROYECTOS PÚBLICOS",
    proofTitle: "Solo publicamos casos ya inspeccionados",
    proofLead: "En esta sección solo aparecen casos con fotos e información de obra verificadas. Mientras se completan las páginas de casos, abajo puede revisar primero las fotos y los estándares de fabricación, inspección y transporte que documentamos nosotros mismos en la fábrica WEET y en los sitios de instalación.",
    proofModules: [
      { title: "Base fabricada en fábrica", text: "Aseguramos primero la calidad de la estructura, los acabados y las instalaciones en un entorno de producción controlado, por delante de las variables de la obra." },
      { title: "Inspección antes del envío", text: "Los aspectos que se notan tras la mudanza—medidas, ventanas, acabados, instalaciones—se verifican con una lista de control antes del envío." },
      { title: "Verificación de transporte e instalación", text: "Confirmamos de antemano los accesos, el trabajo de grúa y las conexiones de servicios para reducir la incertidumbre en el cronograma y los costos adicionales." },
    ],
    readiness: [
      { title: "Revisión de fotos", text: "Solo publicamos casos con fotos de obra e información básica confirmadas." },
      { title: "Verificación de condiciones", text: "Indique la región, el uso previsto y las condiciones de instalación para orientar mejor la consulta." },
      { title: "Enlace de consulta", text: "Los casos aún en preparación antes de su publicación se presentan como referencias por objetivo durante la consulta." },
    ],
    emptyCta: "Solicite una consulta para su terreno",
    recordsEyebrow: "REGISTROS · Notas de Obra",
    recordsTitle: "Fotografiado por nosotros en obra e instalación",
    recordsLead: "Son registros reales, no renders. Desde la soldadura, el aislamiento y la pintura hasta el transporte y la instalación, le mostramos exactamente cómo trabajamos en la fábrica WEET y en la obra.",
    naverBlog: "Blog de Naver",
    instagram: "Instagram",
  },
};

function cleanGalleryTitle(title: string) {
  return title.replace(/\s*:\)\s*$/u, '').trim();
}

export default function ProjectsClient({
  publicProjects,
  galleryItems,
  settings,
}: {
  publicProjects: Project[];
  galleryItems: GalleryItem[];
  settings: SiteSettings;
}) {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* ===== INTRO ===== */}
      <section className="mx-auto max-w-[1440px] px-[5vw] pb-8 pt-[72px]">
        <div className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold-deep">
          {copy.introEyebrow}
        </div>
        <h1 className="m-0 mb-[18px] max-w-[18ch] text-[clamp(34px,4.4vw,58px)] font-semibold leading-[1.04] tracking-[-0.035em] kr-balance">
          {copy.introTitle[0]}
          <br />
          {copy.introTitle[1]}
        </h1>
        <p className="m-0 max-w-[50ch] text-[clamp(15px,1.5vw,18px)] font-light leading-[1.65] text-weet-sub kr-balance">
          {copy.introLead}
        </p>

        {publicProjects.length > 0 && <ProjectsGallery projects={publicProjects} />}
      </section>

      {/* ===== EMPTY STATE (proof modules) ===== */}
      {publicProjects.length === 0 && (
        <section className="mx-auto max-w-[1440px] px-[5vw] pb-[90px]">
          <div className="rounded-[16px] border border-weet-line bg-weet-surface px-5 py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
                {copy.proofEyebrow}
              </p>
              <h2 className="mt-3 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.025em] text-weet-ink">
                {copy.proofTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-weet-sub kr-balance">
                {copy.proofLead}
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-3">
              {proofModules.map((item, index) => {
                const t = copy.proofModules[index];
                return (
                  <div
                    key={t.title}
                    className="overflow-hidden rounded-[14px] border border-weet-line-2 bg-weet-paper text-left shadow-weet-card"
                  >
                    <div className="relative aspect-[4/3] bg-weet-paper-alt">
                      <Image
                        src={item.image}
                        alt={t.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <item.icon className="h-5 w-5 text-weet-gold-deep" />
                      <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-weet-ink">{t.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.65] text-weet-sub kr-balance">{t.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mx-auto mt-6 grid max-w-4xl gap-3 md:grid-cols-3">
              {publicReadiness.map((item, index) => {
                const t = copy.readiness[index];
                return (
                  <div
                    key={t.title}
                    className="rounded-[14px] border border-weet-line-2 bg-weet-paper p-5 text-left shadow-weet-card"
                  >
                    <item.icon className="h-5 w-5 text-weet-muted" />
                    <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-weet-ink">{t.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-weet-sub kr-balance">{t.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center rounded-[8px] bg-weet-gold px-6 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                {copy.emptyCta}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== RECORDS · 현장 기록 ===== */}
      {galleryItems.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-[5vw] pb-[90px] pt-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold-deep">
                {copy.recordsEyebrow}
              </p>
              <h2 className="mt-2 text-[clamp(24px,3vw,38px)] font-semibold tracking-[-0.03em] text-weet-ink">
                {copy.recordsTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.75] text-weet-sub kr-balance">
                {copy.recordsLead}
              </p>
            </div>
            <div className="flex items-center gap-4 text-[14px] font-semibold">
              <a
                href={settings.naver_blog_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-weet-sub transition-colors hover:text-weet-gold-deep"
              >
                {copy.naverBlog}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-weet-sub transition-colors hover:text-weet-gold-deep"
              >
                {copy.instagram}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {galleryItems.map((item) => (
              <figure
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-[12px] border border-weet-line bg-weet-paper-alt"
              >
                <Image
                  src={item.image_url}
                  alt={cleanGalleryTitle(item.title)}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-weet-ink/75 to-transparent p-3 pt-8 text-[12px] font-semibold text-weet-paper">
                  {cleanGalleryTitle(item.title)}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
