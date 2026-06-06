import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "시공 사례",
  description: "위트(WEET)의 실제 프로젝트 시공 사례를 소개합니다. 다양한 용도와 규모의 모듈러 건축 프로젝트를 확인하세요.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
    title: "시공 사례",
    description: "위트(WEET)의 실제 프로젝트 시공 사례를 소개합니다. 다양한 용도와 규모의 모듈러 건축 프로젝트를 확인하세요.",
  },
};

export default async function ProjectsPage() {
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("completed_at", { ascending: false });

  return (
    <main className="min-h-screen bg-white pb-40 pt-16 lg:pt-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
        <div className="mb-12 lg:mb-20">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Projects</h1>
          <p className="text-gray-600 text-sm md:text-lg">WEET가 만들어가는 공간의 기록</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects?.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                {project.images?.[0] ? (
                  <Image
                    src={project.images[0]}
	                    alt={project.title}
	                    fill
	                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
	                    priority={index === 0}
	                    className="object-cover group-hover:scale-105 transition-transform duration-500"
	                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-sm font-bold uppercase tracking-wider">Image Coming Soon</span>
                  </div>
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
          ))}

          {(!projects || projects.length === 0) && (
            <div className="col-span-full rounded-lg border border-gray-100 bg-gray-50 py-32 text-center text-gray-400">
              <span className="text-lg font-bold">등록된 프로젝트가 없습니다.</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
