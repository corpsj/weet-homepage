import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!project) {
    return { title: "프로젝트" };
  }

  return {
    title: project.title,
    description: project.description ?? `위트(WEET) 시공 사례: ${project.title}`,
    openGraph: {
      url: `/projects/${id}`,
      title: project.title,
      description: project.description ?? `위트(WEET) 시공 사례: ${project.title}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: project } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-4 pb-32 pt-16 md:px-8 lg:pt-20">
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
          {project.images?.[0] ? (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-center text-gray-400">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em]">Image Coming Soon</p>
                <p className="mt-2 text-xs font-medium text-gray-500">{project.title}</p>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </div>

          {project.images && project.images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((img: string, i: number) => (
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
        </div>
      </div>
    </main>
  );
}
