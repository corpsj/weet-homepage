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
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
        <p className="text-gray-600">WEET가 만들어가는 공간의 기록</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <Link 
            key={project.id} 
            href={`/projects/${project.id}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border border-gray-100"
          >
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              {project.images?.[0] ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              {project.status === 'ongoing' && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  진행중
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <span>{project.client}</span>
                <span>{project.completed_at}</span>
              </div>
            </div>
          </Link>
        ))}

        {(!projects || projects.length === 0) && (
          <div className="col-span-full text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
            등록된 프로젝트가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
