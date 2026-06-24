import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/supabase";
import { getProjectHeroImage, hasValidProjectImageUrl, isPublicReadyProject } from "@/lib/projects/publicProjects";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

// ISR: cache each project detail + revalidate every 5 minutes. (F12)
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("status", "completed")
    .single();

  if (!project || !isPublicReadyProject(project as Project)) {
    return { title: "프로젝트" };
  }

  const publicProject = project as Project;
  const heroImage = getProjectHeroImage(publicProject);

  return buildPageMetadata({
    title: publicProject.title,
    description: publicProject.description ?? `위트(weet) 시공 사례: ${publicProject.title}`,
    path: `/projects/${id}`,
    ...(heroImage ? { ogImage: heroImage } : {}),
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("status", "completed")
    .single();

  if (!project) {
    notFound();
  }

  const publicProject = project as Project;
  const heroImage = getProjectHeroImage(publicProject);

  if (!heroImage || !isPublicReadyProject(publicProject)) {
    notFound();
  }

  const galleryImages = (publicProject.images ?? [])
    .slice(1)
    .map((image) => image.trim())
    .filter(hasValidProjectImageUrl);

  return (
    <div className="min-h-screen bg-white px-4 pb-32 pt-16 md:px-8 lg:pt-20">
      <BreadcrumbJsonLd
        items={[
          { name: "홈", path: "/" },
          { name: "시공 사례", path: "/projects" },
          { name: project.title, path: `/projects/${id}` },
        ]}
      />
      <div className="mx-auto max-w-5xl">
        <Link 
          href="/projects"
          className="mb-8 inline-flex items-center text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
        >
          ← 목록으로 돌아가기
        </Link>

        <header className="mb-10">
          <div className="flex gap-2 mb-4">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl">{project.title}</h1>
          
          <div className="grid gap-4 rounded-lg border border-gray-100 bg-gray-50 p-6 text-sm sm:grid-cols-3">
            <div>
              <span className="text-gray-500 block mb-1">고객사</span>
              <span className="font-medium text-gray-900">{project.client}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">위치</span>
              <span className="font-medium text-gray-900">{project.location}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">완료일</span>
              <span className="font-medium text-gray-900">{project.completed_at}</span>
            </div>
          </div>
        </header>

        <div className="space-y-12">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm">
            <Image
              src={heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </div>

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryImages.map((img: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-weet-line-2 bg-weet-surface px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-weet-ink md:text-3xl">
              비슷한 공간을 계획 중이신가요?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-weet-sub kr-balance">
              부지 조건과 용도를 알려주시면 목적에 맞는 구성과 예상 범위를 함께 안내해 드립니다.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/support#consult"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-weet-gold px-6 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5 sm:w-auto"
              >
                상담 문의하기
              </Link>
              <Link
                href="/customize"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-weet-line-2 bg-white px-6 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5 sm:w-auto"
              >
                직접 구성해 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
