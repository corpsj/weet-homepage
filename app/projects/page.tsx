import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ClipboardCheck, Factory, MapPinned, ShieldCheck, Truck } from "lucide-react";
import type { Project } from "@/types/supabase";
import { isPublicReadyProject } from "@/lib/projects/publicProjects";
import { getPublicGalleryItems } from "@/app/actions/gallery-actions";
import { getSiteSettings } from "@/lib/site-settings.server";
import ProjectsGallery from "./ProjectsGallery";

// ISR: cache + revalidate every 5 minutes rather than force-dynamic. (F12)
export const revalidate = 300;

const publicReadiness = [
  {
    icon: CheckCircle2,
    title: "사진 검수",
    text: "현장 사진과 기본 정보가 확인된 사례만 공개합니다.",
  },
  {
    icon: MapPinned,
    title: "조건 확인",
    text: "지역, 용도, 설치 조건을 함께 남겨 상담 판단에 도움이 되게 합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "상담 연결",
    text: "공개 전 준비 중인 사례는 상담에서 목적별 레퍼런스로 안내합니다.",
  },
];

const proofModules = [
  {
    icon: Factory,
    title: "공장 제작 기반",
    text: "현장 변수보다 통제된 제작 환경에서 구조·마감·설비 품질을 먼저 맞춥니다.",
    image: "/images/company/factory.webp",
  },
  {
    icon: ShieldCheck,
    title: "출고 전 검수",
    text: "치수, 창호, 마감, 설비처럼 입주 후 체감되는 항목을 출고 전 체크리스트로 확인합니다.",
    image: "/images/company/workshop.webp",
  },
  {
    icon: Truck,
    title: "운반·설치 조건 확인",
    text: "진입로, 크레인 작업, 인입 조건을 먼저 확인해 일정과 별도 비용의 불확실성을 줄입니다.",
    image: "/images/support/step6.webp",
  },
];

function cleanGalleryTitle(title: string) {
  return title.replace(/\s*:\)\s*$/u, '').trim();
}

export default async function ProjectsPage() {
  const [{ data: projects }, galleryItems, settings] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("status", "completed")
      .order("completed_at", { ascending: false }),
    getPublicGalleryItems(12),
    getSiteSettings(),
  ]);

  const publicProjects = ((projects as Project[] | null) ?? []).filter(isPublicReadyProject);

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* ===== INTRO ===== */}
      <section className="mx-auto max-w-[1440px] px-[5vw] pb-8 pt-[72px]">
        <div className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold-deep">
          Projects · 시공 사례
        </div>
        <h1 className="m-0 mb-[18px] max-w-[18ch] text-[clamp(34px,4.4vw,58px)] font-semibold leading-[1.04] tracking-[-0.035em] kr-balance">
          완성된 공간으로
          <br />
          증명합니다.
        </h1>
        <p className="m-0 max-w-[50ch] text-[clamp(15px,1.5vw,18px)] font-light leading-[1.65] text-weet-sub kr-balance">
          전원주택·세컨하우스부터 상업 공간까지, WEET가 만든 실제 프로젝트를 둘러보세요. 카드를 클릭하면 상세를 볼 수
          있습니다.
        </p>

        {publicProjects.length > 0 && <ProjectsGallery projects={publicProjects} />}
      </section>

      {/* ===== EMPTY STATE (proof modules) ===== */}
      {publicProjects.length === 0 && (
        <section className="mx-auto max-w-[1440px] px-[5vw] pb-[90px]">
          <div className="rounded-[16px] border border-weet-line bg-weet-surface px-5 py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
                PUBLIC PROJECTS
              </p>
              <h2 className="mt-3 text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.025em] text-weet-ink">
                검수 완료 사례만 공개합니다
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-weet-sub kr-balance">
                사진과 현장 정보가 검증된 사례만 이 영역에 올립니다. 사례 페이지가 채워지기 전에는, 아래에서 위트 공장과
                설치 현장에서 직접 기록한 사진과 제작·검수·운반 기준을 먼저 확인하실 수 있습니다.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-3">
              {proofModules.map((item) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-[14px] border border-weet-line-2 bg-weet-paper text-left shadow-weet-card"
                >
                  <div className="relative aspect-[4/3] bg-weet-paper-alt">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <item.icon className="h-5 w-5 text-weet-gold-deep" />
                    <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-weet-ink">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-weet-sub kr-balance">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-6 grid max-w-4xl gap-3 md:grid-cols-3">
              {publicReadiness.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-weet-line-2 bg-weet-paper p-5 text-left shadow-weet-card"
                >
                  <item.icon className="h-5 w-5 text-weet-muted" />
                  <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-weet-ink">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-weet-sub kr-balance">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center rounded-[8px] bg-weet-gold px-6 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                내 부지에 맞는 구성 상담하기
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
                RECORDS · 현장 기록
              </p>
              <h2 className="mt-2 text-[clamp(24px,3vw,38px)] font-semibold tracking-[-0.03em] text-weet-ink">
                제작·설치 현장에서 직접 찍었습니다
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.75] text-weet-sub kr-balance">
                렌더링이 아닌 실제 기록입니다. 용접, 단열, 도장, 운송, 설치까지 — 위트 공장과 현장에서 일하는 방식 그대로
                보여드립니다.
              </p>
            </div>
            <div className="flex items-center gap-4 text-[14px] font-semibold">
              <a
                href={settings.naver_blog_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-weet-sub transition-colors hover:text-weet-gold-deep"
              >
                네이버 블로그
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-weet-sub transition-colors hover:text-weet-gold-deep"
              >
                인스타그램
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
