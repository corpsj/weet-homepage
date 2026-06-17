import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ClipboardCheck, Factory, MapPinned, ShieldCheck, Truck } from "lucide-react";
import type { Project } from "@/types/supabase";
import { getProjectHeroImage, isPublicReadyProject } from "@/lib/projects/publicProjects";
import { getPublicGalleryItems } from "@/app/actions/gallery-actions";
import { getSiteSettings } from "@/lib/site-settings.server";

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
    <div className="min-h-screen bg-white pb-40 pt-16 lg:pt-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
        <div className="mb-12 lg:mb-20">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Projects</h1>
          <p className="text-gray-600 text-sm md:text-lg">WEET가 만들어가는 공간의 기록</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {publicProjects.map((project, index) => {
            const heroImage = getProjectHeroImage(project);

            return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                {heroImage && (
                  <Image
                    src={heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {project.status === 'ongoing' && (
                  <div className="absolute top-4 right-4 bg-gray-900 text-white text-[11px] px-3 py-1.5 rounded-full font-bold tracking-wider uppercase">
                    진행중
                  </div>
                )}
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between text-[13px] font-medium text-gray-500 mt-6 pt-6 border-t border-gray-200">
                  <span>{project.client}</span>
                  <span>{project.completed_at}</span>
                </div>
              </div>
            </Link>
            );
          })}

          {publicProjects.length === 0 && (
            <div className="col-span-full rounded-lg border border-gray-100 bg-gray-50 px-5 py-16">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm font-black text-gray-500">PUBLIC PROJECTS</p>
                <h2 className="mt-3 text-2xl font-black text-gray-900">검수 완료 사례만 공개합니다</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                  사진과 현장 정보가 검증된 사례만 이 영역에 올립니다. 사례 페이지가 채워지기 전에는, 아래에서 위트 공장과 설치
                  현장에서 직접 기록한 사진과 제작·검수·운반 기준을 먼저 확인하실 수 있습니다.
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-3">
                {proofModules.map((item) => (
                  <div key={item.title} className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm">
                    <div className="relative aspect-[4/3] bg-gray-200">
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
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <h3 className="mt-4 font-black text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-6 grid max-w-4xl gap-3 md:grid-cols-3">
                {publicReadiness.map((item) => (
                  <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm">
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <h3 className="mt-4 font-black text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/customize"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-gray-900 px-6 text-sm font-bold text-white transition-colors hover:bg-gray-800"
                >
                  내 부지에 맞는 구성 상담하기
                </Link>
              </div>
            </div>
          )}
        </div>

        {galleryItems.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black text-gray-500">RECORDS · 현장 기록</p>
                <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">제작·설치 현장에서 직접 찍었습니다</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                  렌더링이 아닌 실제 기록입니다. 용접, 단열, 도장, 운송, 설치까지 — 위트 공장과 현장에서 일하는 방식 그대로
                  보여드립니다.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold">
                <a href={settings.naver_blog_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
                  네이버 블로그
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
                  인스타그램
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {galleryItems.map((item) => (
                <figure key={item.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image_url}
                    alt={cleanGalleryTitle(item.title)}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-xs font-bold text-white">
                    {cleanGalleryTitle(item.title)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
