import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/projects"
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors"
        >
          ← 목록으로 돌아가기
        </Link>

        <header className="mb-10">
          <div className="flex gap-2 mb-4">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{project.title}</h1>
          
          <div className="flex flex-wrap gap-y-4 gap-x-12 p-6 bg-gray-50 rounded-xl text-sm border border-gray-100">
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
          {/* Main Image */}
          {project.images?.[0] && (
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </div>

          {/* Gallery Grid */}
          {project.images && project.images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((img: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
